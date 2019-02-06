import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '@reducers/index';
import thunk from 'redux-thunk';

// DELETE ON PROD
const windowIfDefined = typeof window === 'undefined' ? null : window as any;
const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk),
);

const store = createStore(rootReducer, enhancer);

/**
 *  type for state in web front application
 *  @param TData - there you can store some date 
 *  ******************
 *  hint: errorMassage could be null, if there wasn't any error before
 */
export type DefaultState<TData> = {
    isFetching: boolean,
    errorMessage: string | null,
    data: TData;
};

export default store;