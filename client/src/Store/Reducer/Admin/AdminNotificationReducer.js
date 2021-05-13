import * as Types from '../../Types'

const initalState={
    notifications:[],
    flashMessage:''
}

const AdminNotificationsReducer=(state=initalState,action)=>{

    switch(action.type){
        case Types.ADMIN_GET_NOTIFICATIONS:
            return{
                notifications:action.payload.notifications || [],
                flashMessage:state.flashMessage
            }
        case Types.ADMIN_NOTIFICATIONS_ERROR:
            return{
                notifications:state.notifications,
                flashMessage:action.payload.flashMessage || ''
            }
        default:
            return state;
    }

}
export default AdminNotificationsReducer