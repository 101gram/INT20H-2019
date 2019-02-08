import { createStore, applyMiddleware, compose, Action as ActionCommon } from 'redux';
import { PhotosState } from '@actions/fetchPhotos';
import rootReducer from '@reducers/index';
import thunk from 'redux-thunk';

// DELETE ON PROD
const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);
export interface Action<T = unknown> extends ActionCommon  {
    payload: T;
}

export interface ApplicationStore {
    photos: PhotosState;
}

export default createStore(rootReducer, enhancer);