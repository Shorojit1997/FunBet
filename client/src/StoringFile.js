import authHeaderToken from './AuthHeader/AuthHeader'
import store from './Store/store';
import * as Types from './Store/Types'
const user = localStorage.getItem('authSecret');
const admin = localStorage.getItem('adminAuthSecret');
const club = localStorage.getItem('clubAuthSecret')

export const storingFun = () => {
    if (user) {
        // console.log(user);
        const newUser = JSON.parse(user);
        store.dispatch({ type: Types.LOGIN_USER, payload: { user: JSON.parse(user), authInformations: newUser.authInformation } })

        authHeaderToken(newUser.token)
    }
    else {
        store.dispatch({ type: Types.LOGIN_ERROR, payload: { error: {} } })
    }


    if (admin) {
        // console.log(admin);
        const newUser = JSON.parse(admin);
        store.dispatch({ type: Types.LOGIN_ADMIN, payload: newUser })
        authHeaderToken(newUser.token)
    }
    else {
        store.dispatch({ type: Types.LOGIN_ADMIN, payload: {} })
    }

    if (club) {
        const newUser = JSON.parse(club);
        store.dispatch({ type: Types.CLUB_LOGIN_USER, payload: { user: newUser, authInformations: newUser.authInformation } })

        authHeaderToken(newUser.token)
    }

    return store;

}


