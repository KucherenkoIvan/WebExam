import React, { useEffect, useState } from 'react';
import CanvasGL from '../../components/CanvasGL/CanvasGL';
import NowOnline from '../../components/NowOnline/NowOnline';
import s from './style.scss'; 

export default function Main(props) {
    const [simple, setSimple] = useState('');
    const [flame, setFlame] = useState('');

    useEffect(() => {
      (async () => {
        const rf = await fetch('/shader/flame');
        const f = await rf.json();

        const rs = await fetch('/shader/simple');
        const s = await rs.json();

        setFlame(f.shader);
        setSimple(s.shader);
      })();
    }, [])

  return (
    <div>
      <CanvasGL fragmentShader={simple} fps="100"/>
      <CanvasGL fragmentShader={flame} fps="100"/>
    </div>
  );
}