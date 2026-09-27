'use client';

import { useEffect, useRef } from "react";

interface Point {
  x: number;
  y: number;
}

interface CometTracer {
  head: Point;
  targetPath: Point[]; // Sequence of pre-generated random grid waypoints
  targetIdx: number; // Current waypoint target index
  dx: number; // Direction X (-1, 0, 1)
  dy: number; // Direction Y (-1, 0, 1)
  speed: number; // Pixels per frame (slower, steady cruising)
  maxHistory: number; // Number of points in the fading comet tail
  history: Point[]; // Recorded trail of previous head positions
  age: number; // Current frames alive
  maxAge: number; // Uniform lifespan range
  delay: number; // Spawn delay
  alpha: number;
  maxAlpha: number;
  glowSize: number;
}

const GRID_SIZE = 24; // Matches the hero background grid: bg-[size:24px_24px]
const TRACER_COUNT = 4; // Kept to 4 sleek comets for clean, low volume
const UNIFORM_LIFESPAN = 280; // Uniform lifespan range (~4.6s at 60fps)

export default function NeonGridBeams() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Honor prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width;
      height = rect.height;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);

    // Generate a winding circuit route of random waypoints along the grid
    const generateRandomWaypoints = (
      startCol: number,
      startRow: number,
      maxCols: number,
      maxRows: number,
      legsCount = 14
    ): Point[] => {
      const waypoints: Point[] = [
        { x: startCol * GRID_SIZE, y: startRow * GRID_SIZE },
      ];

      let currentCol = startCol;
      let currentRow = startRow;
      let isHorizontal = Math.random() > 0.5;

      for (let i = 0; i < legsCount; i++) {
        if (isHorizontal) {
          // Travel 2 to 5 grid cells horizontally
          const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 2);
          currentCol = Math.max(2, Math.min(maxCols - 2, currentCol + delta));
          waypoints.push({
            x: currentCol * GRID_SIZE,
            y: currentRow * GRID_SIZE,
          });
          isHorizontal = false; // Next leg will be vertical
        } else {
          // Travel 2 to 5 grid cells vertically
          const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 4) + 2);
          currentRow = Math.max(2, Math.min(maxRows - 2, currentRow + delta));
          waypoints.push({
            x: currentCol * GRID_SIZE,
            y: currentRow * GRID_SIZE,
          });
          isHorizontal = true; // Next leg will be horizontal
        }
      }

      return waypoints;
    };

    // Spawn a comet tracer with slower speed and a true fading history tail
    const createTracer = (initialDelay = 0): CometTracer => {
      const cols = Math.max(6, Math.floor(width / GRID_SIZE));
      const rows = Math.max(6, Math.floor(height / GRID_SIZE));

      // Choose a random starting grid intersection
      const startCol = Math.floor(Math.random() * (cols - 4)) + 2;
      const startRow = Math.floor(Math.random() * (rows - 4)) + 2;

      const targetPath = generateRandomWaypoints(startCol, startRow, cols, rows, 14);
      const head: Point = { ...targetPath[0] };
      const nextTarget = targetPath[1];

      // Initial direction toward first target waypoint
      const dx = nextTarget.x > head.x ? 1 : nextTarget.x < head.x ? -1 : 0;
      const dy = nextTarget.y > head.y ? 1 : nextTarget.y < head.y ? -1 : 0;

      // Uniform lifespan range
      const maxAge = UNIFORM_LIFESPAN + Math.floor(Math.random() * 14 - 7);
      // Slower steady cruising speed
      const speed = 0.62 + Math.random() * 0.12; // 0.62 - 0.74 px/frame

      return {
        head,
        targetPath,
        targetIdx: 1,
        dx,
        dy,
        speed,
        maxHistory: Math.floor(Math.random() * 25 + 95), // 95 - 120 points for long comet tail
        history: [{ ...head }],
        age: 0,
        maxAge,
        delay: initialDelay,
        alpha: 0,
        maxAlpha: 0.85 + Math.random() * 0.15,
        glowSize: 18 + Math.random() * 6,
      };
    };

    // Stagger initial spawns widely
    const tracers: CometTracer[] = Array.from({ length: TRACER_COUNT }, (_, i) =>
      createTracer(Math.floor(i * 70))
    );

    // Animation loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < tracers.length; i++) {
        const t = tracers[i];

        if (t.delay > 0) {
          t.delay--;
          continue;
        }

        t.age++;

        // Uniform lifecycle fade (40 frames in, 40 frames out)
        const fadeFrames = 40;
        if (t.age < fadeFrames) {
          t.alpha = (t.age / fadeFrames) * t.maxAlpha;
        } else if (t.age > t.maxAge - fadeFrames) {
          t.alpha = Math.max(0, (t.maxAge - t.age) / fadeFrames) * t.maxAlpha;
        } else {
          t.alpha = t.maxAlpha;
        }

        // Navigate towards current target waypoint
        const target = t.targetPath[t.targetIdx];
        if (target) {
          const distToTarget = Math.hypot(target.x - t.head.x, target.y - t.head.y);

          if (distToTarget <= t.speed) {
            // Reached waypoint: snap cleanly to the grid intersection
            t.head.x = target.x;
            t.head.y = target.y;

            // Advance to next random waypoint
            t.targetIdx++;
            const nextTarget = t.targetPath[t.targetIdx];

            if (nextTarget) {
              t.dx = nextTarget.x > t.head.x ? 1 : nextTarget.x < t.head.x ? -1 : 0;
              t.dy = nextTarget.y > t.head.y ? 1 : nextTarget.y < t.head.y ? -1 : 0;
            }
          } else {
            // Move steadily towards waypoint along the grid line
            t.head.x += t.dx * t.speed;
            t.head.y += t.dy * t.speed;
          }
        } else {
          // If all waypoints completed, continue in current direction
          t.head.x += t.dx * t.speed;
          t.head.y += t.dy * t.speed;
        }

        // Record head position into history for the trailing comet
        t.history.push({ x: t.head.x, y: t.head.y });
        if (t.history.length > t.maxHistory) {
          t.history.shift();
        }

        const historyLen = t.history.length;

        // Draw the fading comet trail that seamlessly follows through every 90° turn
        if (historyLen >= 2 && t.alpha > 0.02) {
          ctx.save();
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.globalCompositeOperation = "lighter";

          // Render micro-segments from tail (index 0) to head (index historyLen - 1)
          // Progressively increasing opacity, glow, and width creates a true fading comet
          for (let j = 1; j < historyLen; j++) {
            const pPrev = t.history[j - 1];
            const pCurr = t.history[j];

            // Ratio along trail: 0 at tail tip, 1 at head
            const progress = j / (historyLen - 1);
            // Exponential comet fade (quadratic curve: tail dissolves to 0, head burns bright)
            const cometAlpha = Math.pow(progress, 1.9) * t.alpha;

            if (cometAlpha < 0.01) continue;

            // Width tapers from 0.8px at tail to 2.4px at head
            ctx.lineWidth = 0.8 + progress * 1.6;

            // Dynamic color: dark crimson tail -> electric red body -> bright white-hot tip
            ctx.shadowColor = "#FF0033";
            ctx.shadowBlur = progress > 0.6 ? t.glowSize : t.glowSize * 0.5;

            if (progress > 0.88) {
              // Laser-hot core near the head
              ctx.strokeStyle = `rgba(255, 230, 230, ${cometAlpha})`;
            } else if (progress > 0.5) {
              // Vivid electric red body
              ctx.strokeStyle = `rgba(255, 30, 60, ${cometAlpha * 0.9})`;
            } else {
              // Deep neon fading tail
              ctx.strokeStyle = `rgba(214, 0, 40, ${cometAlpha * 0.7})`;
            }

            ctx.beginPath();
            ctx.moveTo(pPrev.x, pPrev.y);
            ctx.lineTo(pCurr.x, pCurr.y);
            ctx.stroke();
          }

          // Hot head spark: glowing photon aura at the front of the comet
          const headAura = ctx.createRadialGradient(
            t.head.x,
            t.head.y,
            0,
            t.head.x,
            t.head.y,
            8
          );
          headAura.addColorStop(0, `rgba(255, 255, 255, ${t.alpha})`);
          headAura.addColorStop(0.35, `rgba(255, 30, 60, ${t.alpha * 0.9})`);
          headAura.addColorStop(1, "rgba(255, 0, 40, 0)");

          ctx.fillStyle = headAura;
          ctx.beginPath();
          ctx.arc(t.head.x, t.head.y, 8, 0, Math.PI * 2);
          ctx.fill();

          // Brilliant pinpoint hot center
          ctx.fillStyle = "#FFFFFF";
          ctx.beginPath();
          ctx.arc(t.head.x, t.head.y, 2.2, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }

        // Respawn with a calm breathing pause when tracer reaches its uniform lifespan
        if (t.age >= t.maxAge) {
          tracers[i] = createTracer(Math.floor(Math.random() * 55 + 25));
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
      {/* 2D Canvas rendering the slow-moving fading comet pulses */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          mixBlendMode: "screen",
          filter: "drop-shadow(0 0 14px rgba(255, 0, 50, 0.6))",
        }}
      />

      {/* Subtle radial ambient vignette to naturally fade out edges */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-background/80 pointer-events-none" />
    </div>
  );
}
