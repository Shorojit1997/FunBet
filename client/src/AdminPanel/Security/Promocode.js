import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { adminPromocodeActionHandeler } from '../../Store/Actions/Admin/AdminPromocodeAction';
import AddPromocodeModal from './AddPromocodeModal';
import axios from 'axios'

const Promocode = () => {

    const dispatch = useDispatch();
    const [modal, setModal] = useState(false);
    const { promocode } = useSelector(state => state.promocode, shallowEqual);

    const deletePromocode=(_id)=>{
        const uri=`/api/admin/security/${_id}`
        axios.delete(uri)
        .then(info=>{
            dispatch(adminPromocodeActionHandeler());
        })
        .catch(e=>{
            if(e.response){
            }
        })

    }

    const getPromocode = useCallback(() => {
        dispatch(adminPromocodeActionHandeler());
    }, [dispatch])

    useEffect(() => {
        getPromocode();
    }, [getPromocode])
    return (
        <div className='d-flex justify-content-center w-100' style={{marginTop:'60px'}}>
            <div className='card card-body m-2 p-1' style={{ maxWidth: '700px', minWidth: '350px' }} >
                <div className=' d-flex justify-content-center'>
                    <button onClick={() => { setModal(!modal) }} className='m-1 btn  btn-success'>Add</button>
                </div>
                {
                    <AddPromocodeModal
                    modal={modal}
                    setModal={setModal}
                    />
                }

                {
                    promocode.length !== 0 ?
                        <>   {
                            promocode.map((item) => {
                                return (
                                    <div key={Math.random()*9999344} className='row p-1 m-1 border'>
                                        <div className='col-6'>{item.promocode}</div>
                                        <div className='col-6'>
                                            <button onClick={()=>{deletePromocode(item._id)}} className='btn btn-sm btn-danger'>Delete</button>
                                        </div>
                                    </div>
                                )
                            })
                        } </> :
                        <div className='card card-body'>Empty</div>

                }

            </div>
        </div>
    );
};

export default Promocode;