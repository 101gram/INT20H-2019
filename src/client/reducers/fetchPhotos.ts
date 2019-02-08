import { 
    FETCH_PHOTOS_FAILURE,
    FETCH_PHOTOS_REQUEST,
    FETCH_PHOTOS_SUCCESS,
    PhotosActions,
    defaultPayload
} from '@actions/fetchPhotos';

const initialState = {
    ...defaultPayload
};

export default function photosReducer(state = initialState, action: PhotosActions) {
    const data = action.payload;
    switch (action.type) {
        case FETCH_PHOTOS_FAILURE:
        case FETCH_PHOTOS_REQUEST:
        case FETCH_PHOTOS_SUCCESS: {
            return {
                ...state, 
                isFetching: data.isFetching,
                allPages: data.allPages,
                countAllPhotos: data.countAllPhotos,
                currentPage: data.currentPage,
                photosOnPages: data.photosOnPage,
                selectedEmotion: data.selectedEmotions
            };
        }
        default: {
            return state;
        }
    }
}