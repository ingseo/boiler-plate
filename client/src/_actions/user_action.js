import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types'

export function loginUser(dataToSubmit){
    const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data ) //서버에서 받은 데이터를 request에 저장한다.
    
    return{
        type: LOGIN_USER,
        payload: request, // payload = request = 백엔드에서 가져온 유저 데이터
    }
    //리턴을 시켜서 리듀서로 보낸다.
    // html메소드, post를 이용하여 백엔드쪽, 로그인api에 정보를 보내준다. 
    //이후 토큰 비교 등등 로그인확인 절차진행
}

export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data ) 
    
    return{
        type: REGISTER_USER,
        payload: request, 
    }
}

//get 메소드이기 때문에 보내는 부분은 필요없음
export function auth(){
    const request = axios.get('/api/users/auth')
    .then(response => response.data ) 
    
    return{
        type: AUTH_USER,
        payload: request, 
    }
}