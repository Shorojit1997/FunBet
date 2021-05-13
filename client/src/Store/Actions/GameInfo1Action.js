import * as Types from '../Types'
import axios from 'axios'

// dateformat(item.requestedAt, "dd-mm-yy, h:MM TT")
export const admincoinRatingActionHandeler = (info) => async (dispatch) => {

    axios.get('/api/user/games/coin')
        .then(info => {
            if (info.data) {
                dispatch({
                    type: Types.COIN_RATE_GET, payload: {
                        coinRating: info.data.coinRating
                    }
                })
            }
        })
        .catch(error => {

            if (error.response)
                dispatch({ type: Types.COIN_PLAY_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.COIN_PLAY_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
        })

}

export const userCoinPlayActionHandeler = ({ info, setModal, setInfo, setisDisable }) => async (dispatch) => {
    setisDisable(true)
    axios.post('/api/user/games/coin', info)
        .then(info => {
            if (info.data) {

                dispatch({
                    type: Types.COIN_PLAY, payload: {
                        playStatus: '',
                        tossNumber: '4',
                    }
                })
                setTimeout(() => {
                    setModal(true);
                    dispatch({
                        type: Types.COIN_PLAY, payload: {
                            tossNumber: info.data.tossNumber,
                            playStatus: info.data.playStatus
                        }
                    })
                    setTimeout(() => {
                        setInfo({ tossNum: '', catchAmount: '' })
                        dispatch({
                            type: Types.COIN_PLAY, payload: {
                                playStatus: '',
                                tossNumber: '',
                            }
                        })
                        setModal(false);
                        setisDisable(false);
                    }, 5000)
                }, 4000)

            }
        })
        .catch(error => {
            if (error.response)
                dispatch({ type: Types.COIN_PLAY_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.COIN_PLAY_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
            setisDisable(false);
        })

}
