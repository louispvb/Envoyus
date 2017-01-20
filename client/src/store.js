import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import userReducer from './reducers/userReducer';


const store = createStore(
  userReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;