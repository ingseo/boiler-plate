import { combineReducers } from "redux";
// import user from './user_reducer';'

// ruducer는 한개가 아니라, 여러 기능에 의해 다양하게 존재하는데
// 이를 하나로 모아주는 역할을 하는게 combineReducers
const rootReducer = combineReducers({
    //user,
})

export default rootReducer;