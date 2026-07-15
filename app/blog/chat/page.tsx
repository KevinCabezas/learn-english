"use client";

import { useState, useEffect } from "react";
import { generateReadingPrompt } from "@/app/ai/promptsText";
import ReadingOptions from "@/app/components/ReadingOptions";
import TextHighlighter from "@/app/components/TextHighLighter";
import ModalTranslationWords from "@/app/components/ModalTranslationWords";
import { Icon } from "@iconify/react";

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
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("text_english");

    if (saved) {
      setRespuesta(JSON.parse(saved));
    }
  }, []);


  async function enviar() {
    localStorage.removeItem("text_lighter");
    const prompt = generateReadingPrompt(level, tense, topic);

    const res = await fetch("../api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    localStorage.setItem("text_english", JSON.stringify(data));

    setRespuesta(data);
  }

  return (
    <div className="mt-15 p-5 lg:mt-0 lg:pl-10 lg:pb-10 lg:pt-5 lg:pr-15 transition-all duration-300">
      <div className="flex items-centerh-fit gap-2">
        <h1 className="font-semibold text-xl text-gray-700">Comprension lectora</h1>
        <button className="text-center">
          <Icon icon={"mingcute:question-line"} className="text-xl text-emerald-400" />
        </button>
      </div>

      <p className="mt-2 lg:flex hidden text-sm text-gray-500/90">
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
        className=" flex items-center gap-1 mt-5 px-3 py-1 rounded-lg font-semibold bg-emerald-400 text-white "
      >
        <Icon icon={"oui:generate"} className="text-xl" />
        Generar texto
      </button>

      {respuesta && (
        <>
          <div className="mt-5 bg-white lg:p-8 p-3 rounded-3xl border text-gray-700 lg:border-l-5 border-l-emerald-400 border-gray-200">
            <h2 className="text-lg font-semibold">
              {respuesta.title}
            </h2>
            <TextHighlighter key={crypto.randomUUID()} text={respuesta.text} storageKey="text_lighter"></TextHighlighter>
          </div>

          <div className="mt-3 bg-white lg:p-8 p-5 rounded-3xl border text-gray-700 lg:border-l-5 border-l-emerald-400 border-gray-200">
            <h3 className=" font-semibold text-emerald-400 ">
              Questions
            </h3>
            <ol className="list-decimal ml-6 mt-2">
              {respuesta.questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ol>
            <button className="mt-5 px-3 py-1 rounded-xl font-semibold bg-emerald-400 text-white">
              Responder
            </button>
          </div>
        </>
      )}
      {openModal &&
        <ModalTranslationWords listWords={['dressed', 'aple', 'then']} onClose={() => setOpenModal(false)} />
      }
      {!openModal &&
        <button
          onClick={() => setOpenModal(true)}
          className="fixed right-0 bottom-0 z- m-7 px-3 py-3 text-center border-2 border-emerald-200 rounded-full text-xs shadow-2xl bg-emerald-500 text-white"
        >
          <Icon icon={"fluent:apps-list-32-filled"} className="text-xl" />
        </button>
      }
    </div>
  );
}