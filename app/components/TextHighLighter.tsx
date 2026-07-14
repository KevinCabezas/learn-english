"use client";

import { useEffect, useMemo, useState } from "react";

type Highlight = {
  id: string;
  word: string;
  start: number;
  end: number;
};

type Props = {
  text?: string;
  storageKey?: string;
};

export default function TextHighlighter({ text = "", storageKey = "highlights" }: Props) {

  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      setHighlights(JSON.parse(saved));
    }

    setLoaded(true);
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;

    localStorage.setItem(
      storageKey,
      JSON.stringify(highlights)
    );
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

    const range = selection.getRangeAt(0);

    // Buscar siempre el <p>, aunque la selección esté dentro de un <mark>
    let paragraph: HTMLElement | null = null;

    if (range.startContainer.nodeType === Node.TEXT_NODE) {
      paragraph = range.startContainer.parentElement?.closest("p") ?? null;
    } else {
      paragraph = (range.startContainer as HTMLElement).closest("p");
    }

    if (!paragraph) return;

    // Calcular posición absoluta respecto al párrafo completo
    const preRange = document.createRange();
    preRange.selectNodeContents(paragraph);
    preRange.setEnd(range.startContainer, range.startOffset);

    let start = preRange.toString().length;
    let end = start + selection.toString().length;

    const result = getWordBounds(text, start, end);

    setHighlights((prev) => {
      // ¿La nueva selección toca algún resaltado?
      const overlap = prev.find(
        (item) =>
          result.start < item.end &&
          result.end > item.start
      );

      if (overlap) {
        // eliminar completamente el resaltado
        return prev.filter((item) => item.id !== overlap.id);
      }

      // agregar uno nuevo
      return [
        ...prev,
        {
          id: crypto.randomUUID(),
          ...result,
        },
      ];
    });

    selection.removeAllRanges();
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
        className="selection:bg-yellow-300 leading-7 "
      >
        {renderedText}
      </p>

      <button
        onClick={clear}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Limpiar
      </button>

      {/* <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
        {JSON.stringify(highlights, null, 2)}
      </pre> */}
    </div>
  );
}