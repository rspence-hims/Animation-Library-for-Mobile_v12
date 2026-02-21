import { useEffect, useRef, useState, useCallback } from "react";
import { DemoShell } from "./demo-utils";
import { AnimatedConvoScreen } from "./intro-convo-screen";
import { getRandomIntroImage } from "./intro-images";
import displacementMapSrc from "figma:asset/Displacement_map.png";

/* ─── Cubic-bezier evaluator (Newton-Raphson) ────────────── */

function makeCubicBezier(x1: number, y1: number, x2: number, y2: number) {
  return (x: number): number => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let t = x;
    for (let i = 0; i < 8; i++) {
      const mt = 1 - t;
      const bx = 3 * x1 * mt * mt * t + 3 * x2 * mt * t * t + t * t * t;
      const dbx =
        3 * x1 * mt * mt + 6 * (x2 - x1) * mt * t + 3 * (1 - x2) * t * t;
      if (Math.abs(dbx) < 1e-7) break;
      t -= (bx - x) / dbx;
      t = Math.max(0, Math.min(1, t));
    }
    const mt = 1 - t;
    return 3 * y1 * mt * mt * t + 3 * y2 * mt * t * t + t * t * t;
  };
}

const aeEaseIn = makeCubicBezier(0.32, 0.06, 0.73, 0.15);

/* ─── Timing constants ───────────────────────────────────── */

const DELAY = 28;
const DURATION = 990;
const MAX_SCALE = 1.05;

/* ─── WebGL helpers ──────────────────────────────────────── */

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function loadTexture(
  gl: WebGL2RenderingContext,
  url: string,
  unit: number,
  onReady: () => void,
): WebGLTexture | null {
  const tex = gl.createTexture();
  if (!tex) return null;
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(
    gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
    new Uint8Array([0, 0, 0, 255]),
  );

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    onReady();
  };
  img.src = url;
  return tex;
}

/* ─── Shaders ────────────────────────────────────────────── */

const VERT_SRC = `#version 300 es
in vec2 aPosition;
out vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

/*
  Fragment shader: all effects are modulated per-pixel by the displacement map.
  Bright regions in the map (edges) get full effect; dark regions (center) stay clean.
*/
const FRAG_SRC = `#version 300 es
precision highp float;

uniform sampler2D uImage;
uniform sampler2D uDispMap;
uniform float uProgress; // 0 → 1 (eased)

in vec2 vUv;
out vec4 fragColor;

const float MAX_DISP   = 0.06;  // displacement warp strength
const float MAX_CHROMA = 0.015; // chromatic aberration offset (UV space)
const float MAX_BRIGHT = 1.5;   // peak brightness multiplier at edges
const float BLUR_RAD   = 0.006; // max blur radius (UV space)

