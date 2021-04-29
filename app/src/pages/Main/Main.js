import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RepresentationCard from "../../components/RepresentationCard/RepresentationCard";
import s from "./style.scss";

export default function Main(props) {
  return (
    <>
      <Header />
      <div className="content">

        <div className="row">
          <div className="col">
            <h2 className="title">Графические вычисления в браузере: WebGL</h2>
          </div>
        </div>

        <hr className="splitLine" />

        <div className="row">
          <RepresentationCard title="Что такое WebGL?">
            <b>WebGL (Web Graphics Library)</b> - программная библиотека для языка JavaScript предназначенная для визуализации 
            интерактивной трёхмерной графики и двухмерной графики в пределах совместимости веб-браузера без использования плагинов. 
            WebGL приносит в веб трёхмерную графику, вводя API, который построен на основе OpenGL ES 2.0, что позволяет его 
            использовать в элементах canvas HTML5 .
          </RepresentationCard>
        </div>

        <hr className="splitLine" />

        <div className="row">
        <RepresentationCard title="Когда использовать?" orientation="r">
            <ul className="unmarkedList">
              <li className="unmarkedList__item">
                Когда необходима реализация визуализации в браузере, при этом быстродействие и удобство поддержки критически важны.
              </li>
              <li className="unmarkedList__item">
                Когда нет возможности для проектирования эффективного механизма менеджмента памяти
              </li>
              <li className="unmarkedList__item">
                Когда для вычислений необходимо задействовать GPU
              </li>
            </ul>
          </RepresentationCard>
        </div>

        <hr className="splitLine" />

        <div className="row">
          <RepresentationCard title="Какие преимущества?">
            <ul className="unmarkedList">
              <li className="unmarkedList__item">
                Кроссбраузерность и отсутствие привязки к определенной платформе. Windows, MacOS, Linux - все это не важно,
                главное, чтобы ваш браузер поддерживал WebGL
              </li>
              <li className="unmarkedList__item">
                Использование языка JavaScript, который достаточно распространен
              </li>
              <li className="unmarkedList__item">
               Автоматическое управление памятью. В отличие от OpenGL в WebGL не надо выполнять специальные действия для выделения и очистки памяти
              </li>
              <li className="unmarkedList__item">
                Поскольку WebGL для рендеринга графики использует графический процессор на видеокарте (GPU),
                то для этой технологии характерна высокая производительность, которая сравнима с производительностью нативных приложений.
              </li>
            </ul>
          </RepresentationCard>
        </div>
      </div>

      <Footer />
    </>
  );
}
