// prompts.ts

export type EnglishLevel = "easy" | "medium" | "hard";

export const readingContext = `
Actúa como un profesor de inglés especializado en crear ejercicios de comprensión lectora.

Tu objetivo es generar textos en inglés adaptados al nivel del estudiante para practicar reading comprehension.

Los textos deben ser naturales, interesantes y similares a situaciones de la vida real.
`;

export function generateReadingPrompt(
  level: EnglishLevel,
  tense: string,
  topic: string
) {
  return `
${readingContext}

Configuración del ejercicio:

- Nivel: ${level}
- Tiempo verbal principal: ${tense}
- Tema: ${topic}

Reglas:

- Genera únicamente un texto en inglés.
- La extensión debe ser entre 450 y 550 palabras.
- Usa vocabulario acorde al nivel seleccionado.
- El tiempo verbal indicado debe ser el predominante.
- No agregues traducción.
- No expliques la gramática.
- No uses Markdown.
- No escribas texto fuera del JSON.

Después del texto crea exactamente 5 preguntas de comprensión lectora.

Devuelve ÚNICAMENTE un JSON válido con este formato:

{
  "title": "Título - Tiempo verbal",
  "text": "Texto completo en inglés",
  "questions": [
    "Pregunta 1",
    "Pregunta 2",
    "Pregunta 3",
    "Pregunta 4",
    "Pregunta 5"
  ]
}

No agregues comentarios.
No encierres el JSON entre \`\`\`.
No escribas ninguna explicación.
`;
}