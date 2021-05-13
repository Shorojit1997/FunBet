import * as Types from '../Types'

const initalState={
    notifications:[],
    flashMessage:''
}

const NotificationsReducer=(state=initalState,action)=>{

    switch(action.type){
        case Types.GET_NOTIFICATIONS:
            return{
                notifications:action.payload.notifications || [],
                flashMessage:state.flashMessage
            }
        case Types.NOTIFICATIONS_ERROR:
            return{
                notifications:state.notifications,
                flashMessage:action.payload.flashMessage || ''
            }
        default:
            return state;
    }

}
export default NotificationsReducer