import { CLOSE_WS, CONNECT_WS, SET_NOWONLINE } from "./actions";

export function setWsConnection() {
  return async dispatch => {
    const locationParsed = document.location.href.split('/');
    const socket = new WebSocket(`ws${locationParsed[0].includes('s') ? 's' : ''}://${locationParsed[2]}/`);
    socket.onopen = () => {
      console.log('socket connected')
    }

    const res = await fetch('/nowOnline');
    const count = await res.json();

    dispatch({ type: CONNECT_WS, payload: socket })
    dispatch({ type: SET_NOWONLINE, payload: count })
  }
}

export function dropWsConnection() {
  return { type: CLOSE_WS };
}
