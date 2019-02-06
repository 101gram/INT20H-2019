import { 
    TEST_FAILURE,
    TEST_REQUEST,
    TEST_SUCCESS,
    defaultPayload
} from '@actions/test';

const initialState = {
    ...defaultPayload
};

function testReducer(state = initialState, action: any) {
    const data = action.payload;
    switch (action.type) {
        case TEST_FAILURE:
        case TEST_REQUEST:
        case TEST_SUCCESS: {
            return {
                ...state, 
                isFetching: data.isFetching,
                error: data.error, 
                data: data.data, 
            };
        }
        default: {
            return state;
        }
    }
}

export default testReducer;
