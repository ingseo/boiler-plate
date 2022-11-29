import { combineReducers } from "redux";
import user from './user_reducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root',
    storage,
  }	

// ruducer는 한개가 아니라, 여러 기능에 의해 다양하게 존재하는데
// 이를 하나로 모아주는 역할을 하는게 combineReducers
const rootReducer = combineReducers({
    user,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;