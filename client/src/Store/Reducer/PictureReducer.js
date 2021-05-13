import * as Types from '../Types'

let initialState = {
    flashMessage: '',
    pictures: [],
    sliderImage: [],
}

const PictureReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.GET_IMAGE:
            return {
                ...state,
                flashMessage: '',
                pictures: action.payload.pictures || [],
                sliderImage: state.sliderImage
            }
        case Types.SLIDER_IMAGE:
            return {
                ...state,
                flashMessage: '',
                pictures: state.pictures || [],
                sliderImage: action.payload.sliderImage || []
            }
        case Types.GET_IMAGE_ERROR:
            return {
                pictures: state.pictures,
                flashMessage: action.payload.flashMessage || '',
                sliderImage: state.sliderImage
            }

        default:
            return state;
    }
}

export default PictureReducer;