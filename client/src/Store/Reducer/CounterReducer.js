import * as Types from '../Types'

const initialstate = {
    count: 2,
    count1:777
}

const CounterReducer = (state = initialstate, action) => {
    switch (action.type) {
        case Types.ADD_VALUE:
            return {
             
                count: state.count + 1
            }
        case Types.SUB_VALUE:
            return {
                
                count: state.count - 1
            }
        default: return state
            
    }

}
export default CounterReducer;