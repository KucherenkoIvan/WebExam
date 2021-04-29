import React, { useEffect, useState } from "react";
import CanvasGL from "../../components/CanvasGL/CanvasGL";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RepresentationCard from "../../components/RepresentationCard/RepresentationCard";

export default function Examples(props) {
  const [shaders, setShaders] = useState({
    calibrate: '',
    movingNoise: '',
    mask: '',
    flame: '',
  });

  useEffect(() => {
    (async () => {
      const calibrate = fetch('/shader/simple');
      const noise = fetch('/shader/noise');
      const mask = fetch('/shader/mask');
      const flame = fetch('/shader/flame');

      const res = await Promise.all([calibrate, noise, mask, flame]);

      const data = await Promise.all(res.map(el => el.json()));

      setShaders({
        calibrate: data[0].shader,
        movingNoise: data[1].shader,
        mask: data[2].shader,
        flame: data[3].shader,
      });
    })();
  }, []);

  return (
    <>
      <Header />
      <div className="content">

        <hr className="splitLine"/>

        <div className="row">
          <RepresentationCard title="Готовое к отрисовке полотно">
            <CanvasGL w="220" h="150" /><br/>
            Для данного полотна не загружены внешние шейдеры, поэтому используются шейдеры, определенные автором по умолчанию<br/>
            Вершинный шейдер на этом полотне (и остальных полотнах) отрисовывает два полигона (треугольника), образующих прямоугольник<br/>
            Фрагментный шейдер задает каждому пикселю на полотне цвет #6699e5 и значение прозрачности 1 (непрозрачный)<br/>
          </RepresentationCard>
        </div>

        <hr className="splitLine"/>

        <div className="row">
          <RepresentationCard title="Калибровочный шейдер" orientation="r">
            <CanvasGL w="220" h="150" fragmentShader={shaders.calibrate}/><br/>
            Оси пиксельных координат связаны с возрастающим цветом
          </RepresentationCard>
        </div>

        <hr className="splitLine"/>

        <div className="row">
          <RepresentationCard title="Фрактальный шум">
            <CanvasGL w="220" h="150" fragmentShader={shaders.movingNoise}/><br/>
            Значения цвета сгенерированы функцией генерации фрактального шума (аналог шума Перлина), добавлен сдвиг по вертикальной оси
          </RepresentationCard>
        </div>

        <hr className="splitLine"/>

        <div className="row">
          <RepresentationCard title="Градиентная маска" orientation="r">
            <CanvasGL w="220" h="150" fragmentShader={shaders.mask}/><br/>
            На основе фрактального шума сгенерирована градиентная маска
          </RepresentationCard>
        </div>

        <hr className="splitLine"/>

        <div className="row">
          <RepresentationCard title="Процедурный огонь">
            <CanvasGL w="220" h="150" fragmentShader={shaders.flame}/><br/>
            На основе нескольких октав фрактального шума и дополнительных шумов создана цветная текстура, применена градиентная маска<br/>
            Генерация полностью процедурная, в реальном времени
          </RepresentationCard>
        </div>
      </div>
      <Footer />
    </>
  );
}
