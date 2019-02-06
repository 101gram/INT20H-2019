import { combineReducers } from 'redux';
import testReducer from '@reducers/test';

const rootReducer = combineReducers({
    test: testReducer,
});

export default rootReducer;