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