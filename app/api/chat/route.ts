import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = completion.choices[0].message.content;

  if (!content) {
    return Response.json(
      { error: "La IA no devolvió contenido." },
      { status: 500 }
    );
  }

  try {
    const result = JSON.parse(content);
    return Response.json(result);
  } catch {
    return Response.json(
      { error: "La IA devolvió un JSON inválido." },
      { status: 500 }
    );
  }
}