'use client';

// import { useEffect, useState } from "react";
// import { generateTemaPrompt } from "@/app/ai/promptTema";
import { GrammarTopicResponse } from "@/app/types/topic";

type TTopicBoard = {
  response: GrammarTopicResponse | null;
}
export default function TopicBoard({ response }: TTopicBoard) {

  return (
    <section className="mt-10">
      {/* <h1>Present Perfect</h1> */}
      <h1 className="uppercase ">{response?.topic}</h1>
      <div className="flex flex-col h-full w-full gap-3">
        <span>{response?.title}</span>
        <span>{response?.introduction?.whatIsIt}</span>
        <span>{response?.introduction?.mainUse}</span>
        <span>{response?.introduction?.simpleExplanation}</span>
        <span>{response?.affirmative?.structure}</span>
        {response?.affirmative?.examples.map((e, i) => (

          <div key={i} className="flex flex-col">

            <span>{e.english}</span>
            <span>{e.spanish}</span>
            <span>{e.explanation}</span>
          </div>
        )

        )}



      </div>
      {/* <div>
        <button
          onClick={send}
          className="py-1 px-2 rounded-lg bg-neutral-800 text-white "
        >
          Ver explicacion
        </button>
      </div> */}
    </section>
  )
}