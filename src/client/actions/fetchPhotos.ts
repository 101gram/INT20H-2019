import { EP } from '@common/interfaces';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IMAGES_PER_PAGE } from '@components/imageCard/Paginator';
import ApolloClient from "apollo-boost";
import { QueryPhotos } from '@app/graphql';

export const FETCH_PHOTOS_REQUEST = 'FETCH_PHOTOS_REQUEST'; 
export const FETCH_PHOTOS_SUCCESS = 'FETCH_PHOTOS_SUCCESS';
export const FETCH_PHOTOS_FAILURE = 'FETCH_PHOTOS_FAILURE';

const client = new ApolloClient();
  
export type PhotosState = {
    isFetching: boolean;
    currentPage: number;
    countAllPhotos: number;
    lastError: string;
    lastErrorDate: number;
    selectedEmotions: EP.Emotion[];
    photosOnPage: QueryPhotos.Data[];
};

export const defaultPayload: PhotosState = {
    isFetching: false,
    currentPage: 0,
    countAllPhotos: 0,
    lastError: '',
    lastErrorDate: 0,
    selectedEmotions: [],
    photosOnPage: []
};

export interface PhotosActions {
    type: string;
    payload: PhotosState;
}

type PhotosResult<TResult> = ThunkAction<TResult, PhotosState, undefined, PhotosActions>;

export type FetchPhotosThunkDispatch = ThunkDispatch<PhotosState, undefined, PhotosActions>;

export function fetchPhotos(page: number, emotions: EP.Emotion[]): PhotosResult<void> {
    return async function(dispatch: FetchPhotosThunkDispatch) {
        dispatch({ 
            type: FETCH_PHOTOS_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });
        let result;
        try {
            const response = await client.query<QueryPhotos.Query, QueryPhotos.Variables>({
                variables: {
                    req: {
                        limit: IMAGES_PER_PAGE,
                        offset: (page - 1) * IMAGES_PER_PAGE,
                        filter: !emotions.length ? null : {
                            include: { emotions }
                        }
                    }
                }, 
                query: QueryPhotos.Document
            });
            if (!response || response.errors) {
                throw new Error(response.networkStatus.toString());
            }
            result = response.data.getPhotos;
        } catch(e) {
            dispatch({ type: FETCH_PHOTOS_FAILURE, payload: { 
                ...defaultPayload, 
                lastError: e.message,
                lastErrorDate: Date.now()
            }});
            return;
        }
        dispatch({
            type: FETCH_PHOTOS_SUCCESS,
            payload: {
                ...defaultPayload,
                photosOnPage: result.data,
                currentPage: page,
                selectedEmotions: emotions,
                allPages: Math.ceil(result.total / IMAGES_PER_PAGE),
                countAllPhotos: result.total
            }
        });
    };
}