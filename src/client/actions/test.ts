import Axios from 'axios';
//import { createAction } from 'redux-actions';
//import { DefaultState } from '@configs/configureReduxStore';
export const TEST_REQUEST = 'TEST_REQUEST'; 
export const TEST_SUCCESS = 'TEST_SUCCESS';
export const TEST_FAILURE = 'TEST_FAILURE';

// type TestData = {
//     test_arr: [unknown];
//     test_obj: unknown;
// };

//export type DefaultState<TestData> {}

export const defaultPayload = {
    isFetching: null,
    error: { 
        message: null, 
        statusCode: null
    },
    data: {
        text: null
    }
};

export function test() {
    return async function(dispatch: any) {
        dispatch({ 
            type: TEST_REQUEST,
            payload: { ...defaultPayload, isFetching: true }
        });

        const config = {
            headers: {
                'content-type': 'application/json'
            }
        };
        
        const body_data = {
            image_url: "https://kor.ill.in.ua/m/610x385/2184244.jpg",
            return_landmark: "1",
            return_attributes: "gender,age"
        };
        let response;
        
        try {
            response = await Axios.post(
                '/api/facepp/test',
                body_data,
                config
            );
        } catch (e) {
            console.log(e.message);
        }


        if (response === null) {
            return dispatch({
                type: TEST_FAILURE,
                payload: { ...defaultPayload, error: { message: "0", statusCode: 0 } }
            });
        }
        dispatch({
            type: TEST_SUCCESS,
            payload: { ...defaultPayload, data: { text: response } },
        });
    };
}