import React, { useRef, useEffect, useState } from 'react';
import s from './style.scss';

export default class CanvasGL extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      useGl: false,
      vertex: `  // атрибут, который будет получать данные из буфера
      attribute vec4 a_position;
     
      // все шейдеры имеют функцию main
      void main() {
     
        // gl_Position - специальная переменная вершинного шейдера,
        // которая отвечает за установку положения
        gl_Position = a_position;
      }
      `,
      fragment: `  // фрагментные шейдеры не имеют точности по умолчанию, поэтому нам необходимо её
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
    
      #define OCTAVES 6
      float fbm (in vec2 st) {
          // Initial values
          float value = 0.0;
          float amplitude = .5;
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

        vec3 noiseV = vec3(0.0);
        vec3 noiseH = vec3(0.0);

        noiseV += fbm(vec2(st.x, st.y - u_time * 0.001) * 7.);
        noiseH += fbm(noiseV.xy);

        vec3 color = vec3(0, .2, 1) + (noiseV * 1. + noiseH * .8) / 2.;

        color -= vec3(st.y * 3.);
    
        gl_FragColor = vec4(color,1.0);
      }
      `,
      screenResolution: {
        w: window.innerWidth,
        h: window.innerHeight,
      },
      frames: 0,
    }

    this.canvasRef = React.createRef();
  }

  initWebGL(canvas) {
    this.gl = null;
  
    try {
      // Попытаться получить стандартный контекст. Если не получится, попробовать получить экспериментальный.
      this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    catch(e) {
      console.error(e)
    }
  
    // Если мы не получили контекст GL, завершить работу
    if (!this.gl) {
      console.error("Использование WebGL недоступно. Скорее всего, ваш браузер не поддерживает WebGL.");
      this.gl = null;
    }
  }

  createShader(type, code) {
    const shader = this.gl.createShader(type);   // создание шейдера
    
    this.gl.shaderSource(shader, code);      // устанавливаем шейдеру его программный код
    this.gl.compileShader(shader);             // компилируем шейдер
    var success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    
    if (success) {                        // если компиляция прошла успешно - возвращаем шейдер
      return shader;
    } else {
      console.error(this.gl.getShaderInfoLog(shader));
      this.gl.deleteShader(shader);    
    }
  }

  createProgram(vertexShader, fragmentShader) {
    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);
    const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
    if (success) {
      return program;
    } else {
      console.error(this.gl.getProgramInfoLog(program));
      this.gl.deleteProgram(program);
    }
  }
  

  componentDidMount() {
    this.initWebGL(this.canvasRef.current);
    const loop = setInterval(() => {
      this.setState({
        ...this.state,
        frames: (this.state.frames + 1) % Number.MAX_SAFE_INTEGER,
        screenResolution: {
          w: window.innerWidth,
          h: window.innerHeight,
        },
      })
    }, 15)
    this.setState({
      useGl: !!this.gl,
      loop
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.loop);
  }

  componentDidUpdate() {
    if (this.state.useGl) {
      const vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.state.vertex);
      const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, this.state.fragment);

      const program = this.createProgram(vertexShader, fragmentShader);

      const positionAttributeLocation = this.gl.getAttribLocation(program, "a_position");

      const positionBuffer = this.gl.createBuffer();

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);

      var positions = [
        -1, -1,
        -1, 1,
        1, 1,

        -1, -1,
        1, 1,
        1, -1,
      ];
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

      this.gl.viewport(0, 0, this.state.screenResolution.w, this.state.screenResolution.h);
      console.log(this.state.screenResolution.w, this.state.screenResolution.h)

      // очищаем canvas
      this.gl.clearColor(0, 0, 0, 0);
      this.gl.clear(this.gl.COLOR_BUFFER_BIT);

      this.gl.useProgram(program);
      this.gl.enableVertexAttribArray(positionAttributeLocation);

      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
 
      // Указываем атрибуту, как получать данные от positionBuffer (ARRAY_BUFFER)
      var size = 2;          // 2 компоненты на итерацию
      var type = this.gl.FLOAT;   // наши данные - 32-битные числа с плавающей точкой
      var normalize = false; // не нормализовать данные
      var stride = 0;        // 0 = перемещаться на size * sizeof(type) каждую итерацию для получения следующего положения
      var offset = 0;        // начинать с начала буфера
      this.gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)
      
      const timeUniformLocation = this.gl.getUniformLocation(program, 'u_time');
      this.gl.uniform1f(timeUniformLocation, this.state.frames);

      const resolutionUniformLocation = this.gl.getUniformLocation(program, 'u_resolution');
      this.gl.uniform2f(resolutionUniformLocation, 1920, 1080);

      var primitiveType = this.gl.TRIANGLES;
      var offset = 0;
      var count = 6;
      this.gl.drawArrays(primitiveType, offset, count);
    }
  }

  render() {
    return (
      <canvas className="gl_canvas" ref={this.canvasRef} width={this.state.screenResolution.w} height={this.state.screenResolution.h}></canvas>
    )
  }
}
