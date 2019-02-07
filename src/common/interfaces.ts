import * as Vts from 'vee-type-safe';
export import Maybe = Vts.Maybe;

export type Callback<TResult> = (err: unknown, result: Maybe<TResult>) => void;

export interface Object<TValue> { 
    [key: string]: TValue;
}
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

export namespace EmotionsPhotos {

    export type Emotion = 
        | 'saddness'
        | 'neutral'
        | 'disgust'
        | 'anger'
        | 'surpise'
        | 'fear'
        | 'happiness';
    
    export const PossibleEmotions: Emotion[] = [
        'saddness',
        'neutral',
        'disgust',
        'anger',
        'surpise',
        'fear',
        'happiness'
    ];
    
    export const Endpoint = '/api/v1/emotions/photos';

    // GET request query params
    export interface Request {
        page:    number;
        limit:   number;
        emotion: Emotion;
    }
    export interface Response {
        total:  number;
        photos: string[]; 
    }
    export const ResponseTD: Vts.TypeDescriptionOf<Response> = {
        total: Vts.isZeroOrPositiveInteger,
        photos: ['string']
    };
}