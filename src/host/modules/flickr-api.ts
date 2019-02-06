import _ from 'lodash';
import * as Vts  from 'vee-type-safe';
import * as Debug from '@modules/debug';
import * as Config from '@app/config';
import * as Network from '@modules/network';

interface PaginationParams {
    per_page:    number;
    page:        number; // 1 - based
}

interface FlickrBasicJsonResponse { 
    stat: 'ok' | string;
}

interface FlickrPhoto {
    id:     string;
    secret: string;
    server: string;
    farm:   number;
    title:  string;
    [key: string]: unknown;
}
const FlickrPhotoTD: Vts.TypeDescriptionOf<FlickrPhoto> = {
    id:       'string',
    secret:   'string',
    server:   'string',
    farm:     'number',
    title:    'string'
};

interface FlickrPhotosetResponse extends FlickrBasicJsonResponse {
    photoset?: {
        photo: FlickrPhoto[];
        total: number;
        [key: string]: unknown;
    };
}
const FlickrPhotosetsResponseTD: Vts.TypeDescriptionOf<FlickrPhotosetResponse> = {
    photoset: Vts.optional({
        photo:     [FlickrPhotoTD],
        total:     Vts.isZeroOrPositiveInteger
    }),
    stat: 'string'
};

interface FlickrPhotosSearchResponse extends FlickrBasicJsonResponse {
    photos?: {
        total: string;       // stringified integer indeed
        photo: FlickrPhoto[];
        [key: string]: unknown;
    };
}
const FlickrPhotosSearchResponseTD: Vts.TypeDescriptionOf<FlickrPhotosSearchResponse> = {
    photos: Vts.optional({
        photo: [FlickrPhotoTD],
        total: () => true, // check that this field at least exits
    }),
    stat: 'string'
};

export class FlickrAPI {
    private static readonly BaseEndpoint = 'https://api.flickr.com/services/rest/';

    constructor(private readonly api_key: string) {}

    static flickrPhotoToUrl({ farm, server, secret, id }: FlickrPhoto) {
        return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    }

    private static assertGoodPaginationParams(opts: PaginationParams) {
        Debug.assert.matches(opts.per_page, Vts.isIntegerWithinRange(1, 500));
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

    async fetchPhotosByTag(paginationParams: PaginationParams) {
        FlickrAPI.assertGoodPaginationParams(paginationParams);
        const response = await this.fetchJson<FlickrPhotosSearchResponse>({
                ...paginationParams,
                method:  'flickr.photos.search',
                text:    `#${Config.Flickr.TargetPhotoTag}`,
                media:   'photos'
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
            total, photos: response.photos!.photo 
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
     * Returns { total: number, photos: FlickrPhoto[] }
     * Fetces photos from FlickrAPI server, paginated accrodign to `opts`
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
                photoset_id:   Config.Flickr.TargetPhotosetId,
                user_id:       Config.Flickr.TargetUserId,
            },
            FlickrPhotosetsResponseTD
        );
        FlickrAPI.ensureGoodResponse(response);
        Vts.ensureMatch(response.photoset, Vts.isBasicObject);
        return {
            total:  response.photoset!.total,
            photos: response.photoset!.photo
        };
    }

}

