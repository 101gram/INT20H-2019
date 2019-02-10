import _ from 'lodash';
import * as Vts     from 'vee-type-safe';
import * as Debug   from '@modules/debug';
import * as Config  from '@app/config';
import * as Network from '@modules/network';
import * as Coll    from 'typescript-collections';
import { EP, isDateString } from '@common/interfaces';

interface PaginationParams {
    per_page:    number;
    page:        number; // 1 - based
}

interface FlickrBasicJsonResponse { 
    stat: 'ok' | string;
}

export import FlickrPhoto = EP.FlickrPhoto;

const FlickrPhotoTD: Vts.TypeDescriptionOf<FlickrPhoto> = {
    id:        'string',
    secret:    'string',
    server:    'string',
    farm:      'number',
    title:     'string',
    datetaken: isDateString
};

interface FlickrPhotosetResponse extends FlickrBasicJsonResponse {
    photoset?: Vts.Maybe<{
        photo: FlickrPhoto[];
        total: number;
        [key: string]: unknown;
    }>;
}
const FlickrPhotosetsResponseTD: Vts.TypeDescriptionOf<FlickrPhotosetResponse> = {
    photoset: Vts.optional({
        photo: [FlickrPhotoTD],
        total: Vts.isZeroOrPositiveInteger
    }),
    stat: 'string'
};

interface FlickrPhotosSearchResponse extends FlickrBasicJsonResponse {
    photos?: {
        total: string;       // stringified integer indeed (Flickr API bug)
        photo: FlickrPhoto[];
        [key: string]: unknown;
    };
}
const FlickrPhotosSearchResponseTD: Vts.TypeDescriptionOf<FlickrPhotosSearchResponse> = {
    photos: Vts.optional({
        photo: [FlickrPhotoTD],
        total: () => true, // check that this field at least exists, API bug ~~^
    }),
    stat: 'string'
};

export interface FetchPhotosResult {
    total:  number;
    photos: FlickrPhoto[];
}
export type FlickrPhotosFetcher = (
    this: FlickrAPI, 
    params: PaginationParams
) => Promise<FetchPhotosResult>;

export interface MarkedFlickrPhotos extends EP.FlickrPhoto {
    tag?:      boolean;
    photoset?: boolean;        
}

export class FlickrAPI {
    private static readonly MaxItemsPerPage = 500;
    private static readonly BaseEndpoint = 'https://api.flickr.com/services/rest/';

    constructor(private readonly api_key: string) {}

    private static assertGoodPaginationParams(opts: PaginationParams) {
        Debug.assert.matches(opts.per_page, Vts.isIntegerWithinRange(1, 500));
    }

    private async * fetchAll(fetcher: FlickrPhotosFetcher) {
        let fetchedAmount = 0;
        let totalAmount   = 0;
        do {
            const {total, photos} = await fetcher.call(this, {
                page: 1, per_page: FlickrAPI.MaxItemsPerPage
            });
            yield photos as MarkedFlickrPhotos[];
            totalAmount    = total;
            fetchedAmount += total;
            if (photos.length === 0) {   // prevent infinite loop
                break; 
            }
        } while (fetchedAmount < totalAmount);
    }

    private static photoToString(photo: FlickrPhoto) {
        return `${photo.farm}${photo.server}${photo.id}${photo.secret}`;
    }

    async fetchAllUnited() {
        const photos = new Coll.Dictionary<string, MarkedFlickrPhotos>();
        for await (const page of this.fetchAll(this.fetchPhotosByTag)) {
            for (const photo of page) {
                photo.tag = true;
                photos.setValue(FlickrAPI.photoToString(photo), photo);
            } 
        }
        for await (const page of this.fetchAll(this.fetchPhotosFromPhotoset)) {
            for (const photo of page) {
                const repeated = photos.getValue(FlickrAPI.photoToString(photo));
                if (repeated != null) {
                    repeated.photoset = true;
                } else {
                    photo.photoset = true;
                    photos.setValue(FlickrAPI.photoToString(photo), photo);
                }
            }
        }
        return photos.values();
    }


    private async fetchJson<T extends Network.JsonRoot>(
        queryParams: Network.QueryParamsObj,
        jsonTypedescr: Vts.TypeDescription
    ) {
        return Network.getJson<T>({ 
            endpoint: FlickrAPI.BaseEndpoint,
            jsonTypedescr,
            queryParams: { 
                ...queryParams, 
                format:        'json',
                nojsoncallback: 1,
                api_key:       this.api_key,
            }
        });
    }


    /**
     * 
     * Fetches photos from FlickrAPI server, paginated according to `opts`.
     * 
     * @param paginationParams Pagination parameters.
     * 
     * @remarks 
     * `opts.per_page` must be inside the range `[1, 500]`
     * 
     * @throws Error if network error occurs, or FlickrAPI responds with 'fail'
     */
    async fetchPhotosByTag(paginationParams: PaginationParams) {
        FlickrAPI.assertGoodPaginationParams(paginationParams);
        const response = await this.fetchJson<FlickrPhotosSearchResponse>({
                ...paginationParams,
                method:  'flickr.photos.search',
                media:   'photos',
                extras:  'date_taken',
                tags:    `${Config.Flickr.TargetPhotoTag}`
            },
            FlickrPhotosSearchResponseTD
        );
        FlickrAPI.ensureGoodResponse(response);
        Vts.ensureMatch(response.photos, Vts.isBasicObject);

        // Remove this shitcode when they fix 'total' to be number
        let { total }: { total: string | number } = response.photos!;
        if (typeof total === 'string') {
            total = parseInt(response.photos!.total, 10);
        }
        return { 
            total, 
            photos: response.photos!.photo.map(photo => Vts.takeFromKeys(photo, FlickrPhotoTD))

        };
    }

    private static ensureGoodResponse(response: FlickrBasicJsonResponse) {
        if (response.stat !== 'ok') {
            Debug.Log.error(
                response, 
                'failed to fetch photoes from flickr'
            );
            throw new Error('failed to fetch photoes from flickr');
        }
    }

    /**
     *
     * Fetches photos from FlickrAPI server, paginated according to `opts`.
     * 
     * @param paginationParams Pagination parameters.
     * 
     * @remarks 
     * `opts.per_page` must be inside the range `[1, 500]`
     * 
     * @throws Error if network error occurs, or FlickrAPI responds with 'fail'
     */
    async fetchPhotosFromPhotoset(paginationParams: PaginationParams) {
        FlickrAPI.assertGoodPaginationParams(paginationParams);
        const response = await this.fetchJson<FlickrPhotosetResponse>({
                ...paginationParams,
                method:        'flickr.photosets.getPhotos',
                media:         'photos',
                extras:        'date_taken',
                photoset_id:   Config.Flickr.TargetPhotosetId,
                user_id:       Config.Flickr.TargetUserId
            },
            FlickrPhotosetsResponseTD
        );
        FlickrAPI.ensureGoodResponse(response);
        Vts.ensureMatch(response.photoset, Vts.isBasicObject);
        return {
            total:  response.photoset!.total,
            photos: response.photoset!.photo.map(photo => Vts.takeFromKeys(photo, FlickrPhotoTD))
        };
    }

}

