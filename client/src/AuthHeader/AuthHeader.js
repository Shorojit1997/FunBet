import axios from 'axios'

const authHeaderToken=(authtoken)=>{
    if(authtoken){
        const token= 'Barrer '+authtoken;
        axios.defaults.headers.common['Authorization'] = token;
    }
}

export default authHeaderToken;