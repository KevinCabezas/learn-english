import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { generateResQuestionsPrompt } from "@/app/ai/promptResQuestions";
import { TReqQuestion, TPropQuestions, TResQuestion } from "@/app/types/readingComprehesion";
import { Icon } from "@iconify/react";


export default function Questions({ text, questions, onChange, showQuestion }: TPropQuestions) {

  const [modalResponse, setModalResponse] = useState(false);
  const [viewQuestions, setviewQuestions] = useState(true);
  const [responses, setResponses] = useState<string[]>([]);

  useEffect(() => {
    setviewQuestions(showQuestion);
  }, [viewQuestions])

  async function send() {
    try {
      const req: TReqQuestion = {
        text: text,
        request: questions.map((q, i) => ({
          questions: q,
          responses: responses[i] ?? ''
        }))
      }
      const prompt = generateResQuestionsPrompt(req)

      const res = await fetch('../api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data: TResQuestion[] = await res.json();
      // if (Array.isArray(data)) {
      //   setResQuestions(data);
      // } else {
      //   console.error("La IA no devolvió un array:", data);
      //   setResQuestions([]);
      // }
      setviewQuestions(false)
      onChange(true)
      setModalResponse(false)
      console.log("se envio las respuestas")

      localStorage.setItem('feedback', JSON.stringify(data))

    } catch (error) {
      console.log('error de la respuesta de la ia')
      console.error(error)
    }
  }

  return (
    <div className="mt-8 flex flex-col ">
      {viewQuestions && (
        <>
          <h3 className="text-xl font-semibold">
            Questions
          </h3>
          <div className="mt-2 rounded-2xl p-5 border border-gray-200 ">
            {questions.map((q, i) => (
              <span key={i} className="mb-4">
                <p className="space-x-2">
                  <span className="font-semibold">
                    {i + 1}.
                  </span>
                  <span>
                    {q}
                  </span>
                </p>
                {modalResponse && (
                  <input
                    type="text"
                    placeholder="R:"
                    onChange={(e) => {
                      const newResponses = [...responses];
                      newResponses[i] = e.target.value;
                      setResponses(newResponses);
                    }}
                    className="mt-2 mb-1  border-b border-gray-400  text-sm focus:outline-none w-full"
                  />
                )}
              </span>
            ))}
            <div className="mt-5 pt-5 border-t border-gray-200">
              {!modalResponse && (
                <button
                  onClick={() => setModalResponse(true)}
                  className="group flex items-center gap-2 px-4 py-1.5 rounded-xl font-semibold bg-emerald-500 text-white hover:bg-neutral-800 transition-all duration-300">
                  Responder
                  <Icon icon={'mynaui:pencil'} className="text-xl group-hover:text-emerald-400"></Icon>
                </button>
              )}
              {modalResponse && (
                <button
                  onClick={() => send()}
                  className="group flex items-center gap-2 px-4 py-1.5 rounded-xl font-semibold bg-purple-500 text-white hover:bg-neutral-800 transition-all duration-300">
                  Enviar
                  <Icon icon={'griddy-icons:send'} className="text-xl group-hover:text-emerald-400"></Icon>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}