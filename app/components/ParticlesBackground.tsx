"use client";

import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const isMobile = window.innerWidth < 768;

    const mouse = {
      x: 0,
      y: 0,
      radius: 120,
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (!isMobile) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            this.x -= dx / 20;
            this.y -= dy / 20;
          }
        }

        if (this.x < 0 || this.x > window.innerWidth) {
          this.speedX *= -1;
        }

        if (this.y < 0 || this.y > window.innerHeight) {
          this.speedY *= -1;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fill();
      }
    }

    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      const count = isMobile ? 40 : 120;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("resize", resizeCanvas);

    resizeCanvas();

    setTimeout(() => {
      initParticles();
      animate();
    }, 0);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ willChange: "transform" }}
    />
  );
}