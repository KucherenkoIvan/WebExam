import { combineReducers } from 'redux';
import { NOWONLINE_UPDATE } from './actions';

const nowOnline = (state = { count: 'загрузка...' }, action) => {
  switch(action.type) {
    case NOWONLINE_UPDATE: return { ...state, count: action.payload };
    default: return state;
  }
}

export const rootReducer = combineReducers({ nowOnline });
