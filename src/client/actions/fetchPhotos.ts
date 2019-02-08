import Axios from 'axios';
import * as HttpStatusCodes from 'http-status-codes';
import * as Vts       from 'vee-type-safe';
import { EP } from '@common/interfaces';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST'; 
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';

export type PhotosState = {
    isFetching: boolean;
    currentPage: number;
    allPages: number;
    countAllPhotos: number;
    lastError: string;
    selectedEmotions: EP.Emotion[];
    photosOnPage: EP.Photo[];
};

export const defaultPayload: PhotosState = {
    isFetching: false,
    currentPage: 0,
    allPages: 0,
    countAllPhotos: 0,
    lastError: '',
    selectedEmotions: [],
    photosOnPage: []
};

export interface PhotosActions {
    type: string;
    payload: PhotosState;
}

const IMAGES_PER_PAGE = 12;

type PhotosResult<TResult> = ThunkAction<TResult, PhotosState, undefined, PhotosActions>;

export type FetchPhotosThunkDispatch = ThunkDispatch<PhotosState, undefined, PhotosActions>;

export function fetchPhotos(page: number, emotion: EP.Emotion[]): PhotosResult<void> {
    return async function(dispatch: FetchPhotosThunkDispatch) {
        dispatch({ 
            type: FETCH_PHOTOS_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        const queryParams: EP.Request = {
            limit: IMAGES_PER_PAGE,
            offset: (page - 1) * IMAGES_PER_PAGE,
            emotion
        };
        let result;
        try {
            const response = await Axios.get(EP.Endpoint, { params: { ...queryParams } });
            if (!response || response.status !== HttpStatusCodes.OK) {
                throw new Error(response 
                    ? response.statusText 
                    : `Get null response on ${EP.Endpoint}`);
            }
            console.log(response.data);
            Vts.ensureMatch(response.data, EP.ResponseTD);
            result = response.data as EP.Response;
        } catch(e) {
            dispatch({ type: FETCH_PHOTOS_FAILURE, payload: { 
                ...defaultPayload, 
                lastError: e.message
            }});
            return;
        }
        dispatch({
            type: FETCH_PHOTOS_SUCCESS,
            payload: {
                ...defaultPayload,
                photosOnPage: result.data,
                currentPage: page,
                selectedEmotions: emotion,
                allPages: result.total / IMAGES_PER_PAGE,
                countAllPhotos: result.total
            }
        });
    };
}