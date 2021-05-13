import axios from 'axios';
import * as Types from '../Types'


const pictureAction = (history) => dispatch => {

    axios.get('/api/admin/uploads')
        .then(info => {
            let pictures = info.data.pictures;
            dispatch({
                type: Types.GET_IMAGE, payload: {
                    pictures: pictures
                }
            });

        })
        .catch(error => {
            if (error.response)
                dispatch({
                    type: Types.BET_EN, payload: {
                        flashMessage:error.response.data.flashMessage
                    }
                });
        })
}

export { pictureAction };