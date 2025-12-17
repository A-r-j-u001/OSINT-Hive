"use client";

import { useEffect, useRef } from "react";

type ShapeType = "circle" | "square" | "triangle";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  wobbleOffset: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  shape: ShapeType;
  rotation: number;
  rotationSpeed: number;
}

export function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let startTime = Date.now();

    const init = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      particles = [];
      const count = 30; // Fewer particles since they are huge

      for (let i = 0; i < count; i++) {
        createParticle(true);
      }
    };

    const createParticle = (randomY = false) => {
      const size = Math.random() * 40 + 20; // Large squares: 20px - 60px
      const shapes: ShapeType[] = ["square"];
      const shape = "square";

      particles.push({
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 20,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 1.0 + 0.2), // Slower, majestic rise
        size,
        color: `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`,
        wobbleOffset: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleAmp: Math.random() * 1 + 0.2, // Less wobble
        shape,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
      });
    };

    const update = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, width, height);

      const now = Date.now();
      const time = (now - startTime) * 0.02;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Physics
        p.y += p.vy;
        p.rotation += p.rotationSpeed;

        const wobble = Math.sin(time * p.wobbleSpeed + p.wobbleOffset) * p.wobbleAmp;
        const currentX = p.x + wobble + p.vx;

        // Fade out
        const fadeStart = height * 0.2;
        let opacity = 1;
        if (p.y < fadeStart) {
          opacity = Math.max(0, p.y / fadeStart);
        }

        if (p.y < -20 || opacity <= 0.01) {
          // Respawn
          p.x = Math.random() * width;
          p.y = height + 20;
          p.vy = -(Math.random() * 1.5 + 0.5);
          opacity = 1;
        }

        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(currentX, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        // Draw Shapes
        ctx.beginPath();
        if (p.shape === "circle") {
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        } else if (p.shape === "square") {
          ctx.rect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else if (p.shape === "triangle") {
          const s = p.size;
          ctx.moveTo(0, -s / 2);
          ctx.lineTo(s / 2, s / 2);
          ctx.lineTo(-s / 2, s / 2);
          ctx.closePath();
        }
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(update);
    };

    init();
    update();

    const handleResize = () => {
      init();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
