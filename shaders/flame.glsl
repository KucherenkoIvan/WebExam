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
  float gshift = .2;
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