"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ⚠️ Reemplaza estos valores con los de tu proyecto en supabase.com
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Resena {
  id: string;
  nombre: string;
  estrellas: number;
  comentario: string;
  created_at: string;
}

function Stars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          onClick={() => onChange?.(s)}
          className={`text-2xl transition ${
            s <= value ? "text-white" : "text-zinc-700"
          } ${onChange ? "hover:text-zinc-300 cursor-pointer" : "cursor-default"}`}
          aria-label={`${s} estrella${s > 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [estrellas, setEstrellas] = useState(5);
  const [comentario, setComentario] = useState("");

  const fetchResenas = async () => {
    const { data, error } = await supabase
      .from("resenas")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setResenas(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchResenas();
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!nombre.trim()) return setError("Escribe tu nombre.");
    if (!comentario.trim()) return setError("Escribe un comentario.");

    setSending(true);
    const { error: insertError } = await supabase
      .from("resenas")
      .insert({ nombre: nombre.trim(), estrellas, comentario: comentario.trim() });

    if (insertError) {
      setError("Hubo un error al enviar. Intenta de nuevo.");
    } else {
      setSuccess(true);
      setNombre("");
      setEstrellas(5);
      setComentario("");
      fetchResenas();
      setTimeout(() => setSuccess(false), 4000);
    }
    setSending(false);
  };

  return (
    <section className="relative z-30 py-16 sm:py-24 px-4 sm:px-6 border-t border-zinc-900">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="text-zinc-500 tracking-[0.4em] text-xs sm:text-sm mb-4">CLIENTES</p>
          <h2 className="text-3xl sm:text-5xl font-black">RESEÑAS</h2>
        </div>

        {/* Formulario */}
        <div className="border border-zinc-800 rounded-3xl p-6 sm:p-10 mb-12 bg-zinc-950">
          <h3 className="text-xl font-bold mb-6">Deja tu reseña</h3>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              maxLength={50}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition text-sm sm:text-base"
            />

            <div className="flex flex-col gap-2">
              <span className="text-zinc-500 text-sm">Calificación</span>
              <Stars value={estrellas} onChange={setEstrellas} />
            </div>

            <textarea
              placeholder="Cuéntanos tu experiencia..."
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              maxLength={300}
              rows={4}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 transition resize-none text-sm sm:text-base"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {success && <p className="text-green-400 text-sm">¡Gracias por tu reseña!</p>}

            <button
              onClick={handleSubmit}
              disabled={sending}
              className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50 disabled:scale-100 self-start"
            >
              {sending ? "Enviando..." : "Publicar reseña"}
            </button>
          </div>
        </div>

        {/* Lista de reseñas */}
        {loading ? (
          <p className="text-zinc-600 text-center">Cargando reseñas...</p>
        ) : resenas.length === 0 ? (
          <p className="text-zinc-600 text-center">Sé el primero en dejar una reseña.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {resenas.map((r) => (
              <div
                key={r.id}
                className="border border-zinc-800 rounded-3xl p-6 bg-zinc-950 flex flex-col gap-3"
              >
                <Stars value={r.estrellas} />
                <p className="text-zinc-300 text-sm leading-relaxed">{r.comentario}</p>
                <p className="text-zinc-600 text-xs font-semibold mt-auto">— {r.nombre}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
