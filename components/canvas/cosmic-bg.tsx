"use client";

import { useEffect, useRef } from "react";

// "Cosmic Background" — Originkit WebGL nebula. Shader and uniforms are the
// original; the render loop is adapted for a site-wide fixed backdrop:
// half-resolution drawing buffer, ~30fps cap, and paused while the tab is hidden.

const DEFAULTS = {
  core: true,
  coreColor: "#6823C3",
  midColor: "#007BFF",
  accentColor: "#9900FF",
  outerColor: "#F9F9F9",
  detail: 20,
  brightness: 32,
  speed: 30,
  rotation: 15,
};

const BRIGHTNESS_MAX = 3;
const RENDER_SCALE = 0.5;
const FRAME_MS = 1000 / 30;

type Rgb = [number, number, number];

function clamp(n: number | undefined, min: number, max: number, fallback: number) {
  const v = typeof n === "number" ? n : Number.NaN;
  if (!Number.isFinite(v)) return fallback;
  return Math.min(max, Math.max(min, v));
}

function rgbOf(value: string | undefined, fallback: string): Rgb {
  const hex = (value || fallback).trim().replace("#", "");
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    return [
      parseInt(hex[0] + hex[0], 16) / 255,
      parseInt(hex[1] + hex[1], 16) / 255,
      parseInt(hex[2] + hex[2], 16) / 255,
    ];
  }
  if (/^[0-9a-f]{6,8}$/i.test(hex)) {
    return [
      parseInt(hex.slice(0, 2), 16) / 255,
      parseInt(hex.slice(2, 4), 16) / 255,
      parseInt(hex.slice(4, 6), 16) / 255,
    ];
  }
  return [1, 1, 1];
}

const VERT = `
attribute vec4 a_pos;
void main() {
    gl_Position = a_pos;
}
`;

