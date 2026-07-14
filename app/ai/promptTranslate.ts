// prompts.ts

export function generateTranslateWordsPrompt(words: string[]) {
  return `
Actúa como un profesor de inglés.

Recibirás una lista de palabras en inglés.

Tu tarea es:

- Traducir cada palabra al español.
- que se ordenen de manera alfabetica.
- Traducir únicamente la palabra, sin ejemplos ni explicaciones.
- Si una palabra tiene varios significados, manda hasta 3 variantes.
- No agregues palabras que no fueron enviadas.
- No escribas texto fuera del JSON.

Lista de palabras:

${words.join(", ")}

Devuelve ÚNICAMENTE un JSON válido con este formato:

{
  "words": [
    {
      "word": "table",
      "translation": "mesa/otro significado/otro significado"
    },
    {
      "word": "house",
      "translation": "casa"
    }
  ]
}

No agregues comentarios.
No encierres el JSON entre \`\`\`.
No escribas ninguna explicación.
`;
}