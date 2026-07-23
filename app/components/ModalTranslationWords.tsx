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
    console.log(listWords.length)
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
    console.log(listWords.length)
    enviar();
  }
  return (
    <div className="right-0 bottom-0 fixed z-50 h-fit min-w-120 m-7 p-5 flex flex-col transition-all duration-300 rounded-2xl border shadow-2xl border-gray-200 bg-white">
      <div className="bg-a mb-3 flex justify-between">
        <h3 className=" font-semibold text-gray-700">Palabras selecionadas</h3>
        <button
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white duration-200 transition-all"
        >
          <Icon icon={"mingcute:close-line"} className="text-purple-400 text-lg"></Icon>
        </button>
      </div>
      <div className="flex flex-1 gap-5 bg-pik-300">

        <div className="p-3 rounded-xl border border-gray-200 bg-white">
          <div className=" pb-3 border-b border-gray-200">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">
              Palabras seleccionadas 
              <span className="text-xs"> ({listWords.length})</span>
            </h3>
            <div className="flex gap-2 text-xs text-gray-700 font-semibold">
              <button className="py-1 px-2 rounded-lg border border-gray-300">Limpiar todo</button>
              <button onClick={handlerTraslate} className="py-1 px-2 rounded-lg border border-gray-300">Traducir todo</button>
            </div>
          </div>
          <div className="flex flex-col max-h-50 overflow-y-auto custom-scrollbar sin-flechas">
            {listWords.map((e, i) => (
              <span className="pl-1 py-1 rounded-l text-sm  border-b border-gray-200 border-l-2 border-l-purple-400" key={i}>{e}</span>
            ))}
          </div>
        </div>


        <div className="flex flex-col p-3 rounded-xl border border-purple-200 bg-purple-50 ">
          <div className="flex flex- min-h-10 gap-2 items-start">
            <div className="flex items-center gap-2">

              <h3 className="text-sm font-semibold">Traduccion</h3>
              <Icon icon={'mdi:swap-horizontal'} className="text-xl text-purple-500" ></Icon>
            </div>
          </div>
          <div className="max-h-50 min-w-100 overflow-y-auto custom-scrollbar ">

            {data?.words.map((e, i) => (
              <div key={i} className="grid grid-cols-[150px_1fr] py-1 pr-2 border-b border-gray-200 text-sm">
                {/* <div className="flex bg-amber-300 w-10">

                </div> */}
                <span className="">{` ${e.word}`}</span>
                <div className="flex items-center flex-1 gap-5">

                  <Icon icon={'tabler:arrow-right'} className="bg-rd-300  text-purple-500"></Icon>
                  <span className="">{e.translation}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="mt-10">
          <button
            onClick={handlerTraslate}
            className="flex items-center gap-2 py-0.5 px-2 rounded-lg text-sm bg-neutral-800 text-white hover:bg-emerald-400 transition-all duration-300"

          >
            Traducir
            <Icon icon={'ri:translate-ai-2'} className=""></Icon>
          </button>
        </div> */}
      </div>
      {/* <div className="bg-green-300">
        algo
      </div> */}
    </div>
  )

}