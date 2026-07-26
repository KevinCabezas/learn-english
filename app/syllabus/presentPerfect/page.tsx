'use client';

import { useEffect, useState } from "react";
import { generateTemaPrompt } from "@/app/ai/promptTema";
import { GrammarTopicResponse } from "@/app/types/topic";


export default function PresentPerfect() {

  const [response, setResponse] = useState<GrammarTopicResponse | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("tema");

    if (saved) {
      setResponse(JSON.parse(saved));
    }

  }, []);

  async function enviar() {

    const prompt = generateTemaPrompt('present perfect')
    const res = await fetch("../api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data: GrammarTopicResponse = await res.json();
    // const data = await res.json();

    localStorage.setItem("tema", JSON.stringify(data));

    setResponse(data);
  }

  return (
    <main className="mt-15 p-5 lg:mt-0 lg:pl-10 lg:pb-10 lg:pt-5 lg:pr-15 transition-all duration-300">
      <h1>Present Perfect</h1>
      <div className="flex flex-col h-full w-full gap-3">
        <span>{response?.topic}</span>
        <span>{response?.title}</span>
        <span>{response?.introduction.whatIsIt}</span>
        <span>{response?.introduction.mainUse}</span>
        <span>{response?.introduction.simpleExplanation}</span>
        <span>{response?.affirmative.structure}</span>
        {response?.affirmative.examples.map((e, i) => (

          <div key={i} className="flex flex-col">

            <span>{e.english}</span>
            <span>{e.spanish}</span>
            <span>{e.explanation}</span>
          </div>
        )

        )}
  


      </div>
      <div>
        <button
          onClick={() => enviar()}
          className="py-1 px-2 rounded-lg bg-neutral-800 text-white "
        >
          Ver explicacion
        </button>
      </div>
    </main>
  )
}