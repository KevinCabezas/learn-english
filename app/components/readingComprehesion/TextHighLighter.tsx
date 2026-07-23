"use client";

import { useEffect, useMemo, useState, useRef } from "react";

type Highlight = {
  id: string;
  word: string;
  start: number;
  end: number;
};

type Props = {
  text?: string;
  storageKey?: string;
  addWord: (word: string) => void;
  removeWord: (word: string) => void;
  // setListWord: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function TextHighlighter({ text = "", storageKey = "highlights", addWord, removeWord }: Props) {

  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loaded, setLoaded] = useState(false);
  const previousText = useRef(text);


  useEffect(() => {
    if (previousText.current !== text) {
      setHighlights([]);
      localStorage.removeItem(storageKey);

      previousText.current = text;
    }
  }, [text, storageKey]);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      setHighlights(JSON.parse(saved));
    } else {
      setHighlights([]);
    }

    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(storageKey, JSON.stringify(highlights));

  }, [highlights, storageKey, loaded]);

  function getWordBounds(text: string, start: number, end: number) {
    // Eliminar espacios seleccionados al principio
    while (start < end && /\s/.test(text[start])) {
      start++;
    }

    // Eliminar espacios seleccionados al final
    while (end > start && /\s/.test(text[end - 1])) {
      end--;
    }

    // Completar hacia la izquierda
    while (start > 0 && !/\s/.test(text[start - 1])) {
      start--;
    }

    // Completar hacia la derecha
    while (end < text.length && !/\s/.test(text[end])) {
      end++;
    }

    return { start, end, word: text.slice(start, end) };
  }

  function highlight() {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) return;
    if (selection.isCollapsed) return;

    const selectedText = selection.toString().trim();

    if (!selectedText) return;

    const range = selection.getRangeAt(0);

    let paragraph: HTMLElement | null = null;

    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      paragraph =
        range.startContainer.parentElement?.closest("p") ?? null;
    } else {
      paragraph =
        (range.startContainer as HTMLElement).closest("p");
    }

    if (!paragraph) return;

    const preRange = document.createRange();

    preRange.selectNodeContents(paragraph);

    preRange.setEnd(
      range.startContainer,
      range.startOffset
    );

    const start = preRange.toString().length;
    const end = start + selection.toString().length;

    // Obtiene la palabra completa
    const result = getWordBounds(text, start, end);

    const overlap = highlights.find(
      (item) =>
        result.start < item.end &&
        result.end > item.start
    );

    if (overlap) {
      // QUITAR RESALTADO
      setHighlights((prev) =>
        prev.filter(
          (item) => item.id !== overlap.id
        )
      );

      // Elimina la palabra completa
      removeWord(overlap.word);

    } else {
      // AGREGAR RESALTADO
      const newHighlight = {
        id: crypto.randomUUID(),
        ...result,
      };

      setHighlights((prev) => [
        ...prev,
        newHighlight,
      ]);

      // Guardar la palabra completa
      addWord(result.word);
    }

    selection.removeAllRanges();
  }

  function saveOnlyWord(data: string) {
    const words: string[] = JSON.parse(
      localStorage.getItem("onlyWords") || "[]"
    );

    if (!words.includes(data)) {
      words.push(data);
      localStorage.setItem(
        "onlyWords",
        JSON.stringify(words)
      );
    }
  }


  function removeOnlyWord(data: string) {
    const words: string[] = JSON.parse(
      localStorage.getItem("onlyWords") || "[]"
    );

    const newWords = words.filter(
      (word) => word !== data
    );

    localStorage.setItem(
      "onlyWords",
      JSON.stringify(newWords)
    );
  }



  const renderedText = useMemo(() => {
    const result: React.ReactNode[] = [];

    let last = 0;

    [...highlights]
      .sort((a, b) => a.start - b.start)
      .forEach((item) => {
        result.push(text.slice(last, item.start));

        result.push(
          <mark
            key={item.id}
            className="bg-yellow-300"
          >
            {text.slice(item.start, item.end)}
          </mark>
        );

        last = item.end;
      });

    result.push(text.slice(last));

    return result;
  }, [highlights, text]);


  function clear() {
    localStorage.removeItem(storageKey);
    setHighlights([]);
  }

  return (
    <div className="space-y-5">
      <p
        onMouseUp={highlight}
        onPointerUp={() => setTimeout(highlight, 50)}
        className="selection:bg-yellow-300 leading-7 "
      >
        {renderedText}
      </p>

      <button
        onClick={clear}
        className="bg-purple-500 text-white px-2 py-1 rounded-lg"
      >
        Limpiar
      </button>

      {/* <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(highlights, null, 2)}
      </pre> */}
    </div>
  );
}