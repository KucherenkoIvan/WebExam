import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import s from "./style.scss";

export default function Main(props) {
  return (
    <>
      <Header />
      <div className="content">
        <div className="row">
          <div className="col">
            <h2 className="title">Графические вычисления в браузере. WebGL.</h2>
            WebGL (Web Graphics Library) - программная библиотека для языка JavaScript предназначенная для визуализации 
            интерактивной трёхмерной графики и двухмерной графики в пределах совместимости веб-браузера без использования плагинов. 
            WebGL приносит в веб трёхмерную графику, вводя API, который построен на основе OpenGL ES 2.0, что позволяет его 
            использовать в элементах canvas HTML5 .
          </div>
        </div>
        <div className="row">
          <div className="representationCard">
            <div className="horizontalText">
              representationText
            </div>
            <div className="mainText">
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
              main text
            </div>
          </div>
        </div>
        content
      </div>
      <Footer />
    </>
  );
}
