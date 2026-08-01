"use client";

import { useState, useEffect, useRef } from "react";
import { generateReadingPrompt } from "@/app/ai/promptsText";
import ReadingOptions from "@/app/components/readingComprehesion/ReadingOptions";
import TextHighlighter from "@/app/components/readingComprehesion/TextHighLighter";
import ModalTranslationWords from "@/app/components/ModalTranslationWords";
import { Icon } from "@iconify/react";
import Questions from "@/app/components/readingComprehesion/Questions";
import FeedbackQuestions from "@/app/components/readingComprehesion/FeedbackQuestions";

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
  const [showFeedback, setShowFeedback] = useState(false);
  const [showQuestion, setShowQuestion] = useState(true);
  const [listWord, setListWord] = useState<string[]>([]);


  useEffect(() => {
    const saved = localStorage.getItem("text_english");

    if (saved) {
      setRespuesta(JSON.parse(saved));
    }

    const savedWords = localStorage.getItem("onlyWords");

    if (savedWords) {
      setListWord(JSON.parse(savedWords));
    }
  }, []);


  const addWord = (word: string) => {
    setListWord((prev) => {
      if (prev.includes(word)) {
        return prev;
      }

      const newList = [...prev, word];

      localStorage.setItem(
        "onlyWords",
        JSON.stringify(newList)
      );

      return newList;
    });
  };

  const removeWord = (word: string) => {
    setListWord((prev) => {
      const newList = prev.filter(
        (item) => item !== word
      );

      localStorage.setItem(
        "onlyWords",
        JSON.stringify(newList)
      );

      return newList;
    });
  };


  async function enviar() {
    localStorage.removeItem("highlights");
    localStorage.removeItem("onlyWords");
    localStorage.removeItem('feedback')
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
    setShowFeedback(false);
    setShowQuestion(true);
  }

  return (
    <main className="mt-15 p-5 lg:mt-0 lg:pl-10 lg:pb-10 lg:pt-5 lg:pr-15 transition-all duration-300">
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
        className="group flex items-center gap-1 mt-5 px-4 py-1.5 rounded-xl font-semibold bg-emerald-400 text-white hover:bg-neutral-800 transition-all duration-300 "
      >
        Generar texto
        <Icon icon={"oui:generate"} className="text-xl group-hover:text-emerald-400" />
      </button>

      {respuesta && (
        <>
          <div className="mt-5 bg-white lg:p-8 p-3 rounded-3xl border text-gray-700 lg:border-l-5 border-l-emerald-400 border-gray-200">
            <h2 className="text-lg font-semibold">
              {respuesta.title}
            </h2>
            <TextHighlighter
              // key={crypto.randomUUID()}
              text={respuesta.text}
              addWord={addWord}
              removeWord={removeWord}
            // removeWord={removeWord}
            ></TextHighlighter>
          </div>
          <Questions text={respuesta.text} questions={respuesta.questions} onChange={(value) => setShowFeedback(value)} showQuestion={showQuestion} ></Questions> 
          {showFeedback && (
            <FeedbackQuestions />
          )}
        </>
      )}
      {openModal &&
        <ModalTranslationWords
          listWords={listWord}
          onClose={() => setOpenModal(false)} />
      }
      {!openModal &&
        <button
          onClick={() => setOpenModal(true)}
          className="fixed right-0 bottom-0 z- m-7 px-3 py-3 text-center border-2 border-purple-200 rounded-full text-xs shadow-2xl bg-purple-400 text-white"
        >
          <Icon icon={"fluent:apps-list-32-filled"} className="text-xl" />
        </button>
      }
    </main>
  );
}