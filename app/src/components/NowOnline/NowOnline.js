import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWsConnection } from '../../redux/actionCreators';

export default function NowOnline({ theme }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setWsConnection())
  }, []);

  const count = useSelector(state => state.nowOnline?.count);

  return (
    <span>Сейчас в сети: {count}</span>
  );
}