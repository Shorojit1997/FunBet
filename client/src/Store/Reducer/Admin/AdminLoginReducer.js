import * as Type from '../../Types'

const loginstate={
    isAdminAuthenticated:false,
    info:{},
    loginError:{}
}

const AdminLoginReducer=(state=loginstate,action)=>
{
    switch(action.type){
        case Type.LOGIN_ADMIN:
            return{
                ...state,
                isAdminAuthenticated: Object.keys(action.payload).length!==0 ,
                info:action.payload || {},
                loginError:{}
            }
        case Type.LOGIN_ADMIN_ERROR:
            return{
                ...state,
                isAdminAuthenticated:false,
                info:{},
                loginError:action.payload || {}
            }
        default :
        return state;
    }
}

export default AdminLoginReducer;