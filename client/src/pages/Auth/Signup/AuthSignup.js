import React,{useState,useCallback,useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'
import {registerActionHandeler} from '../../../Store/Actions/RegisterAction';
import {clubListActionHandeler} from '../../../Store/Actions/ClubListAction'
import AlertMessage from '../../../FlashMessage/AlertMessage';


const AuthSignup = () => {
    const history=useHistory();
    const dispatch =useDispatch();
    let {error,user}=useSelector(state=>state.register,shallowEqual)
    // const { colorSettings } = useSelector(state => state.settings, shallowEqual);
    const { clubList } = useSelector(state => state.clubList, shallowEqual);
 
    const[registerInfo,setRegisterInfo]=useState({
        name:'',
        phone:'',
        email:'',
        username:'',
        password:'',
        confirmPassword:'',
        clubName:'',
        sopnsorName:'',
        promocode:''
    })
    const registerHandeler=()=>{
        dispatch(registerActionHandeler(registerInfo,history))
    }

    const getPost=useCallback(()=>{
        dispatch(clubListActionHandeler())
    },[dispatch])
    useEffect(()=>{
        getPost();
    },[getPost])

    return (
        <div className='deposit_main' style={{background:'none',marginTop:'60px' }}>
            <div className='deposit_div'>
                {
                   Object.keys(error).length!==0 &&  <AlertMessage error={error}/>
                }
                ,{
                    Object.keys(user).length!==0 && <AlertMessage error={user} />
                }
                <div className='deposit_header'>Create Your Account</div>
                <input type='text' onChange={(e)=>{setRegisterInfo({...registerInfo,name:e.target.value})}} className='input_style_set' placeholder='Name' />
                <input type='text' onChange={(e)=>{setRegisterInfo({...registerInfo,phone:e.target.value})}} className='input_style_set' placeholder='Phone number' />
                <input type='email' onChange={(e)=>{setRegisterInfo({...registerInfo,email:e.target.value})}} className='input_style_set' placeholder='Email' />
                <input type='text' onChange={(e)=>{setRegisterInfo({...registerInfo,username:e.target.value})}} className='input_style_set' placeholder='Username' />
                <input type='password' onChange={(e)=>{setRegisterInfo({...registerInfo,password:e.target.value})}} className='input_style_set' placeholder='Password' />
                <input type='password' onChange={(e)=>{setRegisterInfo({...registerInfo,confirmPassword:e.target.value})}} className='input_style_set' placeholder='Confirmation Password' />
                <input type='text' onChange={(e) => { setRegisterInfo({ ...registerInfo, promocode: e.target.value }) }} value={registerInfo.promocode} name='promocode' className='input_style_set' placeholder='Security code' />

                <select id='club_name' onChange={(e)=>{setRegisterInfo({...registerInfo,clubName:e.target.value})}} className='select_style_set' name="club_name">
                    <option value="">Select</option>
                    {
                      clubList.length &&  clubList.map(item=>{
                            return( <option value={item}>{item}</option> )
                        })
                    }
                </select>
                <input type='text' onChange={(e)=>{setRegisterInfo({...registerInfo,sopnsorName:e.target.value})}} className='input_style_set' placeholder='Enter sponsor username' />
                <button onClick={registerHandeler} className='button_style_set'>Submit Your Info</button>
                <h5 className='have_account'>Have an account?</h5>
                <button onClick={()=>{history.push('/login')}} className="button_style_set">LOGIN YOUR ACCOUNT</button>

            </div>
        </div>
    );
};

export default AuthSignup;