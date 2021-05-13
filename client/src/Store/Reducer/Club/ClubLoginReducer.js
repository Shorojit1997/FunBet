import * as Type from '../../Types'

const loginstate={
    isClubAuthenticated:false,
    user:{},
    authInformations:{},
    loginError:{},
}

const ClubLoginReducer=(state=loginstate,action)=>
{
    switch(action.type){
        case Type.CLUB_LOGIN_USER:
            return{
                ...state,
                isClubAuthenticated: Object.keys(action.payload.user).length!==0 ,
                user:action.payload.user || {},
                authInformations:action.payload.authInformations || {},
                loginError:{}
            }
            case Type.CLUB_LOGIN_USER_UPDATE:
                return{
                    ...state,
                    isClubAuthenticated:state.isClubAuthenticated ,
                    user:state.user,
                    authInformations:action.payload.authInformations || {},
                    loginError:{}
                }
        case Type.CLUB_LOGIN_ERROR:
            return{
                ...state,
                isClubAuthenticated:false,
                user:{},
                authInformations:{},
                loginError:action.payload.error || {}
            }
        default :
        return state;
    }
}

export default ClubLoginReducer;