'use client'
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const InitText = [
    "hooolap",
    "me pinto hacerte un detallito digital",
    "porque me gustas vos y la programacion je",
    "espero te guste",
    "te amu"
  ];

  const [paso, setPaso] = useState(0);
  const [mostrarTexto, setMostrarTexto] = useState(true);
  const [mostrarLink, setMostrarLink] = useState(false);

  const avanzar = () => {
    if (paso < InitText.length - 1) {
      setPaso(paso + 1);
    }
  };

  const retroceder = () => {
    if (paso > 0) {
      setPaso(paso - 1);
      setMostrarTexto(true);
      setMostrarLink(false);
    }
  };

  useEffect(() => {
    if (paso === InitText.length - 1) {
      const timer = setTimeout(() => {
        setMostrarTexto(false);
        setTimeout(() => {
          setMostrarLink(true);
        }, 500); // Espera 0.5s después de desaparecer el texto
      }, 1000); // 1s después de mostrar última frase
      return () => clearTimeout(timer);
    } else {
      setMostrarTexto(true);
      setMostrarLink(false);
    }
  }, [paso]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <AnimatePresence mode="wait">
        {mostrarTexto && (
          <motion.p
            key={paso}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-2xl mb-4"
          >
            {InitText[paso]}
          </motion.p>
        )}
      </AnimatePresence>

      {paso < InitText.length - 1 && (
        <div className="flex gap-5 mt-5">
          <button
            onClick={retroceder}
            className="px-4 py-2 bg-white rounded-full text-black hover:text-white hover:bg-black transition-all duration-200 cursor-pointer"
          >
            Retroceder
          </button>
          <button
            onClick={avanzar}
            className="px-4 py-2 bg-white rounded-full text-black hover:text-white hover:bg-black transition-all duration-200 cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      )}

      <AnimatePresence>
        {mostrarLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-8"
          >
            <Link
              href="/flower"
              className="text-lg px-6 py-3 bg-pink-500 text-white rounded-full shadow-md hover:bg-pink-600 transition-all duration-300"
            >
              🌸 Ver tu flor especial
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
