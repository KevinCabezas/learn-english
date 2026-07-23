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
  const [listWord, setListWord] = useState([]);

  async function enviar() {
    localStorage.removeItem("text_lighter");
    const prompt = generateTranslateWordsPrompt(listWords);
    console.log(listWords)
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

  // useEffect(() => {
  //   // console.log('hola')
  //   const getListWords = localStorage.getItem('onlyWords');

  //   if (getListWords) {

  //     setListWord(JSON.parse(getListWords))
  //   }
  //   // enviar()
  //   // console.log(data)

  // }, [])

  const handlerTraslate = () => {
    enviar();
  }
  return (
    <div className="right-0 bottom-0 fixed z-50 h-70 min-w-120 m-7 p-5 flex flex-col transition-all duration-300 overflow-y-auto rounded-2xl border shadow-2xl border-purple-300 bg-purple-50">
      <div className="bg-ambe-200 flex justify-end">
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white duration-200 transition-all"
        >
          <Icon icon={"mingcute:close-line"} className="text-purple-400"></Icon>
        </button>
      </div>
      <div className="flex flex-col flex-1 justify-between bg-yelow-200">

        <h3 className="mb-3 font-semibold text-gray-700">Palabras selecionadas</h3>

        <div className="flex flex-col">
          {listWords.map((e, i) => (
            <span key={i}>{e}</span>
          ))}
        </div>
        {data?.words.map((e, i) => (
          <div key={i} className="grid grid-cols-2 pt-2 border-b border-gray-200 text-sm">
            <span className="">{`${i + 1}- ${e.word}`}</span>
            <span className="">{e.translation}</span>
          </div>
        ))}

        <div className="mt-10">
          <button
            onClick={handlerTraslate}
            className="flex items-center gap-2 py-0.5 px-2 rounded-lg text-sm bg-neutral-800 text-white hover:bg-emerald-400 transition-all duration-300"

          >
            Traducir
            <Icon icon={'ri:translate-ai-2'} className=""></Icon>
          </button>
        </div>
      </div>
    </div>
  )

}