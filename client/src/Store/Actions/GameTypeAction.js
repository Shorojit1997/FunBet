import axios from 'axios';
import * as Types from '../Types'



const gameTypeAction=(history)=>dispatch=>{
    
    axios.get('/api/user/games/game_type')
    .then(info => {
        let gametype = info.data.gametype;
        dispatch({type:Types.SET_GAME_TYPE,payload:{
            gameType:gametype
        }});
      
    })
    .catch(error=>{
        dispatch({type:Types.SET_GAME_TYPE,payload:{
            gameType:[]
        }});
    })
}

export  {gameTypeAction};