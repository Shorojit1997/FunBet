import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios'
import { pictureAction } from '../../Store/Actions/PictureAction'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import * as Types from '../../Store/Types'

const Gallary = () => {
    const [file, setfile] = useState(null)
    const dispatch = useDispatch();
    const { pictures, flashMessage } = useSelector(state => state.pictures, shallowEqual)


    function onFormSubmit(e) {
        e.preventDefault();
        if(!file)return;

        const formData = new FormData();
        formData.append('myImage', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/api/admin/uploads", formData, config)
            .then((response) => {
                dispatch(pictureAction());
                setfile(null);
            }).catch((error) => {
            });
    }
    const deleteHandeler = (_id) => {
        axios.delete(`/api/admin/uploads/${_id}`)
            .then(info => {
                dispatch(pictureAction());
            })
            .catch(e => {
                dispatch({ type: Types.GET_IMAGE_ERROR, payload: { flashMessage: 'Please try again' } })
            })
    }

    // useEffect(() => {
    //     dispatch(pictureAction());
    // }, [dispatch])


    return (
        <div className='d-flex justify-content-center  w-100 mt-2'>
            <div className='card card-body m-0 p-0' style={{ maxWidth: '700px', minWidth: '350px' }} >
                {
                    flashMessage.length !== 0 &&
                    <div className="alert alert-warning  w-100 m-1">
                        {flashMessage}
                    </div>
                }
                <div className="form-group " >
                    <input onChange={(e) => { setfile(e.target.files[0]) }} name="myImage" type="file" className="form-control" id="customFile" />
                    <label className="custom-file-label" htmlFor="customFile">{file ? file.name : 'Upload image'}</label>
                </div>
                <button onClick={onFormSubmit} className='btn btn-info m-1 mt-2 ' >Submit</button>
                <div className='row p-1 m-1'>
                    {
                        pictures.length !== 0 &&
                        pictures.map((item, index) => {
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

