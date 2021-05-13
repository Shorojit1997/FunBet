import React, { useState, useEffect, useCallback } from 'react';
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { sliderSettingsActionHandeler } from '../../Store/Actions/Admin/AdminSettingsAction'
import ImageModal from '../ImageModal/ImageModal'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import * as Types from '../../Store/Types'

const Gallary = () => {

    const [modal, setModal] = useState(false)
    const dispatch = useDispatch();
    const { pictures, flashMessage, sliderImage } = useSelector(state => state.pictures, shallowEqual)


    const deleteHandeler = (_id) => {
        axios.delete(`/api/admin/slider_image/${_id}`)
            .then(info => {
                dispatch(sliderSettingsActionHandeler());
            })
            .catch(e => {
                dispatch({ type: Types.GET_IMAGE_ERROR, payload: { flashMessage: 'Please try again' } })
            })
    }
    const setIconImageHandeler = (_id) => {
        axios.post(`/api/admin/slider_image/${_id}`)
            .then(info => {
                dispatch(sliderSettingsActionHandeler());
                setModal(false)
            })
            .catch(e => {

            })
    }
    const getSlider = useCallback(() => {
        dispatch(sliderSettingsActionHandeler())
    }, [dispatch])

    useEffect(() => {
        getSlider()
    }, [getSlider])


    return (
        <div className='d-flex justify-content-center  w-100 mt-2'>
            <div className='card card-body m-0 p-0' style={{ maxWidth: '700px', minWidth: '330px' }} >
                <div className=' d-flex justify-content-center'>
                    <button onClick={() => { setModal(!modal) }} className='m-1 btn btn-sm btn-success'>Add Image</button>
                </div>
                {
                    modal && <ImageModal
                        modal={modal}
                        setModal={setModal}
                        pictures={pictures}
                        flashMessage={flashMessage}
                        setImageHandeler={setIconImageHandeler}
                        headerTitle='Set image in slider'

                    />
                }
                {
                    flashMessage.length !== 0 &&
                    <div className="alert alert-warning  w-100 m-1">
                        {flashMessage}
                    </div>
                }
                <div className='row p-1 m-1'>
                    {
                        sliderImage.length !== 0 &&
                        sliderImage.map((item, index) => {
                            return (
                                <div key={index + 1} className='col-4 m-0 p-0 border'>
                                    <button
                                        onClick={() => { deleteHandeler(item._id) }}
                                        style={{ bottom: '5px', right: '5px' }}
                                        className='btn btn-sm btn-danger position-absolute'><AiFillDelete /></button>
                                    <img src={item.pictureUrl} style={{ width: '90%', margin: '5px' }} alt={item.createdAt} />
                                </div>
                            )
                        })

                    }
                </div>
            </div>

        </div>
    );
};

export default Gallary;

