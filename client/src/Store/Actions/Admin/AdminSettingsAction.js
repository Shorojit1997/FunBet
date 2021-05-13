import * as Types from '../../Types'

import axios from 'axios'


export const adminSettingsActionHandeler = (info) => async (dispatch) => {

    axios.post('/api/admin/general_settings', info)
        .then(info => {

            if (info.data) {
                dispatch({ type: Types.ADMIN_GENERAL_SETTINGS, payload:{
                    generalSettings:info.data.generalSettings
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_GENERAL_SETTINGS_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_GENERAL_SETTINGS_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}

export const SettingsActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/general_settings')
        .then(info => {

            if (info.data) {
                dispatch({ type: Types.ADMIN_GENERAL_SETTINGS, payload:{
                    generalSettings:info.data.generalSettings
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_GENERAL_SETTINGS_ERROR, payload: {flashMessage:error.response.data.flashMessage} })
            else{
                dispatch({ type: Types.ADMIN_GENERAL_SETTINGS_ERROR,payload:{flashMessage:'Internal server error'} })
            }
        })

}

// color settings


export const adminColorSettingsActionHandeler = (info) => async (dispatch) => {

    axios.post('/api/admin/color_settings', info)
        .then(info => {

            if (info.data) {
                dispatch({ type: Types.ADMIN_COLOR_SETTINGS, payload:{
                    colorSettings:info.data.colorSettings
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_COLOR_SETTINGS_ERROR, payload: error.response.data.flashMessage })
            else{
                dispatch({ type: Types.ADMIN_COLOR_SETTINGS_ERROR, payload: {flashMessage:'Internal server error'} })
            }
        })

}

export const colorSettingsActionHandeler = () => async (dispatch) => {

    axios.get('/api/admin/color_settings')
        .then(info => {

            if (info.data) {
                dispatch({ type: Types.ADMIN_COLOR_SETTINGS, payload:{
                    colorSettings:info.data.colorSettings
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.ADMIN_COLOR_SETTINGS_ERROR, payload: error.response.data })
            else{
                dispatch({ type: Types.ADMIN_COLOR_SETTINGS_ERROR, payload:{flashMessage:'Internal server error'} })
            }
        })

}

export const sliderSettingsActionHandeler = () => async (dispatch) => {

    axios.get('/api/user/slider_image')
        .then(info => {
            if (info.data) {
                dispatch({ type: Types.SLIDER_IMAGE, payload:{
                    sliderImage:info.data.sliderImage
                }})
            }
        })
        .catch(error => {
            if(error.response)
                 dispatch({ type: Types.GET_IMAGE_ERROR, payload: error.response.data })
            else{
                dispatch({ type: Types.GET_IMAGE_ERROR, payload:{flashMessage:'Internal server error'} })
            }
        })

}




