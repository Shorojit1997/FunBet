import * as Types from '../../Types'

const initialstate={
   flashMessage:'',
   promocode:[],
}

const AdminPromocodeReducer=(state=initialstate,action)=>{

    switch(action.type){
        case Types.ADMIN_GET_PROMOCODE:
            return{
               promocode:action.payload.promocode || [],
               flashMessage:''
            }
        case Types.ADMIN_PROMOCODE_ERROR:
            return{
                 promocode:state.promocode,
                 flashMessage:action.payload.flashMessage || ''
            }
        default:
            return state;
    }

}
export default AdminPromocodeReducer