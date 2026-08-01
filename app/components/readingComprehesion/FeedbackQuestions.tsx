import { TResQuestion } from "@/app/types/readingComprehesion";
import { Icon } from "@iconify/react"
import { useState, useEffect } from "react";


export default function FeedbackQuestions() {
  const [resQuestions, setResQuestions] = useState<TResQuestion[] | null>(null)
  useEffect(() => {
    const getData = localStorage.getItem('feedback');
    if (getData) {
      setResQuestions(JSON.parse(getData));
    }

  }, [])


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
    <>
     
        <div>
          <h2 className="text-xl font-semibold">Reading Comprehension - Feedback</h2>
          <p className="mt-2 text-sm">Revisa tus respuestas y aprende de tus errores.</p>
          <div className="flex mt-5 w-full justify-arund py-5 border rounded-2xl border-gray-200">
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
          </div>
          <div>

          </div>
        </div>
   
   
        <div className="list-decimal mt-5 w-full gap-5 flex flex-col  border-gray-200">
          {resQuestions?.map((q, i) => (

            <div key={i} className={` space-y-5 p-5 rounded-xl border  
            ${q.level === 'bad' ? 'border-red-200' : 'border-emerald-200'} 
            ${q.level === 'partial' ? 'border-yellow-200' : 'border-emerald-200'}`}>
              <div className="flex items-start gap-2">
                <div className="flex items-center justify-center py-1  px-3 bg-blue-400 rounded-full h-fit w-fit ">
                  <span className="text-xl font-bold text-gray-200">{i + 1}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">{q.questions}</span>
                  <span className=" space-x-2 font-semibold">
                    <span>
                      Tu respuesta:
                    </span>
                    <span className="text-blue-400">
                      {q.responses}
                    </span>
                  </span>
                </div>
                <div className="flex-1 flex bg-ambr-200 justify-end">
                  <div className={`w-fit flex items-center gap-2 px-2.5 py-0.5 rounded-lg font-semibold border text-emerald-400 border-emerald-100 bg-emerald-50
                  ${q.level === 'bad' ? 'border-red-100 bg-red-50 text-red-400' : ''} 
                  ${q.level === 'partial' ? 'border-yellow-200 bg-yellow-100 text-yellow-400' : ''}`}
                  >
                    {q.level === 'good' && (
                      <Icon icon={'mdi:check-circle-outline'}></Icon>
                    )}

                    {q.level === 'partial' && (
                      <Icon icon={'mdi:chart-pie-outline'}></Icon>
                    )}

                    {q.level === 'bad' && (
                      <Icon icon={'mdi:close-circle-outline'}></Icon>
                    )}
                    <span className="text-sm">{q.level}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-5 font-semibold">
                <div className={`flex flex-col gap-2 p-5 w-3/5 rounded-xl border text-sm border-emerald-100 bg-emerald-50
                ${q.level === 'bad' ? 'border-red-100 bg-red-50' : ''} 
                ${q.level === 'partial' ? 'border-yellow-200 bg-yellow-100' : ''}`}

                >
                  <span
                    className={`text-emerald-400
                  ${q.level === 'bad' ? 'text-red-400' : ''} 
                  ${q.level === 'partial' ? 'text-yellow-400' : ''}`}
                  >
                    Correccion
                  </span>
                  <span>{q.correction}</span>
                </div>
                <div className={`flex flex-col gap-2 p-5 w-full rounded-xl border text-sm border-emerald-100 bg-emerald-50
                ${q.level === 'bad' ? 'border-red-100 bg-red-50' : ''} 
                ${q.level === 'partial' ? 'border-yellow-200 bg-yellow-50' : ''}`}
                >
                  <span
                    className={`text-emerald-400
                  ${q.level === 'bad' ? 'text-red-400' : ''} 
                  ${q.level === 'partial' ? 'text-yellow-400' : ''}`}
                  >
                    Sugerencia
                  </span>
                  <span>{q.suggestion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
 
    </>
  )
}