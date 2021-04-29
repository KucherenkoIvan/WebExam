import { NOWONLINE_UPDATE } from "./actions";

export function updateNowOnline() {
  return dispatch => {
    const onlineCounter = 1;
    dispatch({ type: NOWONLINE_UPDATE, payload: 'gay' });
  }
}
