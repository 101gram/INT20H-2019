import Express from 'express';
import { FlickrAPI } from '@modules/flickr-api';
//import { FacePlusPlus } from '@modules/fpp-api';
import * as Config from '@app/config';
import * as Vts    from 'vee-type-safe';
import * as VtsEx  from 'vee-type-safe/express';
import { EmotionsPhotos } from '@common/interfaces';


const flickrAPI = new FlickrAPI(Config.Flickr.ApiKey);
//const faceppAPI = new FacePlusPlus(Config.FacePP.ApiKey, Config.FacePP.ApiSecret);

interface EmotionsPhotosQueryParams {
    // stringified numbers
    page:    string;  
    limit:   string;

    emotion: EmotionsPhotos.Emotion;
}
const EmotionsPhotosQueryParamsTD: Vts.TypeDescriptionOf<EmotionsPhotosQueryParams> = {
    page:    'string',
    limit:   'string',
    emotion: Vts.isOneOf(EmotionsPhotos.PossibleEmotions)
};

export const router = Express.Router()
.get('/emotions/photos', 
    VtsEx.ensureTypeMatch(VtsEx.ReqQuery, EmotionsPhotosQueryParamsTD),
    async ({ query }: VtsEx.ReqQuery<EmotionsPhotosQueryParams>, res) => {
        const page  = parseInt(query.page, 10);
        const limit = parseInt(query.limit, 10);
        Vts.ensureMatch(page, Vts.isPositiveInteger);
        Vts.ensureMatch(limit, Vts.isPositiveInteger);
        const { photos, total } = await flickrAPI.fetchPhotosByTagAndFromPhotoset({
            page,
            per_page: limit
        });
        const jsonResponse: EmotionsPhotos.Response = {
            total,
            photos: photos.map(FlickrAPI.flickrPhotoToUrl)
        };
        res.json(jsonResponse);
    });