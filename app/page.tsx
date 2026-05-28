"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ParticlesBackground from "./components/ParticlesBackground";
import ReviewsSection from "@/app/components/ReviewsSection";
interface Particle {
  id: number;
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  duration: number;
  opacity: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 50 + (Math.random() - 0.5) * 4,
    y: 50 + (Math.random() - 0.5) * 4,
    tx: (Math.random() - 0.5) * 220,
    ty: (Math.random() - 0.5) * 220,
    size: Math.random() * 5 + 2,
    duration: Math.random() * 500 + 400,
    opacity: Math.random() * 0.7 + 0.3,
  }));
}

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [particles] = useState<Particle[]>(() => generateParticles(60));
  const [menuOpen, setMenuOpen] = useState(false);

  const [selected, setSelected] = useState<number | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const heroRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const aboutRef = useRef<HTMLElement | null>(null);
  const servicesRef = useRef<HTMLElement | null>(null);
  const footerRef = useRef<HTMLElement | null>(null);

  const images = [
    { src: "/tu-nueva-foto.jpg", alt: "Nuevo Tattoo" },
    { src: "/anubis.jpg", alt: "Anubis Tattoo" },
    { src: "/dragon.jpg", alt: "Dragon Tattoo" },
    { src: "/peces.jpg", alt: "Fish Tattoo" },
    { src: "/mouth.jpg", alt: "Blackwork Tattoo" },
    { src: "/demon.jpg", alt: "Dark Tattoo" },
  ];

  const handleSplashClick = () => {
    if (exploding) return;
    setExploding(true);
    setTimeout(() => setSplashDone(true), 900);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
      if (e.key === "ArrowRight")
        setSelected((s) => (s === null ? null : (s + 1) % images.length));
      if (e.key === "ArrowLeft")
        setSelected((s) =>
          s === null ? null : (s - 1 + images.length) % images.length
        );
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-anim");
          if (entry.isIntersecting && id) {
            setVisible((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    const allRefs = [heroRef, galleryRef, aboutRef, servicesRef, footerRef];
    allRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = document.getElementById("ambient-audio") as HTMLAudioElement | null;
    const enableAudio = () => {
      if (audio) {
        audio.muted = false;
        audio.volume = 0.35;
        audio.play().catch(() => {});
      }
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("mousemove", enableAudio);
      window.removeEventListener("scroll", enableAudio);
    };
    window.addEventListener("click", enableAudio);
    window.addEventListener("mousemove", enableAudio);
    window.addEventListener("scroll", enableAudio);
    return () => {
      window.removeEventListener("click", enableAudio);
      window.removeEventListener("mousemove", enableAudio);
      window.removeEventListener("scroll", enableAudio);
    };
  }, []);

  const animClass = (key: string) =>
    `transition-all duration-700 ease-out ${
      visible[key] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
    }`;

  return (
    <>
      {/* SPLASH SCREEN */}
      {!splashDone && (
        <div
          className={`fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center cursor-pointer select-none ${
            exploding ? "pointer-events-none" : ""
          }`}
          onClick={handleSplashClick}
        >
          {exploding &&
            particles.map((p) => (
              <div
                key={p.id}
                className="absolute rounded-full bg-white"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  opacity: p.opacity,
                  animation: `particle-out ${p.duration}ms ease-out forwards`,
                  "--tx": `${p.tx}vw`,
                  "--ty": `${p.ty}vh`,
                } as React.CSSProperties}
              />
            ))}

          <div
            className={`flex flex-col items-center gap-6 transition-all duration-500 ${
              exploding ? "opacity-0 scale-150" : "opacity-100 scale-100"
            }`}
          >
            <div className="animate-pulse-slow">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={120}
                className="opacity-95 drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]"
              />
            </div>
            <h1 className="tracking-[0.4em] text-sm font-semibold text-white text-center px-4">
              ANDREY ANGARITA TATTOO
            </h1>
            <p className="text-zinc-600 text-xs tracking-widest mt-4 animate-pulse">
              TOCA PARA ENTRAR
            </p>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />
        </div>
      )}

      <style>{`
        @keyframes particle-out {
          0%   { transform: translate(0, 0) scale(1); opacity: 1; }
          100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1);    filter: drop-shadow(0 0 20px rgba(255,255,255,0.15)); }
          50%       { transform: scale(1.07); filter: drop-shadow(0 0 40px rgba(255,255,255,0.35)); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2.5s ease-in-out infinite;
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <main className="min-h-screen bg-black text-white overflow-x-hidden relative">

        {/* PARTICLES + MUSIC */}
        <div className="absolute inset-0 z-0">
          <ParticlesBackground />
          <audio id="ambient-audio" autoPlay loop muted>
            <source src="/ambient.mp3" type="audio/mpeg" />
          </audio>
        </div>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

        {/* BACKGROUND GLOW */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/5 blur-[180px] rounded-full pointer-events-none z-20" />

        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur border-b border-zinc-900">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="Logo" width={36} height={36} className="object-contain" />
              <span className="tracking-[0.2em] text-xs sm:text-sm font-semibold">
                ANDREY ANGARITA TATTOO
              </span>
            </div>

            {/* Links en desktop */}
            <div className="hidden md:flex gap-8 text-sm text-zinc-400">
              <a href="#inicio" className="hover:text-white transition">Inicio</a>
              <a href="#sobre" className="hover:text-white transition">Sobre mí</a>
              <a href="#servicios" className="hover:text-white transition">Servicios</a>
              <a href="#contacto" className="hover:text-white transition">Contacto</a>
            </div>

            {/* Botón hamburguesa en móvil */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>

          {/* Menú móvil desplegable */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64" : "max-h-0"}`}>
            <div className="flex flex-col px-6 pb-4 gap-4 text-sm text-zinc-400 bg-black/80">
              <a href="#inicio"   onClick={() => setMenuOpen(false)} className="hover:text-white transition py-1 border-b border-zinc-900">Inicio</a>
              <a href="#sobre"    onClick={() => setMenuOpen(false)} className="hover:text-white transition py-1 border-b border-zinc-900">Sobre mí</a>
              <a href="#servicios" onClick={() => setMenuOpen(false)} className="hover:text-white transition py-1 border-b border-zinc-900">Servicios</a>
              <a href="#contacto" onClick={() => setMenuOpen(false)} className="hover:text-white transition py-1">Contacto</a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section
          id="inicio"
          data-anim="hero"
          ref={heroRef}
          className={`relative z-30 min-h-screen flex items-center px-4 sm:px-6 pt-24 pb-16 ${animClass("hero")}`}
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center w-full">
            <div>
              <Image src="/logo.png" alt="Logo" width={96} height={96} className="mb-8 opacity-95 w-20 md:w-32" />

              <p className="text-zinc-500 tracking-[0.4em] text-xs sm:text-sm mb-4">
                BLACKWORK • FINELINE • CUSTOM
              </p>

              <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-none mb-6 md:mb-8">
                TATUAJES<br />CON<br />PROPÓSITO.
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-xl mb-8 md:mb-10">
                Cada diseño cuenta una historia. Creamos piezas únicas con identidad y estética profesional.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/573243144372"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition text-center"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.instagram.com/andreyangarita_tattoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-zinc-700 px-8 py-4 rounded-2xl hover:bg-zinc-900 transition text-center"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* Foto solo visible en desktop */}
            <div className="hidden md:flex justify-center">
              <div className="relative w-[450px] h-[650px] rounded-[3rem] border border-zinc-800 overflow-hidden">
                <Image
                  src="/yo-tattoo.jpg"
                  alt="Andrey Angarita tatuador"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>
          </div>
        </section>

        {/* GALERÍA */}
        <section
          data-anim="gallery"
          ref={galleryRef}
          className={`relative z-30 py-16 sm:py-24 px-4 sm:px-6 border-t border-zinc-900 ${animClass("gallery")}`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <p className="text-zinc-500 tracking-[0.4em] text-xs sm:text-sm mb-4">GALERÍA</p>
              <h2 className="text-3xl sm:text-5xl font-black">TRABAJOS RECIENTES</h2>
            </div>
            {/* 1 col en móvil, 2 en tablet, 3 en desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {images.map((img, i) => (
                <div
                  key={i}
                  onClick={() => setSelected(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver ${img.alt} en detalle`}
                  onKeyDown={(e) => e.key === "Enter" && setSelected(i)}
                  className="relative group cursor-pointer rounded-3xl"
                >
                  <div className="absolute -inset-6 bg-white/40 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl pointer-events-none z-0" />
                  <div className="relative overflow-hidden rounded-3xl border border-zinc-800 z-10">
                    {/* Altura adaptada: menos en móvil */}
                    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover grayscale group-hover:scale-105 transition duration-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SOBRE MÍ */}
        <section
          id="sobre"
          data-anim="about"
          ref={aboutRef}
          className={`relative z-30 py-16 sm:py-32 px-4 sm:px-6 border-t border-zinc-900 ${animClass("about")}`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
              <Image
                src="/demon.jpg"
                alt="Trabajo de tatuaje"
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl sm:text-5xl font-black mb-6 md:mb-8">ARTE. DISCIPLINA. PASIÓN.</h2>
              <p className="text-zinc-400 leading-relaxed text-sm sm:text-base">
                Soy tatuador especializado en blackwork y fine line.
                Mi enfoque es crear tatuajes personalizados que reflejen la identidad de cada cliente,
                combinando estética y significado en cada diseño.
                Mi compromiso es ofrecer un servicio profesional, seguro y de alta calidad,
                transformando ideas en arte corporal con propósito.
              </p>
            </div>
          </div>
        </section>

        {/* SERVICIOS */}
        <section
          id="servicios"
          data-anim="services"
          ref={servicesRef}
          className={`relative z-30 py-16 sm:py-32 px-4 sm:px-6 border-t border-zinc-900 bg-zinc-950 ${animClass("services")}`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="border border-zinc-800 p-6 sm:p-10 rounded-3xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Cotizaciones</h3>
              <a
                href="https://wa.me/573243144372"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3 rounded-xl inline-block hover:scale-105 transition font-semibold"
              >
                Cotizar
              </a>
            </div>
            <div className="border border-zinc-800 p-6 sm:p-10 rounded-3xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">Asesorías</h3>
              <a
                href="https://wa.me/573243144372"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3 rounded-xl inline-block hover:scale-105 transition font-semibold"
              >
                Asesoría
              </a>
            </div>
          </div>
        </section>

        {/* RESEÑAS */}
        <ReviewsSection />

        {/* CONTACTO */}
        <section
          id="contacto"
          className="relative z-30 py-16 sm:py-24 px-4 sm:px-6 border-t border-zinc-900"
        >
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-zinc-500 tracking-[0.4em] text-xs sm:text-sm mb-4">CONTACTO</p>
            <h2 className="text-3xl sm:text-5xl font-black mb-8 sm:mb-10">HABLEMOS</h2>
            <p className="text-zinc-400 text-base sm:text-lg mb-6">Para cotizaciones, ideas o asesorías:</p>
            <a
              href="mailto:andreyjoseph807@gmail.com"
              className="text-white text-base sm:text-xl font-semibold hover:underline break-all"
            >
              andreyjoseph807@gmail.com
            </a>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
              <a
                href="https://wa.me/573243144372"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition text-center"
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/andreyangarita_tattoo"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-700 px-8 py-4 rounded-2xl hover:bg-zinc-900 transition text-center"
              >
                Instagram
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          data-anim="footer"
          ref={footerRef}
          className={`relative z-30 py-10 sm:py-14 border-t border-zinc-900 text-center text-zinc-500 text-sm ${animClass("footer")}`}
        >
          Andrey Angarita Tattoo
        </footer>

        {/* LIGHTBOX */}
        {selected !== null && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Imagen ampliada: ${images[selected].alt}`}
            className="fixed inset-0 z-[100] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/90" onClick={() => setSelected(null)} />

            <button
              onClick={() => setSelected(null)}
              aria-label="Cerrar imagen"
              className="absolute top-4 right-4 z-20 text-white text-2xl sm:text-3xl hover:text-zinc-400 transition w-10 h-10 flex items-center justify-center"
            >
              ✕
            </button>

            <button
              onClick={() => setSelected((s) => s === null ? null : (s - 1 + images.length) % images.length)}
              aria-label="Imagen anterior"
              className="absolute left-2 sm:left-6 z-20 text-white text-4xl hover:text-zinc-400 transition px-2 sm:px-4 py-2"
            >
              ‹
            </button>

            {/* Imagen ocupa casi toda la pantalla en móvil */}
            <div className="relative w-[92vw] sm:w-[80vw] max-w-5xl z-10 aspect-[3/4] sm:aspect-[4/3]">
              <Image
                src={images[selected].src}
                alt={images[selected].alt}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={() => setSelected((s) => s === null ? null : (s + 1) % images.length)}
              aria-label="Imagen siguiente"
              className="absolute right-2 sm:right-6 z-20 text-white text-4xl hover:text-zinc-400 transition px-2 sm:px-4 py-2"
            >
              ›
            </button>
          </div>
        )}

      </main>
    </>
  );
}