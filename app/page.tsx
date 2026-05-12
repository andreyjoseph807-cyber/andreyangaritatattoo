"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [selected, setSelected] = useState<number | null>(null);
  const [visible, setVisible] = useState<Record<string, boolean>>({});

  const refs = {
    hero: useRef(null),
    gallery: useRef(null),
    about: useRef(null),
    services: useRef(null),
    footer: useRef(null),
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
  });

  // 🍏 APPLE STYLE SCROLL ANIMATIONS
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
      {
        threshold: 0.15,
      }
    );

    Object.values(refs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <div className="flex items-center gap-4">
            {/* ✅ LOGO REAL */}
            <img
              src="/logo.png"
              alt="Logo"
              className="w-10 h-10 object-contain"
            />

            <h1 className="tracking-[0.3em] text-sm font-semibold">
              ANDREY ANGARITA TATTOO
            </h1>
          </div>

          <div className="hidden md:flex gap-8 text-sm text-zinc-400">
            <a href="#inicio" className="hover:text-white transition">
              Inicio
            </a>

            <a href="#sobre" className="hover:text-white transition">
              Sobre mí
            </a>

            <a href="#servicios" className="hover:text-white transition">
              Servicios
            </a>

            <a href="#contacto" className="hover:text-white transition">
              Contacto
            </a>
          </div>

        </div>
      </nav>

      {/* HERO */}
      <section
        id="inicio"
        data-anim="hero"
        ref={refs.hero}
        className={`relative z-10 min-h-screen flex items-center px-6 transition-all duration-1000 ${
          visible.hero
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black opacity-90" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">

          <div>

            {/* ✅ AQUÍ VA EL LOGO, NO LA FOTO */}
            <img
              src="/logo.png"
              alt="Logo"
              className="w-32 mb-10 opacity-95"
            />

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
              Cada diseño cuenta una historia.
              Creamos piezas únicas con identidad, composición y estética profesional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">

              <a
                href="https://wa.me/573243144372"
                target="_blank"
                className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition-all duration-300"
              >
                WhatsApp
              </a>

              <a
                href="https://www.instagram.com/andreyangarita_tattoo?igsh=MW93OG1wcThwZHUzOA%3D%3D&utm_source=qr"
                target="_blank"
                className="border border-zinc-700 px-8 py-4 rounded-2xl hover:bg-zinc-900 transition-all duration-300"
              >
                Instagram
              </a>

            </div>

          </div>

          {/* ✅ FOTO GRANDE DEL HERO */}
          <div className="hidden md:flex justify-center">
            <div className="w-[450px] h-[650px] rounded-[3rem] border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">

              <img
                src="/yo-tattoo.jpg"
                alt="Yo Tattoo"
                className="w-full h-full object-cover grayscale"
              />

            </div>
          </div>

        </div>
      </section>

      {/* GALERÍA */}
      <section
        data-anim="gallery"
        ref={refs.gallery}
        className={`relative z-10 py-24 px-6 border-t border-zinc-900 transition-all duration-1000 ${
          visible.gallery
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-7xl mx-auto">

          <div className="mb-16 text-center">

            <p className="text-zinc-500 tracking-[0.4em] text-sm mb-4">
              GALERÍA
            </p>

            <h2 className="text-5xl font-black">
              TRABAJOS
              <br />
              RECIENTES
            </h2>

          </div>

          {/* ✅ GRID LIMPIO */}
          <div className="grid md:grid-cols-3 gap-6">

            {images.map((img, i) => (
              <div
                key={i}
                onClick={() => setSelected(i)}
                className="relative overflow-hidden rounded-3xl border border-zinc-800 group cursor-pointer transition-all duration-500 hover:border-white/40"
              >

                {/* glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white/5 blur-2xl" />

                {/* light sweep */}
                <div className="absolute -inset-10 opacity-0 group-hover:opacity-20 transition-all duration-700 bg-gradient-to-r from-transparent via-white to-transparent rotate-12" />

                <img
                  src={img.src}
                  alt={img.alt}
                  className="relative w-full h-[500px] object-cover grayscale group-hover:scale-105 transition-all duration-500"
                />

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* SOBRE */}
      <section
        id="sobre"
        data-anim="about"
        ref={refs.about}
        className={`relative z-10 py-32 px-6 border-t border-zinc-900 transition-all duration-1000 ${
          visible.about
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          <div>

            {/* ✅ EXISTE COMO JPG */}
            <img
              src="/demon.jpg"
              alt="Tattoo artist"
              className="rounded-[2rem] border border-zinc-800 grayscale"
            />

          </div>

          <div>

            <p className="text-zinc-500 tracking-[0.4em] text-sm mb-4">
              SOBRE MÍ
            </p>

            <h2 className="text-5xl font-black mb-8">
              ARTE.
              <br />
              DISCIPLINA.
              <br />
              PASIÓN.
            </h2>

            <p className="text-zinc-400 leading-relaxed text-lg mb-8">
              Soy Andrey Angarita, tatuador especializado en blackwork,
              fine line y composición conceptual. Conmigo vas a encontrar un espacio de conifianza, donde podrás expresar tu idea y juntos crear un diseño único, con identidad y estetica profesional. Cada tatuaje es una obra de arte que muestra una huistoria, listo para hacer visible tu historia?
            </p>

            <a
              href="mailto:Andreyjoseph807@gmail.com"
              className="inline-block border border-zinc-700 px-8 py-4 rounded-2xl hover:bg-zinc-900 transition-all duration-300"
            >
              Contactarme
            </a>

          </div>

        </div>
      </section>

      {/* SERVICIOS */}
      <section
        id="servicios"
        data-anim="services"
        ref={refs.services}
        className={`relative z-10 py-32 px-6 border-t border-zinc-900 bg-zinc-950 transition-all duration-1000 ${
          visible.services
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-20">

            <p className="text-zinc-500 tracking-[0.4em] text-sm mb-4">
              SERVICIOS
            </p>

            <h2 className="text-5xl font-black">
              ¿CÓMO PUEDO
              <br />
              AYUDARTE?
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="border border-zinc-800 rounded-[2rem] p-10 hover:border-white transition-all duration-300">

              <h3 className="text-3xl font-bold mb-6">
                Cotizaciones
              </h3>

              <p className="text-zinc-400 mb-10 leading-relaxed">
                Cuéntame tu idea y recibe una cotización personalizada.
              </p>

              <a
                href="https://wa.me/573243144372"
                target="_blank"
                className="bg-white text-black px-8 py-4 rounded-2xl inline-block font-semibold hover:scale-105 transition-all duration-300"
              >
                Cotizar ahora
              </a>

            </div>

            <div className="border border-zinc-800 rounded-[2rem] p-10 hover:border-white transition-all duration-300">

              <h3 className="text-3xl font-bold mb-6">
                Asesorías
              </h3>

              <p className="text-zinc-400 mb-10 leading-relaxed">
                Te ayudo a construir el concepto perfecto para tu tatuaje.
              </p>

              <a
                href="https://wa.me/573243144372"
                target="_blank"
                className="bg-white text-black px-8 py-4 rounded-2xl inline-block font-semibold hover:scale-105 transition-all duration-300"
              >
                Solicitar asesoría
              </a>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contacto"
        data-anim="footer"
        ref={refs.footer}
        className={`relative z-10 border-t border-zinc-900 py-14 px-6 transition-all duration-1000 ${
          visible.footer
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10 items-center">

          <div>
            <img
              src="/logo.png"
              alt="Logo"
              className="w-20 mb-4 opacity-80"
            />

            <p className="text-zinc-500">
              Andrey Angarita Tattoo
            </p>
          </div>

          <div className="text-zinc-500 text-center md:text-right">
            <p>Andreyjoseph807@gmail.com</p>
            <p className="mt-2">andreyangaritatattoo.com</p>
          </div>

        </div>
      </footer>

      {/* LIGHTBOX */}
      {selected !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            onClick={closeModal}
          />

          {/* IMAGE */}
          <div className="relative z-10 max-w-5xl w-full px-6">

            <img
              src={images[selected].src}
              alt={images[selected].alt}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />

            {/* CONTROLS */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl"
            >
              ›
            </button>

            {/* CLOSE */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>

          </div>

        </div>
      )}

    </main>
  );
}