import * as Types from '../../Types'

const initialstate = {
    flashMessage: '',
    generalSettings: {},
    colorSettings: {}
}

const AdminSettingsReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADMIN_GENERAL_SETTINGS:
            return {
                flashMessage: '',
                generalSettings: action.payload.generalSettings || {},
                colorSettings: state.colorSettings
            }
        case Types.ADMIN_COLOR_SETTINGS:
            return {
                ...state,
                flashMessage: '',
                generalSettings: state.generalSettings,
                colorSettings: action.payload.colorSettings || {}
            }
        case Types.ADMIN_GENERAL_SETTINGS_ERROR:
            return {
                ...state,
                flashMessage: action.payload.flashMessage || '',
                generalSettings: state.generalSettings,
                colorSettings: state.colorSettings
            }

        default: return state

    }

}
export default AdminSettingsReducer;