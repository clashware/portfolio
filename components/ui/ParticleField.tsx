"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  z: number;
  baseRadius: number;
  colorIdx: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  force: number;
}

// Precomputed color components (avoid string concat in hot loop)
const COLORS_R = [208, 249, 255, 153];
const COLORS_G = [50, 115, 60, 27];
const COLORS_B = [50, 22, 0, 27];

const CONNECTION_DISTANCE = 120;
const CONNECTION_DIST_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
const MOUSE_RADIUS = 250;
const MOUSE_RADIUS_SQ = MOUSE_RADIUS * MOUSE_RADIUS;
const HALF_PI = Math.PI / 2;
const TWO_PI = Math.PI * 2;

function createParticle(width: number, height: number): Particle {
  const z = Math.random() * 0.8 + 0.2;
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: 0,
    z,
    baseRadius: (Math.random() * 2 + 0.5) * z,
    colorIdx: (Math.random() * 4) | 0,
  };
}

// The full imperative canvas engine lives at module scope so the React
// component stays a thin mount/unmount shell.
function startParticleField(canvas: HTMLCanvasElement): (() => void) | undefined {
  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return undefined;

  const S = {
    particles: [] as Particle[],
    shockwaves: [] as Shockwave[],
    mouse: { x: -1000, y: -1000, active: false, vx: 0, vy: 0, prevX: -1000, prevY: -1000 },
    time: 0,
    w: 0,
    h: 0,
    offsetX: 0,
    offsetY: 0,
    animId: 0,
    reducedMotion: false,
    // Precomputed color strings keyed by [colorIdx, opacity bucket] — avoids
    // building rgba() strings inside the O(n²) connection loop.
    connColors: [] as string[],
  };

    for (let ci = 0; ci < 4; ci++) {
      for (let oi = 0; oi < 16; oi++) {
        const opacity = (oi / 15) * 0.4;
        S.connColors[ci * 16 + oi] = `rgba(${COLORS_R[ci]},${COLORS_G[ci]},${COLORS_B[ci]},${opacity.toFixed(3)})`;
      }
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    S.reducedMotion = motionQuery.matches;
    const handleMotionChange = (e: MediaQueryListEvent) => {
      S.reducedMotion = e.matches;
      // Restart the loop: reduced mode renders one static frame, full mode resumes animating.
      cancelAnimationFrame(S.animId);
      S.animId = requestAnimationFrame(animate);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Pause all work while the tab is hidden.
    const handleVisibility = () => {
      cancelAnimationFrame(S.animId);
      if (!document.hidden) {
        S.animId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = parent.getBoundingClientRect();
      S.w = rect.width;
      S.h = rect.height;
      S.offsetX = rect.left;
      S.offsetY = rect.top;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = rect.width < 768;
      const areaDivisor = isMobile ? 10000 : 6000;
      const maxCount = isMobile ? 100 : 180;
      const count = Math.min(Math.floor((rect.width * rect.height) / areaDivisor), maxCount);
      S.particles = Array.from({ length: count }, () => createParticle(rect.width, rect.height));
    };

    const handleResize = () => {
      resize();
      if (S.reducedMotion) {
        cancelAnimationFrame(S.animId);
        S.animId = requestAnimationFrame(animate);
      }
    };

    resize();
    window.addEventListener("resize", handleResize);

    let lastPointerTime = 0;
    const updatePointer = (clientX: number, clientY: number, timestamp: number) => {
      if (timestamp - lastPointerTime < 16) return; // throttle to ~60fps
      lastPointerTime = timestamp;
      const newX = clientX - S.offsetX;
      const newY = clientY - S.offsetY;
      const m = S.mouse;
      m.vx = newX - m.prevX;
      m.vy = newY - m.prevY;
      m.x = newX;
      m.y = newY;
      m.active = true;
      m.prevX = newX;
      m.prevY = newY;
    };

    const deactivatePointer = () => {
      S.mouse.active = false;
      S.mouse.vx = 0;
      S.mouse.vy = 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePointer(e.clientX, e.clientY, e.timeStamp);
    };

    const handleMouseLeave = deactivatePointer;

    const handleClick = (e: MouseEvent) => {
      S.shockwaves.push({
        x: e.clientX - S.offsetX,
        y: e.clientY - S.offsetY,
        radius: 0,
        maxRadius: 400,
        force: 25,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      updatePointer(touch.clientX, touch.clientY, e.timeStamp);
    };

    const handleTouchEnd = () => {
      const m = S.mouse;
      if (m.x > 0 && m.y > 0) {
        S.shockwaves.push({ x: m.x, y: m.y, radius: 0, maxRadius: 300, force: 20 });
      }
      deactivatePointer();
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });

    const animate = () => {
      const w = S.w;
      const h = S.h;

      // Motion-blur trail: faint dark fill in source-over, then switch to
      // additive ("lighter") for the rest of the frame so glows accumulate.
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(10, 10, 15, 0.3)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      if (S.reducedMotion) {
        // Static scene: draw once on an opaque background and stop scheduling.
        ctx.fillStyle = "#0A0A0F";
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "lighter";
        const particles = S.particles;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.baseRadius, 0, TWO_PI);
          const ci = p.colorIdx;
          ctx.fillStyle = `rgba(${COLORS_R[ci]},${COLORS_G[ci]},${COLORS_B[ci]},${0.5 * p.z})`;
          ctx.fill();
        }
        return;
      }

      S.time += 0.001;
      const time = S.time;
      const particles = S.particles;
      const mouse = S.mouse;
      const shockwaves = S.shockwaves;
      const connColors = S.connColors;

      for (let i = shockwaves.length - 1; i >= 0; i--) {
        shockwaves[i].radius += 8;
        if (shockwaves[i].radius > shockwaves[i].maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const angle = (Math.sin(p.x * 0.002 + time) + Math.cos(p.y * 0.002 + time)) * TWO_PI;
        p.vx += Math.cos(angle) * 0.1 * p.z;
        p.vy += Math.sin(angle) * 0.1 * p.z;

        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          // squared distance: skip sqrt when out of range
          const distSq = dx * dx + dy * dy;

          if (distSq < MOUSE_RADIUS_SQ && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
            const angleToMouse = Math.atan2(dy, dx);
            const swirlX = Math.cos(angleToMouse + HALF_PI);
            const swirlY = Math.sin(angleToMouse + HALF_PI);
            const fz = force * p.z;
            p.vx += (Math.cos(angleToMouse) * 0.5 + swirlX * 2.0 + mouse.vx * 0.05) * fz;
            p.vy += (Math.sin(angleToMouse) * 0.5 + swirlY * 2.0 + mouse.vy * 0.05) * fz;
          }
        }

        for (let si = 0; si < shockwaves.length; si++) {
          const sw = shockwaves[si];
          const dx = p.x - sw.x;
          const dy = p.y - sw.y;
          const distSq = dx * dx + dy * dy;
          // bbox-reject before sqrt
          const maxDist = sw.radius + 60;
          if (distSq > maxDist * maxDist) continue;
          const dist = Math.sqrt(distSq);
          const delta = Math.abs(dist - sw.radius);
          if (delta < 60) {
            const force = (1 - delta / 60) * sw.force;
            const angleToSw = Math.atan2(dy, dx);
            p.vx += Math.cos(angleToSw) * force * p.z;
            p.vy += Math.sin(angleToSw) * force * p.z;
          }
        }

        p.vx *= 0.92;
        p.vy *= 0.92;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;
      }

      // Connections are batched per (color, opacity-band) into a single
      // beginPath/stroke, which collapses thousands of segments into a handful
      // of draw calls.
      ctx.lineCap = "round";
      for (let ci = 0; ci < 4; ci++) {
        for (let band = 0; band < 3; band++) {
          const oiBase = band === 0 ? 12 : band === 1 ? 8 : 4;
          ctx.strokeStyle = connColors[ci * 16 + oiBase];
          ctx.lineWidth = band === 0 ? 1.0 : band === 1 ? 0.7 : 0.4;
          ctx.beginPath();
          let hasSegments = false;

          for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            if (p1.colorIdx !== ci) continue;

            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              if (Math.abs(p1.z - p2.z) > 0.3) continue;

              // bbox reject on each axis before computing distSq
              const dx = p1.x - p2.x;
              if (dx > CONNECTION_DISTANCE || dx < -CONNECTION_DISTANCE) continue;
              const dy = p1.y - p2.y;
              if (dy > CONNECTION_DISTANCE || dy < -CONNECTION_DISTANCE) continue;

              const distSq = dx * dx + dy * dy;
              if (distSq >= CONNECTION_DIST_SQ) continue;

              const ratio = distSq / CONNECTION_DIST_SQ;
              const b = ratio < 0.33 ? 0 : ratio < 0.66 ? 1 : 2;
              if (b !== band) continue;

              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              hasSegments = true;
            }
          }
          if (hasSegments) ctx.stroke();
        }
      }

      ctx.strokeStyle = "rgba(208,50,50,0.12)";
      ctx.lineWidth = 0.4;
      ctx.beginPath();
      let hasCross = false;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          if (p1.colorIdx === p2.colorIdx) continue;
          if (Math.abs(p1.z - p2.z) > 0.3) continue;
          const dx = p1.x - p2.x;
          if (dx > 80 || dx < -80) continue;
          const dy = p1.y - p2.y;
          if (dy > 80 || dy < -80) continue;
          if (dx * dx + dy * dy < 6400) { // 80²
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            hasCross = true;
          }
        }
      }
      if (hasCross) ctx.stroke();

      if (mouse.active) {
        ctx.beginPath();
        let hasMouseLines = false;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ) {
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            hasMouseLines = true;
          }
        }
        if (hasMouseLines) {
          ctx.strokeStyle = "rgba(249,115,22,0.08)";
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      for (let si = 0; si < shockwaves.length; si++) {
        const sw = shockwaves[si];
        const progress = sw.radius / sw.maxRadius;
        const ringOpacity = (1 - progress) * 0.4;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, TWO_PI);
        ctx.strokeStyle = `rgba(208,50,50,${ringOpacity.toFixed(3)})`;
        ctx.lineWidth = 2 * (1 - progress);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius * 0.8, 0, TWO_PI);
        ctx.strokeStyle = `rgba(249,115,22,${(ringOpacity * 0.5).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Glow is faked with a translucent halo circle rather than shadowBlur
      // (orders of magnitude cheaper). Particles inside MOUSE_RADIUS get
      // brighter, larger, and shift toward white as they approach the cursor.
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const speedSq = p.vx * p.vx + p.vy * p.vy;
        const ci = p.colorIdx;

        let mouseProximity = 0;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ) {
            mouseProximity = 1 - Math.sqrt(distSq) / MOUSE_RADIUS;
          }
        }

        const baseR = p.baseRadius + (speedSq > 1 ? Math.sqrt(speedSq) * 0.2 : speedSq * 0.2);
        const dynamicRadius = baseR + mouseProximity * 2.5;
        const opacity = Math.min(0.4 + speedSq * 0.02 + mouseProximity * 0.4, 1.0) * p.z;

        const glowRadius = dynamicRadius * (3 + mouseProximity * 2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, TWO_PI);
        ctx.fillStyle = `rgba(${COLORS_R[ci]},${COLORS_G[ci]},${COLORS_B[ci]},${(opacity * (0.15 + mouseProximity * 0.1)).toFixed(3)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, dynamicRadius, 0, TWO_PI);
        if (mouseProximity > 0.6) {
          const whiteness = (mouseProximity - 0.6) / 0.4;
          const r = COLORS_R[ci] + (255 - COLORS_R[ci]) * whiteness;
          const g = COLORS_G[ci] + (255 - COLORS_G[ci]) * whiteness;
          const b = COLORS_B[ci] + (255 - COLORS_B[ci]) * whiteness;
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${opacity.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(${COLORS_R[ci]},${COLORS_G[ci]},${COLORS_B[ci]},${opacity.toFixed(3)})`;
        }
        ctx.fill();
      }

      if (mouse.active) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 20, 0, TWO_PI);
        ctx.fillStyle = "rgba(249,115,22,0.06)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, TWO_PI);
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 8, 0, TWO_PI);
        ctx.strokeStyle = "rgba(249,115,22,0.3)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      S.animId = requestAnimationFrame(animate);
    };

    S.animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(S.animId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    return startParticleField(canvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto cursor-crosshair"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
