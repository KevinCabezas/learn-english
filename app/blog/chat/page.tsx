"use client";

import { useState } from "react";
import { generateReadingPrompt } from "@/app/ai/prompts";
import ReadingOptions from "@/app/components/ReadingOptions";

type Reading = {
  title: string;
  text: string;
  questions: string[];
}

export default function ChatPage() {
  const [level, setLevel] = useState<"easy" | "medium" | "hard">("easy");

  const [tense, setTense] = useState("Present Simple");

  const [topic, setTopic] = useState("Daily Life");

  const [respuesta, setRespuesta] = useState<Reading | null>(null);

  async function enviar() {
    const prompt = generateReadingPrompt(
      level,
      tense,
      topic
    );

    const res = await fetch("../api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    setRespuesta(data);
  }

  return (
    <div className="p-5">
      <h1 className="font-semibold text-xl text-gray-700">Comprension lectora</h1>

      <p className="mt-2 text-sm text-gray-500/90">
        En esta sección podrás generar textos en inglés adaptados a tu nivel de dificultad, el tiempo verbal que desees practicar 
        y el tema que más te interese.
      </p>
      <ReadingOptions
        level={level}
        setLevel={setLevel}
        tense={tense}
        setTense={setTense}
        topic={topic}
        setTopic={setTopic}
      />

      <button
        onClick={enviar}
        className="mt-5 px-3 py-1 rounded font-semibold bg-emerald-400 text-white "
      >
        Generar texto
      </button>

      {respuesta && (
        <>

          <div className="mt-5 bg-white p-5 rounded-lg border text-gray-700 border-gray-200">
            <h2 className="text-lg font-semibold">
              {respuesta.title}
            </h2>

            <p className="mt-4 whitespace-pre-line">
              {respuesta.text}
            </p>

          </div>
          <div className="mt-3 bg-white p-5 rounded-lg border text-gray-700 border-gray-200">


            <h3 className=" font-semibold text-emerald-400 ">
              Questions
            </h3>

            <ol className="list-decimal ml-6 mt-2">
              {respuesta.questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ol>
            <button className="mt-5 px-3 py-1 rounded font-semibold bg-emerald-400 text-white">
              Responder
            </button>
          </div>
        </>

      )}
      {/* <div className="mt-10 bg-white p-5 rounded border border-gray-200">
        {respuesta
        }
      </div> */}

    </div>
  );
}