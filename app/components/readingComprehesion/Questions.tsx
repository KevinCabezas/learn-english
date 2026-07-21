import { useState } from "react";



type TPropQuestions = {
  questions: string[];
}

export default function Questions({ questions }: TPropQuestions) {

  const [modalResponse, setModalResponse] = useState(false);



  return (
    <div className="mt-3 flex flex-col items-start bg-white  lg:p-8 p-5 rounded-3xl border text-gray-700 lg:border-l-5 border-l-emerald-400 border-gray-200">
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
                className="mt-2 rounded-lg py-1 px-2 focus:outline-none bg-gray-200"
              />
            )}
          </li>
        ))}
      </ol>


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
          onClick={() => setModalResponse(false)}
          className="mt-5 px-3 py-1 rounded-xl font-semibold bg-emerald-400 text-white">
          Enviar Respusta
        </button>
      )}
    </div>
  )
}