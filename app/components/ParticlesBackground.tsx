"use client";

import { useEffect, useRef } from "react";

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const mouse = {
      x: width / 2,
      y: height / 2,
    };

    const particles: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        this.size = Math.random() * 2 + 1;

        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;

        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 140) {
          this.x -= dx * 0.002;
          this.y -= dy * 0.002;
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;

        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

        ctx.fillStyle = "rgba(255,255,255,0.12)";
        ctx.fill();
      }
    }

    for (let i = 0; i < 120; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}