void main() {
  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);

  // Per-pixel edge intensity from displacement map (0 = center, 1 = edge)
  float edge = texture(uDispMap, uv).r;
  float intensity = edge * uProgress;

  // Displacement direction from map gradient (pushes outward along edges)
  float s = 0.003;
  float dx = texture(uDispMap, uv + vec2(s, 0.0)).r
           - texture(uDispMap, uv - vec2(s, 0.0)).r;
  float dy = texture(uDispMap, uv + vec2(0.0, s)).r
           - texture(uDispMap, uv - vec2(0.0, s)).r;
  vec2 warpedUV = uv + vec2(dx, dy) * MAX_DISP * uProgress;

  // Spatially-varying chromatic aberration & blur
  float chroma = MAX_CHROMA * intensity;
  float blur   = BLUR_RAD * intensity;

  // 7×7 Gaussian-weighted blur with per-sample chroma separation
  vec3 accum  = vec3(0.0);
  float totalW = 0.0;

  for (int x = -3; x <= 3; x++) {
    for (int y = -3; y <= 3; y++) {
      vec2 off = vec2(float(x), float(y)) * blur;
      float w  = exp(-float(x * x + y * y) / 6.0);

      vec2 sUV = warpedUV + off;
      float r = texture(uImage, sUV + vec2(0.0, -chroma)).r;
      float g = texture(uImage, sUV).g;
      float b = texture(uImage, sUV + vec2(0.0,  chroma)).b;

      accum  += vec3(r, g, b) * w;
      totalW += w;
    }
  }

  vec3 color = accum / totalW;

  // Edge brightness boost
  color *= 1.0 + (MAX_BRIGHT - 1.0) * intensity;

  // White fade: edge-weighted early, uniform at the end
  float whiteFade = mix(intensity, 1.0, uProgress) * uProgress * uProgress;
  color = mix(color, vec3(1.0), whiteFade);

  fragColor = vec4(color, 1.0);
}`;

/* ─── GL context state ───────────────────────────────────── */

interface GLState {
  gl: WebGL2RenderingContext;
  uProgress: WebGLUniformLocation;
  tex0: WebGLTexture;
  ready: boolean;
}

/* ─── Main Demo ───────────────────────────────────────────── */

export function IntroImageRandomDemo({
  replayCount = 0,
  onProgress,
}: {
  replayCount?: number;
  onProgress?: (progress: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<GLState | null>(null);
  const rafRef = useRef(0);
  const [localTrigger, setLocalTrigger] = useState(0);
  const [showConvo, setShowConvo] = useState(false);
  const triggerCount = replayCount + localTrigger;

  const handleClick = useCallback(() => {
    if (showConvo) {
      const ctx = glRef.current;
      if (ctx?.ready) {
        const { gl, tex0, uProgress } = ctx;
        const canvas = canvasRef.current!;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, tex0);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          gl.uniform1f(uProgress, 0);
          canvas.style.transform = "scale(1)";
          gl.viewport(0, 0, canvas.width, canvas.height);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          setShowConvo(false);
        };
        img.src = getRandomIntroImage();
      }
    } else {
      setLocalTrigger((c) => c + 1);
    }
  }, [showConvo]);

  /* ── Initialise WebGL2 context, shaders, textures ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      premultipliedAlpha: false,
      alpha: false,
    });
    if (!gl) {
      console.error("WebGL2 not available");
      return;
    }

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERT_SRC);
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    gl.uniform1i(gl.getUniformLocation(program, "uImage"), 0);
    gl.uniform1i(gl.getUniformLocation(program, "uDispMap"), 1);
    const uProgress = gl.getUniformLocation(program, "uProgress")!;
    gl.uniform1f(uProgress, 0);

    const state: GLState = { gl, uProgress, tex0: null!, ready: false };
    glRef.current = state;

    let loaded = 0;
    const onTexReady = () => {
      loaded++;
      if (loaded === 2) {
        state.ready = true;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    };

    const tex0 = loadTexture(gl, getRandomIntroImage(), 0, onTexReady);
    state.tex0 = tex0!;
    const tex1 = loadTexture(gl, displacementMapSrc, 1, onTexReady);

    return () => {
      cancelAnimationFrame(rafRef.current);
      gl.deleteTexture(tex0);
      gl.deleteTexture(tex1);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  /* ── Animation loop — triggered by replay / click ── */
  useEffect(() => {
    if (triggerCount === 0) return;
    const ctx = glRef.current;
    if (!ctx?.ready) return;

    const { gl, uProgress } = ctx;
    const canvas = canvasRef.current!;

    cancelAnimationFrame(rafRef.current);
    setShowConvo(false);

    canvas.style.transform = "scale(1)";
    gl.uniform1f(uProgress, 0);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    const t0 = performance.now() + DELAY;
    onProgress?.(0);

    const tick = (now: number) => {
      if (now < t0) {
        const dp = Math.max(0, (now - (t0 - DELAY)) / (DELAY + DURATION));
        onProgress?.(dp);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const p = Math.min((now - t0) / DURATION, 1);
      onProgress?.(
        DELAY / (DELAY + DURATION) + p * (DURATION / (DELAY + DURATION)),
      );
      const eased = aeEaseIn(p);

      gl.uniform1f(uProgress, eased);
      canvas.style.transform = `scale(${1 + (MAX_SCALE - 1) * eased})`;
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setShowConvo(true);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [triggerCount]);

  return (
    <DemoShell>
      <div
        className="absolute inset-0 bg-black cursor-pointer"
        onClick={handleClick}
      >
        <canvas
          ref={canvasRef}
          width={375}
          height={812}
          className="absolute inset-0 h-full w-full"
          style={{ transformOrigin: "center center" }}
        />

        {showConvo && (
          <div className="absolute inset-0 bg-white">
            <AnimatedConvoScreen />
          </div>
        )}
      </div>
    </DemoShell>
  );
}
