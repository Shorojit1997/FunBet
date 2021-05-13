import * as Types from '../Types'
import axios from 'axios'

// dateformat(item.requestedAt, "dd-mm-yy, h:MM TT")
export const adminEvenRatingActionHandeler = (info) => async (dispatch) => {

    axios.get('/api/user/games/even_odd')
        .then(info => {
            if (info.data) {
                dispatch({
                    type: Types.EVEN_RATE_GET, payload: {
                        evenOddRating: info.data.evenOddRating
                    }
                })
            }
        })
        .catch(error => {

            if (error.response)
                dispatch({ type: Types.EVEN_PLAY_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.EVEN_PLAY_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
        })

}

export const userEvenPlayActionHandeler = ({ info, setModal, setInfo, setisDisable }) => async (dispatch) => {
    setisDisable(true);
    axios.post('/api/user/games/even_odd', info)
        .then(info => {
            if (info.data) {
                dispatch({
                    type: Types.EVEN_PLAY, payload: {
                        tossNumber: '4',
                        playStatus: info.data.playStatus
                    }
                })

                setTimeout(() => {
                    setModal(true);
                    dispatch({
                        type: Types.EVEN_PLAY, payload: {
                            tossNumber: info.data.tossNumber,
                            playStatus: info.data.playStatus
                        }
                    })
                    setTimeout(() => {
                        setInfo({ tossNum: '', catchAmount: '' })
                        dispatch({
                            type: Types.EVEN_PLAY, payload: {
                                // playStatus: '',
                                // tossNumber: '',
                            }
                        })
                        setModal(false);
                        setisDisable(false);
                    }, 5000)

                }, 5000);


            }
        })
        .catch(error => {
            if (error.response)
                dispatch({ type: Types.EVEN_PLAY_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.EVEN_PLAY_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
            setisDisable(false);
        })

}
