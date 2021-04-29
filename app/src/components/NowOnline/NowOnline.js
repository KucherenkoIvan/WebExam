import React from 'react';
import { useSelector } from 'react-redux';

export default function NowOnline({ theme }) {
  const nowOnline = useSelector(state => state.nowOnline.count);
  
  return (
    <div id="qooi-counter">
      Сейчас онлайн: {nowOnline}
    </div>
  );
}