const FRAG = `
precision highp float;
uniform float u_time;
uniform vec2 u_res;
uniform vec3 u_core;
uniform bool u_showCore;
uniform vec3 u_mid;
uniform vec3 u_accent;
uniform vec3 u_outer;
uniform float u_complexity;
uniform float u_bright;
uniform float u_rotSpeed;

mat2 rot(float a) { float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}

float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 7; i++) {
        v += a * noise(p); p *= rot(0.5); p *= 2.1; a *= 0.5;
    }
    return v;
}

void main() {
    vec2 p = (gl_FragCoord.xy - 0.5 * u_res.xy) / min(u_res.y, u_res.x);
    float t = u_time * 0.1;

    p *= rot(u_time * u_rotSpeed * 0.05);

    float dist = length(p);

    float angleNoise = fbm(p * 3.0 + t * 0.5) * 0.3;
    float distortedDist = dist + angleNoise * smoothstep(0.5, 0.0, dist);

    vec2 nebP = p * u_complexity;

    vec2 q = vec2(fbm(nebP + vec2(cos(t), sin(t))), fbm(nebP + 1.2));
    vec2 r = vec2(fbm(nebP + 4.0 * q + t), fbm(nebP + 4.0 * q + 2.8));
    float f = fbm(nebP + 4.0 * r);

    float coreMask = smoothstep(0.8, 0.0, distortedDist) * (0.5 + 0.5 * smoothstep(0.1, 0.9, f));
    float coreGlow = exp(-3.0 * distortedDist);

    vec3 colCore = u_showCore ? u_core * (coreMask * 2.0 + coreGlow * 1.5) : vec3(0.0);

    float ring = smoothstep(0.05, 0.35, dist) * smoothstep(0.9, 0.3, dist);
    float filament = pow(f, 1.2);

    vec3 colMix = mix(u_mid, u_accent, smoothstep(0.2, 0.6, f));
    colMix = mix(colMix, u_outer, smoothstep(0.4, 0.9, f));
    vec3 colOuter = colMix * ring * filament * 2.0;

    float dust = smoothstep(0.3, 0.9, fbm(nebP * 1.5 + r));
    dust = mix(1.0, dust, smoothstep(0.0, 0.3, dist));

    vec3 finalCol = (colCore + colOuter) * dust * u_bright;
    finalCol += u_showCore ? u_mid * coreMask * ring * 0.8 : vec3(0.0);

    float lum = max(finalCol.r, max(finalCol.g, finalCol.b));
    gl_FragColor = vec4(finalCol, clamp(lum, 0.0, 1.0));
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn("CosmicBG shader:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function buildProgram(gl: WebGLRenderingContext) {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn("CosmicBG link:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

export interface CosmicBGProps {
  core?: boolean;
  coreColor?: string;
  midColor?: string;
  accentColor?: string;
  outerColor?: string;
  detail?: number;
  brightness?: number;
  speed?: number;
  rotation?: number;
}

export default function CosmicBG(props: CosmicBGProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const {
    core = DEFAULTS.core,
    coreColor,
    midColor,
    accentColor,
    outerColor,
    detail,
    brightness,
    speed,
    rotation,
  } = props;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: true,
      depth: false,
      premultipliedAlpha: true,
    });
    if (!gl) return;

    const program = buildProgram(gl);
    if (!program) return;

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE);

    const S = {
      coreColor: rgbOf(coreColor, DEFAULTS.coreColor),
      midColor: rgbOf(midColor, DEFAULTS.midColor),
      accentColor: rgbOf(accentColor, DEFAULTS.accentColor),
      outerColor: rgbOf(outerColor, DEFAULTS.outerColor),
      detail: 1 + (clamp(detail, 1, 20, DEFAULTS.detail) / 20) * 4,
      brightness: (clamp(brightness, 0, 100, DEFAULTS.brightness) / 100) * BRIGHTNESS_MAX,
      speed: clamp(speed, 0, 30, DEFAULTS.speed) / 10,
      rotation: clamp(rotation, 0, 20, DEFAULTS.rotation) / 20,
    };

    const u = {
      time: gl.getUniformLocation(program, "u_time"),
      res: gl.getUniformLocation(program, "u_res"),
      core: gl.getUniformLocation(program, "u_core"),
      showCore: gl.getUniformLocation(program, "u_showCore"),
      mid: gl.getUniformLocation(program, "u_mid"),
      accent: gl.getUniformLocation(program, "u_accent"),
      outer: gl.getUniformLocation(program, "u_outer"),
      complexity: gl.getUniformLocation(program, "u_complexity"),
      bright: gl.getUniformLocation(program, "u_bright"),
      rotSpeed: gl.getUniformLocation(program, "u_rotSpeed"),
    };
    const aPos = gl.getAttribLocation(program, "a_pos");

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, 1, 1, 1, -1, -1, 1, -1]), gl.STATIC_DRAW);

    const resize = () => {
      const dpr = Math.min(1, window.devicePixelRatio || 1);
      const w = Math.round(canvas.clientWidth * dpr * RENDER_SCALE);
      const h = Math.round(canvas.clientHeight * dpr * RENDER_SCALE);
      if (!w || !h) return false;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      return true;
    };

    const draw = (time: number) => {
      if (!resize()) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.uniform1f(u.time, time * S.speed);
      gl.uniform2f(u.res, canvas.width, canvas.height);
      gl.uniform3fv(u.core, S.coreColor);
      gl.uniform1i(u.showCore, core ? 1 : 0);
      gl.uniform3fv(u.mid, S.midColor);
      gl.uniform3fv(u.accent, S.accentColor);
      gl.uniform3fv(u.outer, S.outerColor);
      gl.uniform1f(u.complexity, S.detail);
      gl.uniform1f(u.bright, S.brightness);
      gl.uniform1f(u.rotSpeed, S.rotation);

      gl.bindBuffer(gl.ARRAY_BUFFER, quad);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPos);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    let raf = 0;
    let last = 0;
    const start = performance.now();

    const loop = (now: number) => {
      raf = window.requestAnimationFrame(loop);
      if (document.hidden || now - last < FRAME_MS) return;
      last = now;
      draw((now - start) / 1000);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      gl.deleteBuffer(quad);
      gl.deleteProgram(program);
    };
  }, [core, coreColor, midColor, accentColor, outerColor, detail, brightness, speed, rotation]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />;
}
