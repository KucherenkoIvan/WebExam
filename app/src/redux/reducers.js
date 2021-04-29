import { combineReducers } from 'redux';
import { CLOSE_WS, CONNECT_WS, SET_NOWONLINE, SET_ROUTE } from './actions';


const nowOnline = (state = 'загрузка...', action) => {
  switch(action.type) {
    case SET_NOWONLINE: return action.payload;
    default: return state;
  }
}

const route = (state = { page: '/' }, action) => {
  switch(action.type) {
    case SET_ROUTE: return { ...state, page: action.payload };
    default: return state;
  }
}

const socket = (state = null, action ) => {
  switch(action.type) {
    case CONNECT_WS: {
      if (state) {
        return state;
      } else return action.payload;
    }
    case CLOSE_WS: {
      state?.close();
      return null; 
    }
    default: return state;
  }
}

export const rootReducer = combineReducers({ route, socket, nowOnline });
