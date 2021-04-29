import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RepresentationCard from "../../components/RepresentationCard/RepresentationCard";

export default function GLSL(props) {
  return (
    <>
      <Header />
      <div className="content">
        <hr className="splitLine" />

        <div className="row">
          <RepresentationCard title="Общие сведения">
            GLSL (OpenGL Shading Language, Graphics Library Shader Language) — язык высокого уровня для программирования шейдеров.
            Разработан для выполнения математики, которая обычно требуется для выполнения растеризации графики. Синтаксис языка базируется на языке программирования ANSI C, однако, из-за его специфической направленности, из него были исключены многие возможности,
            для упрощения языка и повышения производительности.
            В язык включены дополнительные функции и типы данных, например для работы с векторами и матрицами.

            Основное преимущество GLSL перед другими шейдерными языками — переносимость кода между платформами и ОС.

            Язык GLSL используется в OpenGL, в OpenGL ES и WebGL используется язык GLSL ES (OpenGL ES Shading Language).
          </RepresentationCard>
        </div>
        <hr className="splitLine" />

        <div className="row">
          <RepresentationCard title="Ссылки" orientation="r">
            <ul className="unmarkedList">
              <li className="item">
                <a href="https://ru.wikipedia.org/wiki/OpenGL_Shading_Language" target="_blank" rel="noreferrer">Wikipedia</a>
              </li>
              <li className="item">
                <a href="https://developer.mozilla.org/ru/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders" target="_blank" rel="noreferrer">MDN</a>
              </li>
              <li className="item">
                <a href="https://www.khronos.org/opengl/wiki/Core_Language_(GLSL)" target="_blank" rel="noreferrer">Khronos</a>
              </li>
            </ul>
          </RepresentationCard>
        </div>
        <hr className="splitLine" />

      </div>

      <Footer />
    </>
  );
}
