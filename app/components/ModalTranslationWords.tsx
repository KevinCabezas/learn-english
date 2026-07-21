"use client";

import { get } from "http";
import { useEffect, useState } from "react";
import { generateTranslateWordsPrompt } from "../ai/promptTranslate";
import { Icon } from "@iconify/react";

type Props = {
  listWords: string[];
  onClose: () => void;
}

type Word = {
  word: string;
  translation: string;
};

type TWordTranslate = {
  title: string;
  words: Word[];
};

export default function ModalTranslationWords({ listWords, onClose }: Props) {

  // const [lista, setLista] = useState([]);
  const [data, setData] = useState<TWordTranslate | null>(null);

  async function enviar() {
    localStorage.removeItem("text_lighter");
    const prompt = generateTranslateWordsPrompt(listWords);

    const res = await fetch("../api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    // const data = await res.json();

    // localStorage.setItem("text_english", JSON.stringify(data));
    const dataRes = await res.json();
    // console.log(dataRes)
    setData(dataRes);
  }

  useEffect(() => {
    // console.log('hola')

    enviar()
    // console.log(data)
  }, [])

  return (
    <div className="right-0 bottom-0 fixed z-50 h-50 min-w-100 m-7 p-5 transition-all duration-300 overflow-y-auto rounded-2xl border shadow-2xl border-emerald-300 bg-emerald-50">
      <div className="bg-ambe-200 flex justify-end">
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white duration-200 transition-all"
        >
          <Icon icon={"mingcute:close-line"} className=""></Icon>
        </button>
      </div>
      <h3 className="mb-3 font-semibold text-gray-800">Palabras traducidas</h3>
  
      {data?.words.map((e, i) => (
        <div key={i} className="grid grid-cols-2 pt-2 border-b border-gray-200 text-sm">
            <span className="">{`${i+1}- ${e.word}`}</span>
            <span className="">{e.translation}</span>
        </div>
      ))}
    </div>
  )

}