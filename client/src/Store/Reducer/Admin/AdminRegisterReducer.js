import * as Types from '../../Types'

const registerState={
    user:{},
    error:{}
}

const AdminRegisterReducer=(state=registerState,action)=>{

    switch(action.type){
        case Types.REGISTER_ADMIN:
            return{
                user:action.payload || {},
                error:{}
            }
        case Types.REGISTER_ADMIN_ERROR:
            return{
                user:{},
                error:action.payload || {}
            }
        default:
            return state;
    }

}
export default AdminRegisterReducer