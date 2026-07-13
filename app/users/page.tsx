"use client";

import { useEffect, useState } from "react";

export default function UserPage() {

  const text =
    "Hacé la prueba: arrastrá el mouse para seleccionar cualquier palabra de este párrafo. Vas a ver cómo el texto seleccionado queda resaltado.";


  const [highlights, setHighlights] = useState<
    {
      start: number;
      end: number;
    }[]
  >([]);



  useEffect(() => {

    const saved = localStorage.getItem("highlights");

    if(saved){
      setHighlights(JSON.parse(saved));
    }

  }, []);



  useEffect(() => {

    localStorage.setItem(
      "highlights",
      JSON.stringify(highlights)
    );

  },[highlights]);




 function highlight() {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) return;


  const range = selection.getRangeAt(0);

  if (selection.isCollapsed) return;


  const paragraph = range.commonAncestorContainer.parentElement;

  if (!paragraph) return;


  // Calcular posición absoluta en el texto original
  const preRange = document.createRange();

  preRange.selectNodeContents(paragraph);

  preRange.setEnd(
    range.startContainer,
    range.startOffset
  );


  const start = preRange.toString().length;

  const end = start + selection.toString().length;



  setHighlights((prev) => {

    // Verificar si ya existe ese rango
    const exists = prev.some(
      (item) =>
        start >= item.start &&
        end <= item.end
    );


    if (exists) {

      // quitar resaltado
      return prev.filter(
        (item) =>
          !(start >= item.start &&
            end <= item.end)
      );

    }


    // agregar resaltado
    return [
      ...prev,
      {
        start,
        end
      }
    ];

  });



  selection.removeAllRanges();
}



  function renderText(){


    let result: React.ReactNode[] = [];

    let last = 0;



    highlights
      .sort((a,b)=>a.start-b.start)
      .forEach((item,index)=>{


        result.push(
          text.slice(last,item.start)
        );


        result.push(

          <mark 
            key={index}
            className="bg-yellow-300"
          >

            {text.slice(item.start,item.end)}

          </mark>

        );


        last=item.end;


      });



    result.push(
      text.slice(last)
    );


    return result;

  }




  function clear(){

    localStorage.removeItem("highlights");

    setHighlights([]);

  }



  return (

    <div className="max-w-3xl mx-auto mt-10">


      <p
        onMouseUp={highlight}
        className="selection:bg-yellow-300"
      >

        {renderText()}

      </p>


      <button
        onClick={clear}
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded"
      >
        Limpiar
      </button>


      <pre>
        {JSON.stringify(highlights,null,2)}
      </pre>


    </div>

  );

}