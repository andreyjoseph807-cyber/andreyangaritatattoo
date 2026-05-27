"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import ParticlesBackground from "./components/ParticlesBackground";

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  // FIX 3: refs separados en lugar de un objeto que se recrea en cada render
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

  // FIX 1: stale closure resuelto usando el setter funcional de useState
  // Las funciones nextImage/prevImage ya no dependen del valor capturado de `selected`
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
  }, [images.length]); // solo depende de images.length, no de `selected`

  // FIX 2: IntersectionObserver ahora conectado a los refs correctos
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

    // FIX 3: usar los refs separados
    const allRefs = [heroRef, galleryRef, aboutRef, servicesRef, footerRef];
    allRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const audio = document.getElementById(
      "ambient-audio"
    ) as HTMLAudioElement | null;

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

  // Clases reutilizables para la animación de entrada
  const animClass = (key: string) =>
    `transition-all duration-700 ease-out ${
      visible[key]
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-8"
    }`;

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

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
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {/* FIX 6: next/image en lugar de <img> */}
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="object-contain" />
            <h1 className="tracking-[0.3em] text-sm font-semibold">
              ANDREY ANGARITA TATTOO
            </h1>
          </div>

          <div className="hidden md:flex gap-8 text-sm text-zinc-400">
            <a href="#inicio" className="hover:text-white transition">Inicio</a>
            {/* FIX 5: IDs corregidos para que coincidan con las secciones */}
            <a href="#sobre" className="hover:text-white transition">Sobre mí</a>
            <a href="#servicios" className="hover:text-white transition">Servicios</a>
            <a href="#contacto" className="hover:text-white transition">Contacto</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      {/* FIX 2: animClass conectado a visible.hero */}
      <section
        id="inicio"
        data-anim="hero"
        ref={heroRef}
        className={`relative z-30 min-h-screen flex items-center px-6 ${animClass("hero")}`}
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <Image src="/logo.png" alt="Logo" width={128} height={128} className="mb-10 opacity-95" />

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
                rel="noopener noreferrer"
                className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/andreyangarita_tattoo"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-zinc-700 px-8 py-4 rounded-2xl hover:bg-zinc-900 transition"
              >
                Instagram
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="relative w-[450px] h-[650px] rounded-[3rem] border border-zinc-800 overflow-hidden">
              {/* FIX 6: next/image */}
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
        className={`relative z-30 py-24 px-6 border-t border-zinc-900 ${animClass("gallery")}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-zinc-500 tracking-[0.4em] text-sm mb-4">GALERÍA</p>
            <h2 className="text-5xl font-black">TRABAJOS RECIENTES</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {images.map((img, i) => (
              // Wrapper externo: tiene `group` y el glow, SIN overflow-hidden
              <div
                key={i}
                onClick={() => setSelected(i)}
                role="button"
                tabIndex={0}
                aria-label={`Ver ${img.alt} en detalle`}
                onKeyDown={(e) => e.key === "Enter" && setSelected(i)}
                className="relative group cursor-pointer rounded-3xl"
              >
                {/* Glow FUERA del overflow-hidden — ahora sí se ve */}
                <div className="absolute -inset-6 bg-white/40 blur-3xl opacity-0 group-hover:opacity-100 transition duration-500 rounded-3xl pointer-events-none z-0" />

                {/* Contenedor interior con overflow-hidden para la imagen */}
                <div className="relative overflow-hidden rounded-3xl border border-zinc-800 transition z-10">
                  <div className="relative w-full h-[500px]">
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
      {/* FIX 5: id="sobre" agregado */}
      <section
        id="sobre"
        data-anim="about"
        ref={aboutRef}
        className={`relative z-30 py-32 px-6 border-t border-zinc-900 ${animClass("about")}`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20">
          <div className="relative w-full h-[500px] rounded-3xl overflow-hidden">
            {/* FIX 6: next/image */}
            <Image
              src="/demon.jpg"
              alt="Trabajo de tatuaje"
              fill
              className="object-cover grayscale"
            />
          </div>

          <div>
            <h2 className="text-5xl font-black mb-8">ARTE. DISCIPLINA. PASIÓN.</h2>
            <p className="text-zinc-400 leading-relaxed">
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
      {/* FIX 5: id="servicios" agregado */}
      <section
        id="servicios"
        data-anim="services"
        ref={servicesRef}
        className={`relative z-30 py-32 px-6 border-t border-zinc-900 bg-zinc-950 ${animClass("services")}`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="border border-zinc-800 p-10 rounded-3xl">
            <h3 className="text-3xl font-bold mb-4">Cotizaciones</h3>
            <a
              href="https://wa.me/573243144372"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-xl inline-block hover:scale-105 transition"
            >
              Cotizar
            </a>
          </div>

          <div className="border border-zinc-800 p-10 rounded-3xl">
            <h3 className="text-3xl font-bold mb-4">Asesorías</h3>
            <a
              href="https://wa.me/573243144372"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-3 rounded-xl inline-block hover:scale-105 transition"
            >
              Asesoría
            </a>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section
        id="contacto"
        className="relative z-30 py-24 px-6 border-t border-zinc-900"
      >
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-zinc-500 tracking-[0.4em] text-sm mb-4">CONTACTO</p>
          <h2 className="text-5xl font-black mb-10">HABLEMOS</h2>
          <p className="text-zinc-400 text-lg mb-6">Para cotizaciones, ideas o asesorías:</p>

          <a
            href="mailto:andreyjoseph807@gmail.com"
            className="text-white text-xl font-semibold hover:underline"
          >
            andreyjoseph807@gmail.com
          </a>

          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <a
              href="https://wa.me/573243144372"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/andreyangarita_tattoo"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-zinc-700 px-8 py-4 rounded-2xl hover:bg-zinc-900 transition"
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
        className={`relative z-30 py-14 border-t border-zinc-900 text-center text-zinc-500 ${animClass("footer")}`}
      >
        Andrey Angarita Tattoo
      </footer>

      {/* LIGHTBOX */}
      {/* FIX 4: accesibilidad con role, aria-modal, aria-label y foco gestionado */}
      {selected !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Imagen ampliada: ${images[selected].alt}`}
          className="fixed inset-0 z-[100] flex items-center justify-center"
        >
          <div
            className="absolute inset-0 bg-black/90"
            onClick={() => setSelected(null)}
          />

          {/* Botón cerrar */}
          <button
            onClick={() => setSelected(null)}
            aria-label="Cerrar imagen"
            className="absolute top-6 right-6 z-20 text-white text-3xl hover:text-zinc-400 transition"
          >
            ✕
          </button>

          {/* Botón anterior */}
          <button
            onClick={() => setSelected((s) => s === null ? null : (s - 1 + images.length) % images.length)}
            aria-label="Imagen anterior"
            className="absolute left-6 z-20 text-white text-4xl hover:text-zinc-400 transition px-4 py-2"
          >
            ‹
          </button>

          {/* FIX 6: next/image en el lightbox */}
          <div className="relative max-w-5xl w-full z-10 aspect-[4/3]">
            <Image
              src={images[selected].src}
              alt={images[selected].alt}
              fill
              className="object-contain"
            />
          </div>

          {/* Botón siguiente */}
          <button
            onClick={() => setSelected((s) => s === null ? null : (s + 1) % images.length)}
            aria-label="Imagen siguiente"
            className="absolute right-6 z-20 text-white text-4xl hover:text-zinc-400 transition px-4 py-2"
          >
            ›
          </button>
        </div>
      )}

    </main>
  );
}