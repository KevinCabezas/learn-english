import { useState } from "react";
import { generateResQuestionsPrompt } from "@/app/ai/promptResQuestions";
import { TReqQuestion, TPropQuestions, TResQuestion } from "@/app/types/readingComprehesion";
import { Icon } from "@iconify/react";

export default function Questions({ text, questions }: TPropQuestions) {

  const [modalResponse, setModalResponse] = useState(false);
  const [resQuestions, setResQuestions] = useState<TResQuestion[] | null>(null)
  const [responses, setResponses] = useState<string[]>([]);


  async function send() {
    try {
      // console.log("entro a las respuestas")
      // console.log(resQuestions)
      // console.log(text)
      const req: TReqQuestion = {
        text: text,
        request: questions.map((q, i) => ({
          questions: q,
          responses: responses[i] ?? ''
        }))
      }
      console.log(req)
      // if (!reqQuestions) return;

      const prompt = generateResQuestionsPrompt(req)

      const res = await fetch('../api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data: TResQuestion[] = await res.json();

      if (Array.isArray(data)) {
        setResQuestions(data);
      } else {
        console.error("La IA no devolvió un array:", data);
        setResQuestions([]);
      }


      setModalResponse(false)
      console.log("se envio las respuestas")
    } catch (error) {
      console.log('error de la respuesta de la ia')
      console.error(error)

    }
  }
 const goodCount =
  resQuestions?.filter((item) => item.level === "good").length ?? 0;

const partialCount =
  resQuestions?.filter((item) => item.level === "partial").length ?? 0;

const badCount =
  resQuestions?.filter((item) => item.level === "bad").length ?? 0;

const answeredCount =
  resQuestions?.filter((item) => item.responses.trim() !== "").length ?? 0;

  type TCorrection = {

    color: string;
    title: string;
    icon: string;
    value: number;
  }
  const style: TCorrection[] = [
    {
      color: "text-green-400",
      title: "Respuestas correctas",
      icon: "mdi:check-circle-outline",
      value: goodCount,
    },
    {
      color: "text-yellow-400",
      title: "Parcialmente correctas",
      icon: "mdi:chart-pie-outline",
      value: partialCount,
    },
    {
      color: "text-red-400",
      title: "Incorrectas",
      icon: "mdi:close-circle-outline",
      value: badCount,
    },
    {
      color: "text-blue-400",
      title: "Preguntas respondidas",
      icon: "mdi:file-document-outline",
      value: answeredCount,
    },
  ];
  return (
    <div className="mt-3 flex flex-col items-strt bg-white  lg:p-8 p-5 rounded-3xl border text-gray-700 lg:border-l-5 border-l-emerald-400 border-gray-200">
      <h3 className=" font-semibold text-emerald-400 ">
        Questions
      </h3>
      <ol className="list-decimal ml-6 mt-2">
        {questions.map((q, i) => (
          <li key={i} className="mb-4">
            <p>{q}</p>

            {modalResponse && (
              <input
                type="text"
                placeholder="R:"
                onChange={(e) => {
                  const newResponses = [...responses];
                  newResponses[i] = e.target.value;
                  setResponses(newResponses);
                }}
                className="mt-2  border-b border-gray-400  text-sm focus:outline-none w-full"
              />
            )}
          </li>
        ))}
      </ol>



      <div>
        <h2>Reading Comprehension - Feedback</h2>
        <p>Revisa tus respuestas y aprende de tus errores</p>
        <div className="flex w-full justify-arund py-5 border rounded-2xl border-gray-200">


          {style.map((s, i) => (

            <div key={i} className={`flex w-full gap-2 justify-center items-center bg-green0  border-gray-200 ${i !== style.length - 1 ? 'border-r' : ''}`}>
              <Icon icon={s.icon} className={`text-5xl ${s.color} `}></Icon>
              <div className="flex flex-col gap-1">
                {i === style.length - 1 && (
                  <span className="text-xl font-bold">
                    {s.value}/{resQuestions?.length ?? 0}
                  </span>
                )}

                {i !== style.length - 1 && (
                  <span className="text-xl font-bold">
                    {s.value}
                  </span>
                )}

                <span className="text-sm font-semibold">
                  {s.title}
                </span>
              </div>
            </div>
          ))}

          {/* <div className="flex w-full justify-center items-center gap-2 border-r border-gray-200">
            <Icon icon={''} className="text-5xl text-yellow-400"></Icon>
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold">1</span>
              <span className="text-sm font-semibold">Parcialmente correctas</span>
            </div>
          </div>
          <div className="flex w-full justify-center items-center gap-3 border-r border-gray-200">
            <Icon icon={''} className="text-5xl text-red-400"></Icon>
            <div className="flex flex-col gap-">
              <span className="text-xl font-bold">2</span>
              <span className="text-sm font-semibold">Incorrectas</span>
            </div>
          </div>
          <div className="flex w-full justify-center items-center gap-2 border-r border-gray-200">
            <Icon icon={''} className="text-5xl text-blue-400"></Icon>
            <div className="flex flex-col gap-1">
              <span className="text-xl font-bold">{}/{resQuestions?.length}</span>
              <span className="text-sm font-semibold">Preguntas respondidas</span>
            </div>
          </div> */}
        </div>
      </div>
      <div className="list-decimal mt-2 w-full flex flex-col border border-gray-200">
        {resQuestions?.map((q, i) => (

          <div key={i} className="mb-4 border border-gray-200">
            <div className="flex">
              <div>
                <span>{i+1}</span>
              </div>
              <div className="flex flex-col">
                <span>{q.questions}</span>
                <span>Tu respuesta: {q.responses}</span>
              </div>
              <div className="flex-1 flex bg-amber-200 justify-end">
                <Icon icon={''}></Icon>
                <span>{q.level}</span>
              </div>
            </div>
            <div className="flex">
              <div className="border border-gray-200"> 
                <span>Correccion</span>
                <span>{q.correction}</span>
              </div>
              <div className="border border-gray-200">
                <span>Sugerencia</span>
                <span>{q.suggestion}</span>
              </div>
            </div>
          </div>
        ))}
      </div>



      {!modalResponse && (
        <span>Respuestas enviadas</span>
      )}
      {!modalResponse && (
        <button
          onClick={() => setModalResponse(true)}
          className="mt-5 px-3 py-1 rounded-xl font-semibold bg-emerald-400 text-white">
          Responder
        </button>
      )}

      {modalResponse && (

        <button
          onClick={() => send()}
          className="mt-5 px-3 py-1 rounded-xl font-semibold bg-emerald-400 text-white">
          Enviar Respusta
        </button>
      )}
    </div>
  )
}