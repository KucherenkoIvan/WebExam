import React, { useState } from 'react';
import CanvasGL from '../../components/CanvasGL/CanvasGL';
import NowOnline from '../../components/NowOnline/NowOnline';
import s from './style.scss'; 

export default function Main(props) {
  const flame = 
  `  // фрагментные шейдеры не имеют точности по умолчанию, поэтому нам необходимо её
      // указать. mediump подойдёт для большинства случаев. Он означает "средняя точность"
      precision mediump float;
      
      uniform float u_time;
      uniform vec2 u_resolution;

      float random (in vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(12.9898,78.233)))*
            43758.5453123);
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
    
      #define OCTAVES 9
      float fbm (in vec2 st) {
          // Initial values
          float value = 0.0;
          float amplitude = .6;
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

        float speed = 0.0002;
        float zoom = 17.;
        float shift = 0.38;
        float n2 = .47;
        float gshift = .7;
        float gscale = 4.2;

        vec2 offset = zoom * vec2(st.x, st.y - u_time * speed);

        vec3 noise1 = vec3(fbm(offset));
        vec3 noise2 = n2 * vec3(fbm(offset + noise1.xy + u_time * speed * 5.) - shift);

        vec3 nnoise1 = vec3(fbm(vec2(noise1.x, noise2.x)));
        vec3 nnoise2 = vec3(fbm(vec2(noise2.x, noise1.x)));

        vec3 red = vec3(1., 0.2, 0.1);
        vec3 yellow = vec3(0.9, 0.6, 0);
        vec3 darkred = vec3(0.4, 0.1, 0);
        vec3 black = vec3(0.01, 0.02, 0.0);


        vec3 gradient = gscale * vec3(st.y) - gshift;
        vec3 ground = mix(red, darkred, nnoise2);
        vec3 lights = mix(yellow, black, nnoise1);

        vec3 color = .7 * ground + .9 * lights- gradient - .4 * nnoise1 - noise2 * 1.2 * (1. - st.y);

    
        gl_FragColor = vec4(color,1.0);
      }
      `;
    const simple = `
      precision mediump float;

      uniform float u_time;
      uniform vec2 u_resolution;

      void main() {
        vec2 uv = vec2(gl_FragCoord.x / u_resolution.x, gl_FragCoord.y / u_resolution.y);

        float speed = 0.001;

        vec3 color = vec3(uv.x, uv.y, 0.6);

        color += sin(sin(u_time * speed) + uv.x*uv.y) * .2;

        gl_FragColor = vec4(color, 1.);
      }
    `
    const [d, setD] = useState(simple);

    const dClickHandler = () => {
      setD(d === flame ? simple : flame);
    }
  return (
    <div className="of-h">
      <CanvasGL fragmentShader={d} fps="100"/>
      <div onClick={dClickHandler} className='shaderbtntmp'>{`now playing: ${d===flame ? 'flame' : 'simple'}`}</div>
    </div>
  );
}