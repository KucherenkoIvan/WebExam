import React from 'react';
import CanvasGL from '../../components/CanvasGL/CanvasGL';
import NowOnline from '../../components/NowOnline/NowOnline';

export default function Main(props) {
  return (
    <>
      <h1>Main</h1>
      <NowOnline />
      <CanvasGL />
    </>
  );
}
