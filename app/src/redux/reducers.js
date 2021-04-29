import { combineReducers } from 'redux';
import { NOWONLINE_UPDATE, SET_ROUTE } from './actions';

const nowOnline = (state = { count: 'загрузка...' }, action) => {
  switch(action.type) {
    case NOWONLINE_UPDATE: return { ...state, count: action.payload };
    default: return state;
  }
}
const route = (state = { page: '/' }, action) => {
  switch(action.type) {
    case SET_ROUTE: return { ...state, page: action.payload };
    default: return state;
  }
}

export const rootReducer = combineReducers({ nowOnline, route });
