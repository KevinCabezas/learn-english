export function generateTemaPrompt(tema: string) {
  return `
Actúa como un profesor de inglés experto en enseñar gramática inglesa a estudiantes de nivel básico e intermedio.

El tema gramatical que debes explicar es:

"${tema}"

Tu tarea es crear una explicación completa, clara, directa y fácil de entender sobre este tema.

La explicación debe estar pensada para un estudiante que quiere comprender:
- Qué es el tiempo verbal o tema gramatical.
- Cuándo se utiliza.
- Cómo se construyen las oraciones.
- Cómo diferenciarlo de otros tiempos verbales similares.
- Cuáles son los errores más comunes.
- Cómo reconocerlo rápidamente en una oración.

REGLAS GENERALES:

- Explica únicamente el tema solicitado: "${tema}".
- Utiliza español claro y sencillo.
- Ve directamente al punto.
- Evita explicaciones innecesariamente largas.
- No utilices lenguaje excesivamente técnico.
- Si utilizas un término gramatical, explícalo de manera sencilla.
- Todos los ejemplos deben estar relacionados con el tema.
- Los ejemplos deben estar en inglés y tener su traducción al español.
- No inventes estructuras que no correspondan al tema.
- La información debe estar correctamente separada en cada sección del JSON.
- No escribas texto fuera del JSON.
- Devuelve únicamente un JSON válido.
- No encierres el JSON entre \`\`\`.
- No agregues comentarios dentro del JSON.

La respuesta debe contener las siguientes secciones:

1. INTRODUCCIÓN

Explica de forma breve:
- Qué es "${tema}".
- Para qué se utiliza principalmente.
- Una explicación sencilla para que el estudiante tenga una primera idea del tema.

2. CUÁNDO SE USA

Explica los principales usos del tema.

Cada uso debe estar separado individualmente y contener:
- El nombre del uso.
- Una explicación clara.
- Un ejemplo en inglés.
- La traducción del ejemplo.

3. ESTRUCTURA GENERAL

Explica cómo se construye el tema.

Incluye las estructuras para:
- Oraciones afirmativas.
- Oraciones negativas.
- Oraciones interrogativas.

Si el tema requiere auxiliares, verbos auxiliares, verbos modales o cambios en el verbo, explícalos.

4. AFIRMATIVO

Explica específicamente cómo formar una oración afirmativa.

Incluye:
- Estructura general.
- Reglas importantes.
- Ejemplos.

Cada ejemplo debe tener:
- Inglés.
- Español.
- Una breve explicación de por qué se utiliza esa estructura.

5. NEGATIVO

Explica específicamente cómo formar una oración negativa.

Incluye:
- Estructura general.
- Reglas importantes.
- Ejemplos.

Cada ejemplo debe tener:
- Inglés.
- Español.
- Una breve explicación.

6. INTERROGATIVO

Explica específicamente cómo formar preguntas.

Incluye:
- Estructura general.
- Preguntas de respuesta Sí/No, si corresponde.
- Preguntas con Wh- words, si corresponde.

Incluye ejemplos con:
- Inglés.
- Español.
- Una breve explicación.

7. PALABRAS CLAVE

Incluye palabras, expresiones o marcadores de tiempo que ayuden a identificar cuándo se suele utilizar el tema.

Para cada palabra clave incluye:
- La expresión en inglés.
- Su traducción al español.
- Una explicación breve de su uso.

IMPORTANTE:
No afirmes que una palabra clave pertenece exclusivamente a este tiempo verbal si también puede utilizarse con otros tiempos.

8. EJEMPLOS PRÁCTICOS

Crea ejemplos variados relacionados con situaciones cotidianas.

Separa los ejemplos en:
- Afirmativos.
- Negativos.
- Interrogativos.

Cada ejemplo debe contener:
- Inglés.
- Español.
- Explicación breve.

9. ANALOGÍA

Crea una analogía sencilla y fácil de recordar que ayude al estudiante a comprender intuitivamente cómo funciona "${tema}".

La analogía debe:
- Ser fácil de imaginar.
- Estar relacionada con una situación cotidiana.
- Explicar la idea principal del tiempo verbal.
- No reemplazar la explicación gramatical, sino ayudar a comprenderla.

10. COMPARACIONES

Identifica los tiempos verbales o estructuras gramaticales que un estudiante podría confundir con "${tema}".

Para cada comparación incluye:
- El otro tiempo verbal o estructura.
- Qué tienen en común.
- Cuál es la diferencia principal.
- Cómo saber cuál utilizar.
- Ejemplos de ambos casos.

11. DIFERENCIAS CLAVE

Crea una lista de las diferencias más importantes que el estudiante debe recordar.

Cada diferencia debe ser corta y directa.

12. ERRORES COMUNES

Incluye los errores más frecuentes que cometen los estudiantes al utilizar "${tema}".

Para cada error incluye:
- La oración incorrecta.
- La oración correcta.
- La explicación del error.

13. CONSEJOS PARA RECORDAR

Incluye consejos prácticos y sencillos para recordar cómo utilizar "${tema}".

14. RESUMEN

Realiza un resumen corto con las ideas más importantes.

Debe incluir:
- Cuándo usarlo.
- Estructura afirmativa.
- Estructura negativa.
- Estructura interrogativa.
- Una diferencia clave con otro tiempo verbal.

Devuelve ÚNICAMENTE un JSON válido con la siguiente estructura:

{
  "topic": "${tema}",
  "title": "Nombre del tema",
  "introduction": {
    "whatIsIt": "Explicación breve",
    "mainUse": "Uso principal",
    "simpleExplanation": "Explicación sencilla"
  },
  "uses": [
    {
      "title": "Nombre del uso",
      "explanation": "Explicación",
      "example": {
        "english": "Example",
        "spanish": "Traducción"
      }
    }
  ],
  "structure": {
    "affirmative": {
      "formula": "Estructura",
      "explanation": "Explicación"
    },
    "negative": {
      "formula": "Estructura",
      "explanation": "Explicación"
    },
    "interrogative": {
      "formula": "Estructura",
      "explanation": "Explicación"
    }
  },
  "affirmative": {
    "structure": "Estructura general",
    "rules": [
      "Regla 1",
      "Regla 2"
    ],
    "examples": [
      {
        "english": "Example",
        "spanish": "Traducción",
        "explanation": "Explicación"
      }
    ]
  },
  "negative": {
    "structure": "Estructura general",
    "rules": [
      "Regla 1",
      "Regla 2"
    ],
    "examples": [
      {
        "english": "Example",
        "spanish": "Traducción",
        "explanation": "Explicación"
      }
    ]
  },
  "interrogative": {
    "structure": "Estructura general",
    "yesNoQuestions": [
      {
        "english": "Example",
        "spanish": "Traducción",
        "explanation": "Explicación"
      }
    ],
    "whQuestions": [
      {
        "english": "Example",
        "spanish": "Traducción",
        "explanation": "Explicación"
      }
    ]
  },
  "keywords": [
    {
      "english": "Keyword",
      "spanish": "Traducción",
      "explanation": "Explicación"
    }
  ],
  "examples": {
    "affirmative": [
      {
        "english": "Example",
        "spanish": "Traducción",
        "explanation": "Explicación"
      }
    ],
    "negative": [
      {
        "english": "Example",
        "spanish": "Traducción",
        "explanation": "Explicación"
      }
    ],
    "interrogative": [
      {
        "english": "Example",
        "spanish": "Traducción",
        "explanation": "Explicación"
      }
    ]
  },
  "analogy": {
    "title": "Título de la analogía",
    "explanation": "Analogía sencilla",
    "keyIdea": "Idea principal que debe recordar el estudiante"
  },
  "comparisons": [
    {
      "topic": "Otro tiempo verbal o estructura",
      "similarity": "Qué tienen en común",
      "mainDifference": "Diferencia principal",
      "howToIdentify": "Cómo saber cuál utilizar",
      "examples": [
        {
          "first": {
            "english": "Example",
            "spanish": "Traducción"
          },
          "second": {
            "english": "Example",
            "spanish": "Traducción"
          }
        }
      ]
    }
  ],
  "keyDifferences": [
    "Diferencia importante 1",
    "Diferencia importante 2"
  ],
  "commonMistakes": [
    {
      "incorrect": "Incorrect sentence",
      "correct": "Correct sentence",
      "explanation": "Explicación del error"
    }
  ],
  "tips": [
    "Consejo 1",
    "Consejo 2"
  ],
  "summary": {
    "whenToUse": "Cuándo utilizarlo",
    "affirmative": "Estructura afirmativa",
    "negative": "Estructura negativa",
    "interrogative": "Estructura interrogativa",
    "keyDifference": "Diferencia clave"
  }
}
`;
}