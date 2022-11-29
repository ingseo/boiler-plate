import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import { DatePicker } from 'antd';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducer';

import persistedReducer from './_reducer';	
import { persistStore } from 'redux-persist';	
import { PersistGate } from 'redux-persist/es/integration/react';

// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

const store = createStore(persistedReducer, compose(
  applyMiddleware(promiseMiddleware, ReduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)
)
const persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
    <Provider
      store={store}
    >
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>,
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


