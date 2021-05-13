import axios from 'axios';
import * as Types from '../Types'



const questionAction=(history)=>dispatch=>{
    
    axios.get('/api/user/bets')
    .then(info => {
        let bets = info.data.bets;
        dispatch({type:Types.BET_EN,payload:{
            bets:bets
        }});
      
    })
    .catch(error=>{
        dispatch({type:Types.BET_EN,payload:{
            bets:[]
        }});
    })
}

export  {questionAction};