"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [halo, setHalo] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Solo en desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let animFrame: number;

    const onMove = (e: MouseEvent) => {
      setVisible(true);
      setPos({ x: e.clientX, y: e.clientY });

      // El halo sigue con un pequeño delay via lerp en animFrame
      cancelAnimationFrame(animFrame);
      let hx = e.clientX;
      let hy = e.clientY;

      const lerp = () => {
        setHalo((prev) => {
          const nx = prev.x + (hx - prev.x) * 0.12;
          const ny = prev.y + (hy - prev.y) * 0.12;
          if (Math.abs(nx - hx) > 0.5 || Math.abs(ny - hy) > 0.5) {
            animFrame = requestAnimationFrame(lerp);
          }
          return { x: nx, y: ny };
        });
      };
      animFrame = requestAnimationFrame(lerp);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <style>{`
        * { cursor: none !important; }
      `}</style>

      {/* Halo exterior — sigue con delay */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full border border-white/30 transition-opacity duration-300"
        style={{
          width: clicking ? "28px" : "36px",
          height: clicking ? "28px" : "36px",
          left: halo.x,
          top: halo.y,
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          boxShadow: clicking
            ? "0 0 12px rgba(255,255,255,0.4)"
            : "0 0 20px rgba(255,255,255,0.15)",
          transition: "width 150ms ease, height 150ms ease, box-shadow 150ms ease, opacity 300ms ease",
        }}
      />

      {/* Punto central — sigue exacto */}
      <div
        className="fixed pointer-events-none z-[9999] rounded-full bg-white"
        style={{
          width: clicking ? "6px" : "5px",
          height: clicking ? "6px" : "5px",
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
          boxShadow: "0 0 8px rgba(255,255,255,0.8)",
          transition: "width 150ms ease, height 150ms ease, opacity 300ms ease",
        }}
      />
    </>
  );
}