import React from 'react';
import { useDispatch } from 'react-redux';
import { SET_ROUTE } from '../../redux/actions';
import s from './styles.scss';

export default function Header() {
  const dispatch = useDispatch();
  const getHandler = route => {
    return () => {
      dispatch({ type: SET_ROUTE, payload: route })
    }
  }
  return (
    <div className="header">
      <div onClick={getHandler("/forum")} className="link">Форум</div>
      <div onClick={getHandler("/glsl")} className="link">GLSL</div>
      <div onClick={getHandler("/")} className="link">Главная</div>
      <div onClick={getHandler("/webgl_manuals")} className="link">Настройка WebGL</div>
      <div onClick={getHandler("/examples")} className="link">Примеры</div>
    </div>
  );
}
