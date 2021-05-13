import * as Types from '../Types'

const registerState={
    user:{},
    error:{}
}

const RegisterReducer=(state=registerState,action)=>{

    switch(action.type){
        case Types.REGISTER_USER:
            return{
                user:action.payload || {},
                error:{}
            }
        case Types.REGISTER_ERROR:
            return{
                user:{},
                error:action.payload || {}
            }
        default:
            return state;
    }

}
export default RegisterReducer