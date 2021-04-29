import React from 'react';
import s from './styles.scss';

export default function Header() {
  return (
    <div className="header">
      <a href="/forum" className="link">Форум</a>
      <a href="/glsl" className="link">GLSL</a>
      <a href="/" className="link">Главная</a>
      <a href="/webgl_manuals" className="link">Настройка WebGL</a>
      <a href="/examples" className="link">Примеры</a>
    </div>
  );
}
