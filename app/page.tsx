export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white overflow-hidden">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/60 backdrop-blur border-b border-zinc-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          
          <div className="flex items-center gap-4">
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
        className="relative min-h-screen flex items-center px-6"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black opacity-90" />

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">

          <div>

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

          <div className="hidden md:flex justify-center">
            <div className="w-[450px] h-[650px] rounded-[3rem] border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542727365-19732a80dcfd?q=80&w=1200&auto=format&fit=crop"
                alt="Tattoo"
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <section
        id="sobre"
        className="py-32 px-6 border-t border-zinc-900"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

          <div>
            <img
              src="https://images.unsplash.com/photo-1598371839696-5c5bb00bdc28?q=80&w=1200&auto=format&fit=crop"
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
              fine line y composición conceptual.
              Mi enfoque es crear piezas que conecten visual y emocionalmente
              con cada cliente.
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
        className="py-32 px-6 border-t border-zinc-900 bg-zinc-950"
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
        className="border-t border-zinc-900 py-14 px-6"
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

            <p className="mt-2">
              andreyangaritatattoo.com
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}