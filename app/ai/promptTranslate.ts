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
- Si hay fraces, osea no son una sola palabra, tambien traducelas.
- Si en la lista hay elementos con dos palabras, cuenta como frase.
- Las fraces deben tener una sola opcoin de traduccion.
- Las fraces deben ir al final de las palabras. 
- Las fraces deben ir ordenadas por cantidad de palabras despues de las palabras que se ordenaron en alfabeto.
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
    
  ]
}

No agregues comentarios.
No encierres el JSON entre \`\`\`.
No escribas ninguna explicación.
`;
}