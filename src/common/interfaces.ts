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
        emotion:  Emotion[]; // coma delimited list of emotions
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
    export const enum PhotoSize {
        _240   = 'm',   // small, 240 on longest side
        _75x75 = 's',   // small square 75x75
        _100   = 't',   // thumbnail, 100 on longest side
        _640   = 'z',   // medium 640, 640 on longest side
        _1024  = 'b'    // large, 1024 on longest side*
    }
    export function photoToUrl({farm, server, id, secret}: FlickrPhoto, size = PhotoSize._1024) {
        return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`;
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