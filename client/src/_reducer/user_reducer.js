import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types'

export default function(state = {}, action){
    switch(action.type){
        case LOGIN_USER:
            return{...state, loginSuccess: action.payload }
            break;

        case REGISTER_USER:
            return{...state, register: action.payload}
            break;

        case AUTH_USER: 
        //action.payload = backend의 index.js, api에 있는 정보가 담김
            return{...state, userData: action.payload}
            break;
        
        default:
            return state;
    }
}