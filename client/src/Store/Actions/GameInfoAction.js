import * as Types from '../Types'
import axios from 'axios'

// dateformat(item.requestedAt, "dd-mm-yy, h:MM TT")
export const adminLudoRatingActionHandeler = (info) => async (dispatch) => {

    axios.get('/api/user/games/ludo')
        .then(info => {
            if (info.data) {
                dispatch({
                    type: Types.LUDO_RATE_GET, payload: {
                        ludoRating: info.data.ludoRating
                    }
                })
            }
        })
        .catch(error => {

            if (error.response)
                dispatch({ type: Types.LUDO_PLAY_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.LUDO_PLAY_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
        })

}

export const userLudoPlayActionHandeler = ({ info, setInfo, setModal,setisDisable }) => async (dispatch) => {
    setisDisable(true);
    axios.post('/api/user/games/ludo', info)
        .then(info => {
            if (info.data) {
                let tossNum = info.data.tossNumber;
                const [xRand, yRand] = axisGenerator(tossNum)
                dispatch({
                    type: Types.LUDO_PLAY, payload: {
                        ludoX: xRand,
                        ludoY: yRand,
                        playStatus: info.data.playStatus
                    }
                })
                setTimeout(() => {
                    setModal(true)
                    setTimeout(() => {
                        setModal(false)
                        dispatch({
                            type: Types.LUDO_PLAY, payload: {
                                ludoX: '90',
                                ludoY: '90',
                            }
                        })
                        setInfo({ tossNum: '', catchAmount: '' });
                        setisDisable(false);

                    }, 5000)
                }, 7000)
            }
        })
        .catch(error => {
            if (error.response)
                dispatch({ type: Types.LUDO_PLAY_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.LUDO_PLAY_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
            setisDisable(false);
        })

}

export const adminWheelRatingActionHandeler = (info) => async (dispatch) => {

    axios.get('/api/user/games/wheel')
        .then(info => {
            if (info.data) {
                dispatch({
                    type: Types.WHEEL_RATE_GET, payload: {
                        wheelRating: info.data.wheelRating
                    }
                })
            }
        })
        .catch(error => {
            if (error.response)
                dispatch({ type: Types.WHEEL_RATE_GET_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.WHEEL_RATE_GET_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
        })

}

export const userWheelPlayActionHandeler = ({ info, setModal, setInfo,setisDisable }) => async (dispatch) => {
    setisDisable(true);

    axios.post('/api/user/games/wheel', info)
        .then(info => {
            if (info.data) {
                let tossNum = info.data.tossNumber;
                const fortuneDegree = degreeGenerator(tossNum)
                dispatch({
                    type: Types.WHEEL_PLAY, payload: {
                        fortuneDegree: fortuneDegree,
                        wheelStatus: info.data.playStatus
                    }
                })
                setTimeout(() => {
                    setModal(true)
                    setTimeout(() => {
                        setModal(false)
                        dispatch({
                            type: Types.WHEEL_PLAY, payload: {
                                fortuneDegree: '22'
                            }
                        })
                        setInfo({ tossNum: '', catchAmount: '' })
                        setisDisable(false);

                    }, 5000)
                }, 6000)

            }
        })
        .catch(error => {
            if (error.response)
                dispatch({ type: Types.WHEEL_PLAY_ERROR, payload: { flashMessage: error.response.data.flashMessage } })
            else {
                dispatch({ type: Types.WHEEL_PLAY_ERROR, payload: { flashMessage: 'Internal server error' } })
            }
            setisDisable(false);
        })

}

const axisGenerator = (tossNum) => {
    let xRand = '0';
    let yRand = '0'
    if (parseInt(tossNum, 10) === 1) {
        xRand = 3600;
        yRand = 3600;
    }
    else if (parseInt(tossNum, 10) === 2) {
        xRand = 7200;
        yRand = 7380;
    }
    else if (parseInt(tossNum, 10) === 3) {
        xRand = 10800;
        yRand = 11070;
    }

    else if (parseInt(tossNum, 10) === 4) {
        xRand = 7200;
        yRand = 7290;
    }

    else if (parseInt(tossNum, 10) === 5) {
        xRand = 7470;
        yRand = 7200;
    }

    else if (parseInt(tossNum, 10) === 6) {
        xRand = 7290;
        yRand = 7200;
    }
    return [xRand, yRand]

}



const degreeGenerator = (tossNum) => {
    let fortuneDegree = 0;
    if (parseInt(tossNum, 10) === 1) {
        fortuneDegree = 3600;
    }
    else if (parseInt(tossNum, 10) === 2) {
        fortuneDegree = 7245;
    }
    else if (parseInt(tossNum, 10) === 3) {
        fortuneDegree = 7300;
    }

    else if (parseInt(tossNum, 10) === 4) {
        fortuneDegree = 7340;
    }

    return fortuneDegree;

}

