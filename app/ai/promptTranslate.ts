// prompts.ts

export function generateTranslateWordsPrompt(words: string[]) {
  return `
Actúa como un profesor de inglés especializado en traducción.

Recibirás un ARRAY de elementos en inglés.

IMPORTANTE:
Cada elemento recibido en el array debe ser tratado como UNA UNIDAD INDIVISIBLE.

Esto significa:

- Si un elemento contiene UNA SOLA PALABRA, tradúcelo como una palabra.
- Si un elemento contiene DOS O MÁS PALABRAS, trátalo como UNA FRASE COMPLETA.
- NUNCA dividas un elemento en varias palabras.
- NUNCA separes una frase en palabras individuales.
- NUNCA agregues palabras que no estén en la entrada.
- NUNCA elimines palabras de una frase.
- NUNCA combines dos elementos diferentes.
- Debes mantener cada elemento recibido como una unidad independiente.

Por ejemplo, si recibes:

[
  "I want to study",
  "table",
  "go"
]

Debes devolver:

[
  {
    "word": "I want to study",
    "translation": "Quiero estudiar"
  },
  {
    "word": "go",
    "translation": "ir"
  },
  {
    "word": "table",
    "translation": "mesa"
  }
]

NO debes devolver:

[
  {
    "word": "I",
    "translation": "yo"
  },
  {
    "word": "want",
    "translation": "querer"
  },
  {
    "word": "to",
    "translation": "a"
  },
  {
    "word": "study",
    "translation": "estudiar"
  }
]

REGLAS DE TRADUCCIÓN:

1. Traduce cada elemento exactamente como fue recibido.

2. Si el elemento contiene una sola palabra:
   - Tradúcela al español.
   - Si tiene varios significados comunes, proporciona hasta 3 significados.
   - Separa los significados utilizando "/".
   - No agregues ejemplos ni explicaciones.

3. Si el elemento contiene dos o más palabras:
   - Considera TODO el elemento como una sola frase.
   - Traduce la frase completa.
   - NO traduzcas cada palabra por separado.
   - La frase debe tener UNA SOLA traducción principal.
   - No agregues significados alternativos.
   - No agregues ejemplos ni explicaciones.

4. Las palabras individuales deben aparecer antes que las frases.

5. Las palabras individuales deben ordenarse alfabéticamente.

6. Las frases deben aparecer después de todas las palabras individuales.

7. Las frases deben ordenarse de menor a mayor cantidad de palabras.

8. Mantén exactamente el texto original recibido en el campo "word".

9. No modifiques la escritura original de los elementos recibidos.

10. No agregues elementos que no estén en la lista original.

11. No elimines elementos de la lista original.

12. La cantidad de elementos de la respuesta debe ser exactamente igual a la cantidad de elementos recibidos.

LISTA ORIGINAL DE ELEMENTOS:

${JSON.stringify(words, null, 2)}

Devuelve ÚNICAMENTE un JSON válido.

El formato debe ser exactamente:

{
  "words": [
    {
      "word": "table",
      "translation": "mesa"
    },
    {
      "word": "I want to study",
      "translation": "Quiero estudiar"
    }
  ]
}

No agregues comentarios.
No encierres el JSON entre \`\`\`.
No escribas ninguna explicación fuera del JSON.
`;
}