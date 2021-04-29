import React from "react";
import CanvasGL from "../../components/CanvasGL/CanvasGL";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import RepresentationCard from "../../components/RepresentationCard/RepresentationCard";


export default function Examples(props) {
  const shaders = {
    calibrate: `
    precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

void main() {
  vec2 uv = vec2(gl_FragCoord.x / u_resolution.x, gl_FragCoord.y / u_resolution.y);

  float speed = 0.001;

  vec3 color = vec3(uv.x, uv.y, .6);

  color += cos(sin(u_time * speed) + uv.x*uv.y) * .1;

  gl_FragColor = vec4(color, 1.);
}
    `,
    movingNoise: `
    // фрагментные шейдеры не имеют точности по умолчанию, поэтому нам необходимо её
// указать. mediump подойдёт для большинства случаев. Он означает "средняя точность"
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float random (in vec2 st) {
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

#define OCTAVES 20
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .72;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  float speed = 0.00022;
  float zoom = 17.;
  float shift = 0.38;
  float n2 = .47;
  float gshift = .16;
  float gscale = 5.6;

  vec2 offset = zoom * vec2(st.x, st.y - u_time * speed);

  vec3 noise1 = vec3(fbm(offset));


  vec3 color = noise1;

  gl_FragColor = vec4(color, 1.);
}
    `,
    mask: `
    // фрагментные шейдеры не имеют точности по умолчанию, поэтому нам необходимо её
// указать. mediump подойдёт для большинства случаев. Он означает "средняя точность"
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float random (in vec2 st) {
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

#define OCTAVES 20
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .72;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  float speed = 0.00022;
  float zoom = 17.;
  float shift = 0.38;
  float n2 = .47;
  float gshift = .16;
  float gscale = 5.6;

  vec2 offset = zoom * vec2(st.x, st.y - u_time * speed);

  vec3 noise1 = vec3(fbm(offset));
  vec3 noise2 = n2 * vec3(fbm(offset + noise1.xy + u_time * speed * 5.) - shift);

  vec3 nnoise1 = vec3(fbm(vec2(noise1.x, noise2.x)));
  vec3 nnoise2 = vec3(fbm(vec2(noise2.x, noise1.x)));

  vec3 gradient = vec3(min(gscale * max(st.y - gshift, 0.0) * nnoise2, 1.)) + st.y * 1.4;

  vec3 color = gradient - (noise2 * (1. - gradient));

  gl_FragColor = vec4(color, 1.);
}
    `,
    flame: `
    // фрагментные шейдеры не имеют точности по умолчанию, поэтому нам необходимо её
// указать. mediump подойдёт для большинства случаев. Он означает "средняя точность"
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;

float random (in vec2 st) {
  return fract(sin(dot(st.xy,vec2(12.9898,78.233)))*43758.5453123);
}

float noise (in vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
          (c - a)* u.y * (1.0 - u.x) +
          (d - b) * u.x * u.y;
}

#define OCTAVES 20
float fbm (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = .72;
    float frequency = 0.;
    //
    // Loop of octaves
    for (int i = 0; i < OCTAVES; i++) {
        value += amplitude * noise(st);
        st *= 2.;
        amplitude *= .5;
    }
    return value;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.x *= u_resolution.x/u_resolution.y;

  float speed = 0.00022;
  float zoom = 17.;
  float shift = 0.38;
  float n2 = .47;
  float gshift = .16;
  float gscale = 5.6;

  vec2 offset = zoom * vec2(st.x, st.y - u_time * speed);

  vec3 noise1 = vec3(fbm(offset));
  vec3 noise2 = n2 * vec3(fbm(offset + noise1.xy + u_time * speed * 5.) - shift);

  vec3 nnoise1 = vec3(fbm(vec2(noise1.x, noise2.x)));
  vec3 nnoise2 = vec3(fbm(vec2(noise2.x, noise1.x)));

  vec3 red = vec3(1., 0.2, 0.1);
  vec3 yellow = vec3(0.9, 0.6, 0.01);
  vec3 darkred = vec3(0.4, 0.1, 0.05);
  vec3 black = vec3(0.01, 0.02, 0.03);

  vec3 gradient = vec3(min(gscale * max(st.y - gshift, 0.0) * nnoise2, 1.)) + st.y * 1.4;

  vec3 ground = mix(red, darkred, nnoise2);
  vec3 lights = mix(yellow, black, noise1);

  vec3 color = ground + lights - gradient + (noise2 * (1. - gradient));

  gl_FragColor = vec4(color, 1.);
}
    `,
  };
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
