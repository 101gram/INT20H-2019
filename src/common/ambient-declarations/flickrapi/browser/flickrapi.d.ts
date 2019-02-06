declare module 'flickrapi/browser/flickrapi' {
    import { Maybe } from 'vee-type-safe';
    export type Callback<TResult> = (err: unknown, result: Maybe<TResult>) => void;
    export interface FlickrAPIOptions {
        endpoint: string;
    }
    export class Flickr {
        constructor(options: FlickrAPIOptions);
        photos:    Photos.API;
        photosets: Photosets.API;
    }

    interface Paginated {
        /**
         * The page of results to return, 1 - based index.
         */
        page: number;
        /**
         * Number of photos to return per page. 
         * The maximum allowed value is 500.
         */
        per_page: number;
    }


    export interface FlickrTokenOnlyOptions {
        api_key: string;
    }
    /**
     * Creates an API object.
     */
    export function tokenOnly(options: FlickrTokenOnlyOptions): Flickr;

    

    interface FlikrPhoto {
        id:     string;
        owner:  string;
        secret: string;
        server: string;
        farm:   number;
        title:  string;
        // isprimary: string;
        // 1 or 0
        ispublic: number, 
        isfriend: number; 
        isfamily: number;
    }

    export namespace Photos {
        export interface API {
            search(
                data: SearchRequest, 
                cb:   Callback<SearchResponse>
            ): void;
        }

        export interface SearchRequest extends Paginated {
            /**
             * The NSID of the user who's photo to search. 
             */
            user_id?: string;
            /**
             * Limit the scope of the search to only photos that are in a gallery?
             * Default is false, search all photos.
             */
            is_gallery: boolean;
            /**
             * A comma-delimited list of tags. 
             * Photos with one or more of the tags listed will be returned. 
             * You can exclude results that match a term by prepending it with a - character.
             */
            tags?: string[];
            // ... a lot of optional unnecessary fields down here
        }

        interface SearchResponse {
            photos: {
                page:    number;
                pages:   number;
                perpage: number;
                total:   number;
                photo:   Photo[];
            } 
        }
        
    }
    namespace Photosets {
        interface API {
            getPhotos(req: GetPhotosRequest, cb: Callback<GetPhotosResponse>): void;
        }
        interface GetPhotosResponse {
            photoset: {
                id:        string;
                primary:   string;
                owner:     string;  // owner NSID
                ownername: string;
                photo:     FlikrPhoto[];
                page:      number;
                per_page:  number; // i suppose it is the real per_page
                perpage:   number;
                pages:     number;
                title:     string;
                total:     number;
            }
            stat: string;
        }
        interface GetPhotosRequest extends Paginated {
            /**
             * The id of the photoset to return the photos for.
             */
            photoset_id: string;

            /**
             * The user_id here is the owner of the set passed in photoset_id.
             */ 
            user_id: string;                                                                            
            /**
             * A comma-delimited list of extra information to fetch for each returned record. 
             * Currently supported fields are: 
             * license, date_upload, date_taken, owner_name, icon_server, original_format, 
             * last_update, geo, tags, machine_tags, o_dims, views, media, path_alias, 
             * url_sq, url_t, url_s, url_m, url_o
             */
            extras?: string;
            /**
             * Filter results by media type. 
             * Possible values are all (default), photos or videos
             */
            media: 'all' | 'photos' | 'videos';
        }
    }
}

declare global {
    declare const Flickr: typeof import('flickrapi/browser/flickrapi').Flickr;
}