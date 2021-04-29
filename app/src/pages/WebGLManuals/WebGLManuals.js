import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RepresentationCard from "../../components/RepresentationCard/RepresentationCard";

export default function WebGLManuals(props) {
  return (
    <>
      <Header />
      <div className="content">

        <hr className="splitLine" />

        <div className="row">
          <RepresentationCard title="Шаг 1">
            Первое, что вам понадобится для использования WebGL для визуализации в 3D - это элемент canvas.
            Для инициализации контекста используем функцию onload
          </RepresentationCard>
        </div>

        <hr className="splitLine" />

        <div className="row">
          <RepresentationCard title="Шаг 2" orientation="r">
            Функция start(), в нашем JavaScript коде вызывается после загрузки документа. Её назначение - настройка контекста WebGL.
            Первое, что мы здесь делаем - получаем ссылку на элемент canvas, помещаем её в переменную canvas. Очевидно, что если вам не требуется 
            многократно получать ссылку на canvas, вы должны избежать сохранения этого значения глобально, а только сохранить её в локальной переменной 
            или в поле объекта.

            Как только мы получили ссылку на canvas, мы вызываем функцию initWebGL(); Эту функцию мы определяем незамедлительно, её работа - 
            инициализировать контекст WebGL.


            Если контекст успешно инициализирован, в gl будет содержаться ссылка на него. В этом случае, мы устанавливаем цвет очистки буфера цвета 
            (цвет фона) на чёрный, затем очищаем контекст этим цветом. После этого, контекст конфигурируется параметрами настройки. В данном случае, мы 
            включаем буфер глубины и определяем, что более близкие объекты будут перекрывать более дальние.

            Всё вышеперечисленное необходимо сделать только для первоначальной инициализации. Чуть позже мы увидим работу по визуализации трёхмерных 
            объектов.
          </RepresentationCard>
        </div>

        <hr className="splitLine" />

        <div className="row">
          <RepresentationCard title="Шаг 3">
            Чтобы получить контекст WebGL для canvas, мы запрашиваем у элемента canvas контекст именуемый как "webgl". Если данная попытка завершается 
            неудачно, мы пытаемся получить контекст, именуемый как "experimental-webgl". Если данная попытка также завершается неудачно, мы отображаем 
            окно с предупреждением, позволяющим пользователю понять, что его браузер не поддерживает WebGL. Это всё, что необходимо сделать. На данном 
            этапе мы будем иметь в переменной gl либо значение null (означающее, что контекст WebGL не доступен), либо ссылку на контекст WebGL в 
            котором, мы будем производить отрисовку.
          </RepresentationCard>
        </div>

        <hr className="splitLine" />


        <div className="row">
          <RepresentationCard title="Готово!" orientation="r">
            Теперь подготовленный контекст можно использовать для загрузки шейдеров и отрисовки графики
          </RepresentationCard>
        </div>

        <hr className="splitLine" />

      </div>

      <Footer />
    </>
  );
}
