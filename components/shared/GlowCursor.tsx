"use client";

import React, { useEffect, useRef } from "react";
import { Renderer, Camera, Transform, Program, Mesh, Triangle, Color, Vec2 } from "ogl";

interface GlowCursorProps {
  primaryColor?: string; // default "#0046FF"
  accentColor?: string; // default "#FF8040"
  secondaryColor?: string; // default "#001BB7"
  intensity?: number;
  radius?: number;
  blur?: number;
}

const vertexShader = `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform float uTime;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorAccent;
  uniform vec3 uColorSecondary;
  uniform float uIntensity;
  uniform float uRadius;
  varying vec2 vUv;

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    vec2 mouse = uMouse / uResolution.xy;
    
    // Aspect ratio correction
    float aspect = uResolution.x / uResolution.y;
    vec2 stCorrected = vec2(st.x * aspect, st.y);
    vec2 mouseCorrected = vec2(mouse.x * aspect, mouse.y);

    // Distance to cursor
    float dist = distance(stCorrected, mouseCorrected);

    // Dynamic wave glow
    float pulse = sin(uTime * 2.0) * 0.05 + 0.95;
    float glow = smoothstep(uRadius * pulse, 0.0, dist) * uIntensity;

    // Multi-color gradient field based on angle and distance
    float angle = atan(stCorrected.y - mouseCorrected.y, stCorrected.x - mouseCorrected.x);
    float colorMix = sin(angle * 2.0 + uTime) * 0.5 + 0.5;
    
    vec3 gradientColor = mix(uColorPrimary, uColorAccent, colorMix);
    gradientColor = mix(gradientColor, uColorSecondary, dist * 2.5);

    // Subtly blended alpha output
    float alpha = glow * 0.18;

    gl_FragColor = vec4(gradientColor, alpha);
  }
`;

function hexToRgb(hex: string): [number, number, number] {
  const cleanHex = hex.replace("#", "");
  const bigint = parseInt(cleanHex, 16);
  const r = ((bigint >> 16) & 255) / 255;
  const g = ((bigint >> 8) & 255) / 255;
  const b = (bigint & 255) / 255;
  return [r, g, b];
}

export function GlowCursor({
  primaryColor = "#0046FF",
  accentColor = "#FF8040",
  secondaryColor = "#001BB7",
  intensity = 1.0,
  radius = 0.28,
}: GlowCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

  useEffect(() => {
    // Respect reduced-motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // Skip on touch-only mobile devices to conserve battery & performance
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    });

    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.canvas.style.position = "absolute";
    gl.canvas.style.top = "0";
    gl.canvas.style.left = "0";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.pointerEvents = "none";

    const geometry = new Triangle(gl);
    const primaryRgb = hexToRgb(primaryColor);
    const accentRgb = hexToRgb(accentColor);
    const secondaryRgb = hexToRgb(secondaryColor);

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      transparent: true,
      uniforms: {
        uResolution: { value: new Vec2(window.innerWidth, window.innerHeight) },
        uMouse: { value: new Vec2(window.innerWidth / 2, window.innerHeight / 2) },
        uTime: { value: 0 },
        uColorPrimary: { value: new Color(...primaryRgb) },
        uColorAccent: { value: new Color(...accentRgb) },
        uColorSecondary: { value: new Color(...secondaryRgb) },
        uIntensity: { value: intensity },
        uRadius: { value: radius },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      program.uniforms.uResolution.value.set(gl.canvas.width, gl.canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX * renderer.dpr;
      mouseRef.current.targetY = (window.innerHeight - e.clientY) * renderer.dpr;

      if (mouseRef.current.x < 0) {
        mouseRef.current.x = mouseRef.current.targetX;
        mouseRef.current.y = mouseRef.current.targetY;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    handleResize();

    let startTime = performance.now();

    const update = (time: number) => {
      animationFrameId = requestAnimationFrame(update);

      // Smooth mouse interpolation (LERP)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.12;
      mouse.y += (mouse.targetY - mouse.y) * 0.12;

      program.uniforms.uMouse.value.set(mouse.x, mouse.y);
      program.uniforms.uTime.value = (time - startTime) * 0.001;

      renderer.render({ scene: mesh });
    };

    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (gl.canvas && gl.canvas.parentNode) {
        gl.canvas.parentNode.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [primaryColor, accentColor, secondaryColor, intensity, radius]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden"
    />
  );
}
