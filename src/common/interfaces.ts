import * as Vts from 'vee-type-safe';
export import Maybe = Vts.Maybe;

export type Callback<TResult> = (err: unknown, result: Maybe<TResult>) => void;

/*
// USAGE
const result = await (await fetch(EmotionsPhotos.Endpoint, { queryParams })).json();

const mismatchInfo = Vts.mismatch(result, EmotionsPhotos.ResponseTD);
if (mismatchInfo == null) {
    throw new Vts.TypeMismatchError(mismatchInfo);
    // or Vts.ensureMatch(result, EmotionsPhotos.ResponseTD)
}
const checked = result as EmotionsPhotos.Response;
*/

export namespace EP { // EmotionsPhotos

    export enum Emotion {
        Sadness   = 'sadness',
        Neutral   = 'neutral',
        Disgust   = 'disgust',
        Anger     = 'anger',
        Surprise  = 'surprise',
        Fear      = 'fear',
        Happiness = 'happiness'
    }
    
    export const PossibleEmotions: Emotion[] = Object.values(Emotion);
    
    export const Endpoint = '/api/v1/emotions/photos';

    // GET request query params
    export interface Request {
        offset:   number;
        limit:    number;
        emotion:  string | null; // coma delimited list of emotions g
    }

    export interface FlickrPhoto {
        id:       string;
        secret:   string;
        server:   string;
        farm:     number;
        title:    string;
    }
    export interface Photo extends FlickrPhoto {
        tag:      boolean;
        photoset: boolean;
    }
    // https://www.flickr.com/services/api/misc.urls.html
    export const enum PhotoSize {
        _240   = '_m',   // small, 240 on longest side
        _75x75 = '_s',   // small square 75x75
        _100   = '_t',   // thumbnail, 100 on longest side
        _500   = '',
        _320   = '_n',
        _640   = '_z',   // medium 640, 640 on longest side
        _1024  = '_b'    // large, 1024 on longest side*
    }
    export function photoToUrl({farm, server, id, secret}: Photo, size = PhotoSize._1024) {
        return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}${size}.jpg`;
    }

    export const PhotoTD: Vts.TypeDescriptionOf<Photo> = {
        id:       'string',
        secret:   'string',
        server:   'string',
        farm:     'number',
        title:    'string',
        tag:      'boolean',
        photoset: 'boolean'
    };
    export interface Response {
        total:  number;
        data:   Photo[];
    }
    export const ResponseTD: Vts.TypeDescriptionOf<Response> = {
        total: Vts.isZeroOrPositiveInteger,
        data:  [PhotoTD]
    };
}