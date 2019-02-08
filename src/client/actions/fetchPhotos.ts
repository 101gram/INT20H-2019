// import Axios from 'axios';
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
    selectedEmotions: EP.Emotion[];
    photosOnPage: EP.Photo[];
};

export const defaultPayload: PhotosState = {
    isFetching: false,
    currentPage: 0,
    allPages: 0,
    countAllPhotos: 0,
    selectedEmotions: [],
    photosOnPage: []
};

export interface PhotosActions {
    type: string;
    payload: PhotosState;
}

type PhotosResult<TResult> = ThunkAction<TResult, PhotosState, undefined, PhotosActions>;

export type FetchPhotosThunkDispatch = ThunkDispatch<PhotosState, undefined, PhotosActions>;

export function fetchPhotos(): PhotosResult<void> {
    return async function(dispatch: FetchPhotosThunkDispatch) {
        dispatch({ 
            type: FETCH_PHOTOS_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
    };
}