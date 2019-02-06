import 'flickrapi/browser/flickrapi';
// import * as Config from '@configs/config';

export interface FetchPhotoesRequest {
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

export interface FetchPhotoesResponse {

}


export class FlickrService {
    // @TODO move to backend
  
    // private flickr = new Flickr({
    //     endpoint: Config.Flickr.ProxyEndpoind
    // });
    
    // fetchPhotoes(req: FetchPhotoesRequest) {
    //     return new Promise((resolve, reject) => {
    //         this.flickr.photosets.getPhotos({ 
    //             ...req,
    //             photoset_id: Config.Flickr.AlbumId,
    //             user_id:     Config.Flickr.UserId,
    //             media: 'photos'
    //         }, (err, res) => {
    //             if (err) {
    //                 reject(err);
    //             }
    //             resolve(res!);
    //         });
    //     });
    // }

}