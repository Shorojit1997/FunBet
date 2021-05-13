import React,{useState} from 'react';
import { useDispatch } from 'react-redux'
import { adminBetsActionHandeler } from '../../../Store/Actions/Admin/AdminBetAction'
import EditGameModal from './EditGameModal'
import axios from 'axios'
import * as Types from '../../../Store/Types'

const EditOrLive = ({ cell }) => {
    const dispatch = useDispatch();
    const [modal,setModal]=useState(false)
    const { _id,teamA,teamB,turnamentName,playStatus,gameType,gameDate,gameTime } = cell.value;
    
    const deleteBetsHandeler = () => {
        const apiUrl = `/api/admin/bets/delete/${_id}`
        axios.post(apiUrl)
            .then(info => {
                dispatch(adminBetsActionHandeler())
            })
            .catch(e => {
                if (e.response) {
                    dispatch({ type: Types.ADMIN_BET_ERROR, paylad: { flashMessage: e.response.data.flashMessage } })
                }
                else {
                    dispatch({ type: Types.ADMIN_BET_ERROR, paylad: { flashMessage: 'Internal server error' } })
                }
            })
    }



    return (
        <div className='d-flex justify-content-center'>
            {
                modal && <EditGameModal
                   modal={modal}
                   setModal={setModal}
                   teamA={teamA}
                   teamB={teamB}
                   turnamentName={turnamentName}
                   playStatus={playStatus}
                   gameTypeN={gameType}
                   gameDate={gameDate}
                   gameTime={gameTime}
                   matchId={_id}
                />
            }
            <button onClick={()=>setModal(!modal)} className='btn btn-sm btn-info m-1'>Edit</button>
            <button onClick={deleteBetsHandeler} className='btn btn-sm btn-danger m-1'>Delete</button>
        </div>
    );
};

export default EditOrLive;