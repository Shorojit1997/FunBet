import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import axios from 'axios'
import * as Types from '../../../Store/Types'
import authHeaderToken from '../../../AuthHeader/AuthHeader';
import { clubListActionHandeler } from '../../../Store/Actions/ClubListAction'

const Profile = () => {
    const { user } = useSelector(state => state.login, shallowEqual)
    const [flashMessage, setFlashmessage] = useState('');
    const dispatch = useDispatch();
    const { colorSettings } = useSelector(state => state.settings, shallowEqual);
    const { clubList } = useSelector(state => state.clubList, shallowEqual);
    const [authInformation, setAuthinformation] = useState({
        name: '',
        phone: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        clubName: '',
        sopnsorName: ''
    });

    const callMethod = useCallback(() => {
        dispatch(clubListActionHandeler())
        setAuthinformation(user.authInformation);
    }, [user,dispatch])

    useEffect(() => {
        callMethod();
    }, [callMethod]);

    const formChekHandelr = (e) => {
        setAuthinformation({ ...authInformation, [e.target.name]: e.target.value });
    }

    const updateHandeler = () => {
        axios.post('/api/user/edit_info', authInformation)
            .then(info => {

                dispatch({
                    type: Types.LOGIN_USER, payload:
                    {
                        user: info.data,
                        authInformations: info.data.authInformation
                    }
                })
                localStorage.setItem('authSecret', JSON.stringify({ ...info.data }))
                authHeaderToken(info.data.token);
                setFlashmessage(info.data.flashMessage)
            })
            .catch(error => {
                setFlashmessage(error.response.data.flashMessage)
            })

    }

    return (
        <div className='deposit_main' style={{ background: colorSettings.userNavBackground }} >
            <div className='deposit_div'>
                {flashMessage && <div className="alert alert-warning  w-100 m-1">{flashMessage} </div>}

                <div className='deposit_header'>Edit Your Profile</div>
                <input onChange={formChekHandelr} type='text' className='input_style_set' placeholder='Name' name='name' value={authInformation.name} />
                <input onChange={formChekHandelr} type='text' className='input_style_set' disabled placeholder='Phone number' name='phone' value={authInformation.phone} />
                <input onChange={formChekHandelr} type='email' className='input_style_set' disabled placeholder='Email' name='email' value={authInformation.email} />
                <input onChange={formChekHandelr} type='text' className='input_style_set' disabled placeholder='Username' name='username' value={authInformation.username} />
                <input onChange={formChekHandelr} type='password' className='input_style_set' placeholder='Change password' name='password' />
                <input onChange={formChekHandelr} type='password' className='input_style_set' placeholder='Change confirmation Password' name='confirmPassword' />

                <select onChange={formChekHandelr} id='club_name' value={authInformation.clubName} className='select_style_set' name="clubName">
                    <option value=''>Select</option>
                    {
                        clubList.length && clubList.map(item => {
                            return (<option value={item}>{item}</option>)
                        })
                    }
                </select>
                <input onChange={formChekHandelr} type='text' className='input_style_set' placeholder='Enter sponsor username' name='sponsorName' value={authInformation.sponsorName} />
                <button onClick={updateHandeler} className='button_style_set'>Update Your Info</button>
            </div>
        </div>
    );
};

export default Profile;