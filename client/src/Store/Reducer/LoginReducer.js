import * as Type from '../Types'

const loginstate={
    isAuthenticated:false,
    user:{},
    authInformations:{},
    loginError:{},
}

const LoginReducer=(state=loginstate,action)=>
{
    switch(action.type){
        case Type.LOGIN_USER:
            return{
                ...state,
                isAuthenticated: Object.keys(action.payload.user).length!==0 ,
                user:action.payload.user || {},
                authInformations:action.payload.authInformations || {},
                loginError:{}
            }
            case Type.LOGIN_USER_UPDATE:
                return{
                    ...state,
                    isAuthenticated:state.isAuthenticated ,
                    user:state.user,
                    authInformations:action.payload.authInformations || {},
                    loginError:{}
                }
        case Type.LOGIN_ERROR:
            return{
                ...state,
                isAuthenticated:false,
                user:{},
                authInformations:{},
                loginError:action.payload.error || {}
            }
        default :
        return state;
    }
}

export default LoginReducer;