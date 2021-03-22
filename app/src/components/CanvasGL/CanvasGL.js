import React from 'react';
import s from './style.scss';

export default class CanvasGL extends React.Component {

  constructor(props) {
    super(props);

    this.vertexShader = 
      `  // атрибут, который будет получать данные из буфера
      attribute vec4 a_position;
    
      // все шейдеры имеют функцию main
      void main() {
    
        // gl_Position - специальная переменная вершинного шейдера,
        // которая отвечает за установку положения
        gl_Position = a_position;
      }
      `;
    console.warn('ctor')
    this.state = {
      fragmentShader: props.fragmentShader,
      screenResolution: {
        w: this.props.w || window.innerWidth,
        h: this.props.h || window.innerHeight,
      },
      timePassed: 0,
      firstRender: new Date().getTime()
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
    const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
    
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

  setUniforms(u_time, u_resolution) {
    const timeUniformLocation = this.gl.getUniformLocation(this.program, 'u_time');
    this.gl.uniform1f(timeUniformLocation, u_time);

    const resolutionUniformLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.gl.uniform2f(resolutionUniformLocation, u_resolution[0], u_resolution[1]);
  }
  
  drawIteration(timePassed) {
    try {
      const positionAttributeLocation = this.gl.getAttribLocation(this.program, "a_position");
      this.gl.enableVertexAttribArray(positionAttributeLocation);
      this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0)
      this.setUniforms(timePassed, [
        this.state.screenResolution.w,
        this.state.screenResolution.h
      ]);
      this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    } catch(e) {
      console.error(e);
      clearInterval(this.loop);
    }
  }

  initGlProgram(shader) {
    const vertexShader = this.createShader(this.gl.VERTEX_SHADER, this.vertexShader);
    const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, shader);

    this.program = this.createProgram(vertexShader, fragmentShader);
  }

  clearCanvas(color) {
    this.gl.clearColor(color[0], color[1], color[2], color[3]);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  loadVertexData() {
    const positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    const positions = [
      -1, -1,
      -1, 1,
      1, 1,

      -1, -1,
      1, 1,
      1, -1,
    ];
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
  }

  setGlViewport(w, h) {
    this.gl.viewport(0, 0, w, h);
  }

  prepareGl() {
    try {
      this.initGlProgram(this.state.fragmentShader);
      
      this.loadVertexData();

      this.setGlViewport(this.state.screenResolution.w, this.state.screenResolution.h);

      this.clearCanvas([0, 0, 0, 0]);

      this.gl.useProgram(this.program);
    } catch(e) {
      console.error(e);
    }
  }

  initLoop() {
    const loop = setInterval(() => {
      if ((!this.props.w || !this.props.h) && (this.state.screenResolution.w !== window.innerWidth || this.state.screenResolution.h !== window.innerHeight)) {
        this.setState({
          ...this.state,
          screenResolution: {
            w: window.innerWidth,
            h: window.innerHeight,
          },
        })
      }
      const timePassed = new Date().getTime() - this.state.firstRender;
      this.drawIteration(timePassed);
    }, Math.floor(1000 / this.props.fps || 50));

    this.loop = loop;
  }

  componentDidMount() {
    this.initWebGL(this.canvasRef.current);
    this.prepareGl();
    this.initLoop();
  }

  static getDerivedStateFromProps(props, state) {
    return {
      ...state,
      fragmentShader: props.fragmentShader,
      screenResolution: {
        w: props.w || window.innerWidth,
        h: props.h || window.innerHeight,
      }
    }
  }

  componentDidUpdate() {
    clearInterval(this.loop);
    this.prepareGl();
    this.initLoop();
  }

  componentWillUnmount() {
    clearInterval(this.loop);
    this.gl = null;
    this.canvasRef = null;
  }

  render() {
    console.log(this.state)
    return (
      <canvas className="gl_canvas" ref={this.canvasRef} width={this.state.screenResolution.w} height={this.state.screenResolution.h}></canvas>
    )
  }
}
