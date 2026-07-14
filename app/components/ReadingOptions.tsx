"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

type Props = {
  level: "easy" | "medium" | "hard";
  setLevel: React.Dispatch<React.SetStateAction<"easy" | "medium" | "hard">>;
  tense: string;
  setTense: React.Dispatch<React.SetStateAction<string>>;
  topic: string;
  setTopic: React.Dispatch<React.SetStateAction<string>>;
};

export default function ReadingOptions({ level, setLevel, tense, setTense, topic,setTopic, }: Props) {
  // Estados para controlar qué menú está abierto
  const [openDropdown, setOpenDropdown] = useState<"level" | "tense" | "topic" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar cualquier menú si el usuario hace click afuera
  useEffect(() => {
    const clickAfuera = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", clickAfuera);
    return () => document.removeEventListener("mousedown", clickAfuera);
  }, []);

  const toggleDropdown = (name: "level" | "tense" | "topic") => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  // Mapeo para mostrar los nombres legibles del nivel
  const levelLabels = { easy: "Fácil", medium: "Medio", hard: "Difícil" };

  const tenses = ["Present Simple", "Past Simple", "Present Continuous", "Present Perfect", "Future Simple"];
  const topics = ["Daily Life", "Travel", "Technology", "Food", "Health", "Sports", "Education", "Programming"];

  return (
    <div ref={containerRef} className="flex gap-6 mt-3">
      {/* 1. SELECT DE NIVEL */}
      <div className="relative w-40">
        <span className="block mb-2 text-sm font-medium uppercase text-gray-400">Nivel</span>
        
        {/* Botón principal */}
        <button
          onClick={() => toggleDropdown("level")}
          className="options"
        >
          {levelLabels[level]}
          <Icon icon={`${openDropdown === 'level' ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'}`} />
          {/* <span className="text-xs">▼</span> */}
        </button>

        {/* LISTA DESPLEGADA (AQUÍ CAMBIÁS EL COLOR DE LA CAJA) */}
        {openDropdown === "level" && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl p-1">
            {(["easy", "medium", "hard"] as const).map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setLevel(item);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors
                    ${level === item 
                      ? "bg-emerald-300 text-gray-700 font-semibold" // Color si está seleccionado
                      : "text-gray-900 hover:bg-emerald-100 hover:text-gray-700"    // Color normal y hover
                    }`}
                >
                  {levelLabels[item]}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 2. SELECT DE TIEMPO VERBAL */}
      <div className="relative w-48">
        <span className="block mb-2 text-sm uppercase font-medium text-gray-400">Tiempo verbal</span>
        
        {/* Botón principal */}
        <button
          onClick={() => toggleDropdown("tense")}
          className="options"
        >
          {tense || "Seleccionar"}
          <Icon icon={`${openDropdown === 'tense' ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'}`} />
        </button>

        {/* LISTA DESPLEGADA (AQUÍ CAMBIÁS EL COLOR DE LA CAJA) */}
        {openDropdown === "tense" && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-1 max-h-60 overflow-y-auto">
            {tenses.map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setTense(item);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors
                    ${tense === item 
                       ? "bg-emerald-300 text-gray-700 font-semibold" // Color si está seleccionado
                      : "text-gray-900 hover:bg-emerald-100 hover:text-gray-700"    // Color normal y hover
                    }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 3. SELECT DE TEMA */}
      <div className=" relative w-44">
        <span className="block mb-2 text-sm uppercase font-medium text-gray-400">Tema</span>
        
        {/* Botón principal */}
        <button
          onClick={() => toggleDropdown("topic")}
          className="options"
        >
          {topic || "Seleccionar"}
          <Icon icon={`${openDropdown === "topic" ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'}`} />
        </button>

        {/* LISTA DESPLEGADA (AQUÍ CAMBIÁS EL COLOR DE LA CAJA) */}
        {openDropdown === "topic" && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg p-1">
            {topics.map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setTopic(item);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-sm rounded-lg transition-colors
                    ${topic === item 
                     ? "bg-emerald-300 text-gray-700 font-semibold" // Color si está seleccionado
                      : "text-gray-900 hover:bg-emerald-100 hover:text-gray-700"    // Color normal y hover
                    }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
