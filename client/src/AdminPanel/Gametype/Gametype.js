import React, { useState, useEffect, useCallback } from 'react';
import AddGametypeModal from './AddGametypeModal'
import { gameTypeAction } from '../../Store/Actions/GameTypeAction';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { pictureAction } from '../../Store/Actions/PictureAction'
import ImageModal from '../ImageModal/ImageModal'
import axios from 'axios';
const Gametype = () => {
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const[gameId,setGameid]=useState('')
    const dispatch = useDispatch();
    const { gameType } = useSelector(state => state.gameType, shallowEqual);
    const { pictures, flashMessage } = useSelector(state => state.pictures, shallowEqual)

    const getItems = useCallback(() => {
        dispatch(gameTypeAction());
        dispatch(pictureAction());
    }, [dispatch])

    useEffect(() => {
        getItems();

    }, [getItems])

    const deleteHandeler=(id)=>{
        axios.post(`/api/admin/games/delete_game_type/${id}`)
        .then(info=>{
            dispatch(gameTypeAction())
        })
        .catch(e=>{

        })
    }
 
  const setImageHandeler=(id)=>{
    axios.post(`/api/admin/games/edit_game_type/${gameId}`,{picId:id})
    .then(info=>{
        dispatch(gameTypeAction());
        setModal1(false)
    })
    .catch(e=>{

    })
      
  }

    return (
        <div className='d-flex justify-content-center w-100' style={{ marginTop: '60px' }}>
            <div className='card card-body m-2 p-1' style={{ maxWidth: '700px', minWidth: '350px' }} >
                <div className=' d-flex justify-content-center'>
                    <button onClick={() => { setModal(!modal) }} className='m-1 btn  btn-success'>Add</button>
                </div>
                {
                    <AddGametypeModal
                        modal={modal}
                        setModal={setModal}
                    />
                }
                {
                    modal1 && <ImageModal
                    modal={modal1}
                    setModal={setModal1}
                    pictures={pictures}
                    flashMessage={flashMessage}
                    setImageHandeler={setImageHandeler}
                    headerTitle='Set image in game types'

                />
                }
                <div className='row p-1 m-1 border bg-dark'>
                    <div style={{ borderRight: "1px solid gray", color: 'white' }} className='col-4'>Image </div>
                    <div style={{ borderRight: "1px solid gray", color: 'white' }} className='col-4'>Game_name</div>
                    <div style={{ color: 'white' }} className='col-4'>Action </div>
                </div>
                {
                    gameType.length !== 0 ?
                        gameType.map(item => {
                            return (
                                <div key={Math.random()*9479123971} className='row  p-1 m-1 border'>
                                    <div  className='col-4 border-right'>
                                        <img
                                          onClick={()=>{setGameid(item._id);setModal1(true)}}
                                          style={{ width: '50px', height: '50px',cursor:'pointer' }} 
                                          src={item.picsUrl} alt={item.name} />
                                    </div>
                                    <div className='col-4 border-right d-flex align-items-center justify-content-center'>{item.name}</div>
                                    <div className='col-4 d-flex align-items-center justify-content-center'>
                                        <button onClick={()=>{deleteHandeler(item._id)}} className='btn btn-sm btn-danger m-1'>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                        : <div className='card card-body'>Empty</div>
                }



            </div>
        </div>
    );
};

export default Gametype;