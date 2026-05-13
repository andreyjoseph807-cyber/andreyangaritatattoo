"use client";

import { useEffect, useState, useRef } from "react";
import ParticlesBackground from "./components/ParticlesBackground";

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const refs = {
    hero: useRef<HTMLElement | null>(null),
    gallery: useRef<HTMLElement | null>(null),
    about: useRef<HTMLElement | null>(null),
    services: useRef<HTMLElement | null>(null),
    footer: useRef<HTMLElement | null>(null),
  };

  const images = [
    { src: "/tu-nueva-foto.jpg", alt: "Nuevo Tattoo" },
    { src: "/anubis.jpg", alt: "Anubis Tattoo" },
    { src: "/dragon.jpg", alt: "Dragon Tattoo" },
    { src: "/peces.jpg", alt: "Fish Tattoo" },
    { src: "/mouth.jpg", alt: "Blackwork Tattoo" },
    { src: "/demon.jpg", alt: "Dark Tattoo" },
  ];

  const closeModal = () => setSelected(null);

  const nextImage = () => {
    if (selected === null) return;
    setSelected((selected + 1) % images.length);
  };

  const prevImage = () => {
    if (selected === null) return;
    setSelected((selected - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-anim");

          if (entry.isIntersecting && id) {
            setVisible((prev) => ({
              ...prev,
              [id]: true,
            }));
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(refs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* =========================
          PARTICLES (AHORA SÍ EN HERO)
      ========================== */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* OVERLAY PARA OSCURECER Y DAR PROFUNDIDAD */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      {/* BACKGROUND GLOW */}
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/5 blur-[180px] rounded-full pointer-events-none z-20" />

      {/* =========================
                NAVBAR
      ========================== */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
            <h1 className="tracking-[0.3em] text-sm font-semibold">
              ANDREY ANGARITA TATTOO
            </h1>
          </div>

          <div className="hidden md:flex gap-8 text-sm text-zinc-400">
            <a href="#inicio" className="hover:text-white transition">Inicio</a>
            <a href="#sobre" className="hover:text-white transition">Sobre mí</a>
            <a href="#servicios" className="hover:text-white transition">Servicios</a>
            <a href="#contacto" className="hover:text-white transition">Contacto</a>
          </div>

        </div>
      </nav>

      {/* =========================
                HERO
      ========================== */}
      <section
        id="inicio"
        data-anim="hero"
        ref={refs.hero}
        className="relative z-30 min-h-screen flex items-center px-6"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          <div>
            <img src="/logo.png" alt="Logo" className="w-32 mb-10 opacity-95" />

            <p className="text-zinc-500 tracking-[0.5em] text-sm mb-4">
              BLACKWORK • FINELINE • CUSTOM
            </p>

            <h1 className="text-6xl md:text-8xl font-black leading-none mb-8">
              TATUAJES
              <br />
              CON
              <br />
              PROPÓSITO.
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mb-10">
              Cada diseño cuenta una historia. Creamos piezas únicas con identidad y estética profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/573243144372"
                target="_blank"
                className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
              >
                WhatsApp
              </a>

              <a
                href="https://www.instagram.com/andreyangarita_tattoo"
                target="_blank"
                className="border border-zinc-700 px-8 py-4 rounded-2xl hover:bg-zinc-900 transition"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative w-[450px] h-[650px] rounded-[3rem] border border-zinc-800 overflow-hidden">
              <img
                src="/yo-tattoo.jpg"
                alt="Yo Tattoo"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>

        </div>
      </section>

      {/* =========================
              GALERÍA
      ========================== */}
      <section className="relative z-30 py-24 px-6 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-zinc-500 tracking-[0.4em] text-sm mb-4">GALERÍA</p>
            <h2 className="text-5xl font-black">TRABAJOS RECIENTES</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className="cursor-pointer overflow-hidden rounded-3xl border border-zinc-800 hover:border-white/40 transition"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-[500px] object-cover grayscale hover:scale-105 transition"
                />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================
              SOBRE
      ========================== */}
      <section className="relative z-30 py-32 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">

          <img src="/demon.jpg" className="rounded-3xl grayscale" />

          <div>
            <h2 className="text-5xl font-black mb-8">ARTE. DISCIPLINA. PASIÓN.</h2>
            <p className="text-zinc-400 leading-relaxed">
              Soy tatuador especializado en blackwork y fine line. 

              Mi enfoque es crear tatuajes personalizados que reflejen la identidad de cada cliente, combinando estética y significado en cada diseño.
              
              Mi compromiso es ofrecer un servicio profesional, seguro y de alta calidad, transformando ideas en arte corporal con propósito.
            
            </p>
          </div>

        </div>
      </section>

      {/* =========================
              SERVICIOS
      ========================== */}
      <section className="relative z-30 py-32 px-6 border-t border-zinc-900 bg-zinc-950">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">

          <div className="border border-zinc-800 p-10 rounded-3xl">
            <h3 className="text-3xl font-bold mb-4">Cotizaciones</h3>
            <a
              href="https://wa.me/573243144372"
              className="bg-white text-black px-6 py-3 rounded-xl inline-block"
            >
              Cotizar
            </a>
          </div>

          <div className="border border-zinc-800 p-10 rounded-3xl">
            <h3 className="text-3xl font-bold mb-4">Asesorías</h3>
            <a
              href="https://wa.me/573243144372"
              className="bg-white text-black px-6 py-3 rounded-xl inline-block"
            >
              Asesoría
            </a>
          </div>

        </div>
      </section>

      {/* =========================
              FOOTER
      ========================== */}
      <footer className="relative z-30 py-14 border-t border-zinc-900 text-center text-zinc-500">
        Andrey Angarita Tattoo
      </footer>

      {/* LIGHTBOX */}
      {selected !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/90" onClick={closeModal} />

          <img
            src={images[selected].src}
            className="max-w-5xl w-full z-10"
          />
        </div>
      )}

    </main>
  );
}