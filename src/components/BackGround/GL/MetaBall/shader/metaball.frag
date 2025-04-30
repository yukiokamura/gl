precision mediump float;

// From vertex shader
in vec2 vUv;

// From CPU
uniform vec3 u_clearColor;

uniform float u_eps;
uniform float u_maxDis;
uniform int u_maxSteps;

uniform vec3 u_camPos;
uniform mat4 u_camToWorldMat;
uniform mat4 u_camInvProjMat;

uniform vec3 u_lightDir;
uniform vec3 u_lightColor;

uniform float u_diffIntensity;
uniform float u_specIntensity;
uniform float u_ambientIntensity;
uniform float u_shininess;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_prevMouse;  // 前フレームのマウス座標を追加

// ノイズ関数
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float scene(vec3 p) {
  // メタボールの距離を計算
  float d = 1000.0;
  
  // マウス座標に基づいて動くメタボール
  vec2 mouse = mix(u_prevMouse, u_mouse, 1.) * .5;
  vec3 pos1 = vec3(mouse.x, mouse.y, 0.0);
  
  vec3 pos2 = vec3(
      sin(u_time * 0.5) * cos(u_time * 0.3),
      cos(u_time * 0.2) * sin(u_time * 0.4),
      cos(u_time * 0.3) * sin(u_time * 0.2)
  ) * 2.0;
  
  vec3 pos3 = vec3(
      cos(u_time * 0.4) * sin(u_time * 0.3),
      sin(u_time * 0.3) * cos(u_time * 0.4),
      cos(u_time * 0.2) * sin(u_time * 0.3)
  ) * 2.0;
  
  vec3 pos4 = vec3(
      sin(u_time * 0.3) * cos(u_time * 0.4),
      cos(u_time * 0.4) * sin(u_time * 0.2),
      sin(u_time * 0.3) * cos(u_time * 0.2)
  ) * 2.0;
  
  vec3 pos5 = vec3(
      cos(u_time * 0.2) * sin(u_time * 0.5),
      sin(u_time * 0.5) * cos(u_time * 0.2),
      cos(u_time * 0.4) * sin(u_time * 0.3)
  ) * 2.0;
  
  // 各メタボールの距離を計算
  float d1 = distance(p, pos1) - 0.8;
  float d2 = distance(p, pos2) - 0.8;
  float d3 = distance(p, pos3) - 0.8;
  float d4 = distance(p, pos4) - 0.8;
  float d5 = distance(p, pos5) - 0.8;
  
  // メタボールを合成
  d = smin(d, d1, 0.8);
  d = smin(d, d2, 0.8);
  d = smin(d, d3, 0.8);
  d = smin(d, d4, 0.8);
  d = smin(d, d5, 0.8);
  
  return d;
}

float rayMarch(vec3 ro, vec3 rd)
{
    float d = 0.; // total distance travelled
    float cd; // current scene distance
    vec3 p; // current position of ray

    for (int i = 0; i < u_maxSteps; ++i) { // u_rayMarchStepsをu_maxStepsに戻す
        p = ro + d * rd; // calculate new position
        cd = scene(p); // get scene distance
        
        // if we have hit anything or our distance is too big, break loop
        if (cd < u_eps || d >= u_maxDis) break;

        // otherwise, add new scene distance to total distance
        d += cd;
    }

    return d; // finally, return scene distance
}

vec3 sceneCol(vec3 p) {
  // メタボールの位置を計算
  vec3 pos1 = vec3(cos(u_time * 0.5), sin(u_time * 0.3), 0.0);
  vec3 pos2 = vec3(sin(u_time * 0.4), cos(u_time * 0.2), 0.0);
  vec3 pos3 = vec3(cos(u_time * 0.3), sin(u_time * 0.4), 0.0);
  vec3 pos4 = vec3(sin(u_time * 0.2), cos(u_time * 0.3), 0.0);
  vec3 pos5 = vec3(cos(u_time * 0.4), sin(u_time * 0.2), 0.0);
  
  // 各メタボールの距離を計算
  float d1 = distance(p, pos1) - 0.8;
  float d2 = distance(p, pos2) - 0.8;
  float d3 = distance(p, pos3) - 0.8;
  float d4 = distance(p, pos4) - 0.8;
  float d5 = distance(p, pos5) - 0.8;
  
  // より魅力的な色の組み合わせ
  vec3 col1 = vec3(0.8, 0.2, 0.4);  // ピンク
  vec3 col2 = vec3(0.4, 0.2, 0.8);  // パープル
  vec3 col3 = vec3(0.2, 0.8, 0.4);  // エメラルドグリーン
  vec3 col4 = vec3(0.8, 0.4, 0.2);  // オレンジ
  vec3 col5 = vec3(0.2, 0.4, 0.8);  // ブルー
  
  // 色を合成
  float k = 0.5;
  float h1 = clamp(0.5 + 0.5 * (d2 - d1) / k, 0.0, 1.0);
  vec3 col = mix(col1, col2, h1);
  
  float h2 = clamp(0.5 + 0.5 * (d3 - d2) / k, 0.0, 1.0);
  col = mix(col, col3, h2);
  
  float h3 = clamp(0.5 + 0.5 * (d4 - d3) / k, 0.0, 1.0);
  col = mix(col, col4, h3);
  
  float h4 = clamp(0.5 + 0.5 * (d5 - d4) / k, 0.0, 1.0);
  col = mix(col, col5, h4);
  
  // 色の彩度を上げる
  col = mix(col, vec3(1.0), 0.2);
  
  return col;
}

vec3 normal(vec3 p) // from https://iquilezles.org/articles/normalsSDF/
{
 vec3 n = vec3(0, 0, 0);
 vec3 e;
 for(int i = 0; i < 4; i++) {
  e = 0.5773 * (2.0 * vec3((((i + 3) >> 1) & 1), ((i >> 1) & 1), (i & 1)) - 1.0);
  n += e * scene(p + e * u_eps);
 }
 return normalize(n);
}

void main() {
    // Get UV from vertex shader
    vec2 uv = vUv.xy;

    // Get ray origin and direction from camera uniforms
    vec3 ro = u_camPos;
    vec3 rd = (u_camInvProjMat * vec4(uv*2.-1., 0, 1)).xyz;
    rd = (u_camToWorldMat * vec4(rd, 0)).xyz;
    rd = normalize(rd);
    
    // Ray marching and find total distance travelled
    float disTravelled = rayMarch(ro, rd); // use normalized ray

    // Find the hit position
    vec3 hp = ro + disTravelled * rd;
    
    // Get normal of hit point
    vec3 n = normal(hp);

    if (disTravelled >= u_maxDis) { // if ray doesn't hit anything
        gl_FragColor = vec4(u_clearColor,1);
    } else { // if ray hits something
        // Calculate Diffuse model
        float dotNL = dot(n, u_lightDir);
        float diff = max(dotNL, 0.0) * u_diffIntensity;
        float spec = pow(diff, u_shininess) * u_specIntensity;
        float ambient = u_ambientIntensity;
        
        vec3 color = u_lightColor * (sceneCol(hp) * (spec + ambient + diff));
        gl_FragColor = vec4(color,1); // color output
    }
}