'use client';

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./components/Spinner";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRedirect = async () => {

    setLoading(true);
    await new Promise((reslover) => setTimeout(reslover, 2000));

    router.push('/blog');


  }




  return (
    <main className="flex  min-h-dvh bg-white">


      <div className="flex flex-col items-center justify-between py-15 px-15 h-dvh w-1/2  bg--400">
        <div className="bg-amber w-full ">
          <div className="flex items-center gap-2 text-purple-400">
            <Icon icon={"ion:book-outline"} className="text-xl" />
            <span className="text-sm ">Aprende. Practica. Avanza.</span>
          </div>
        </div>
        <div className="bg-red-00  mx-30 flex flex-col items-start gap-5">

          <h1 className="text-5xl space-x-4 font-semibold">
            <span className="text-gray-700 ">Aprende</span>
            <span className="text-purple-400">Ingles</span>
          </h1>

          <p className=" text-sm text-gray-500 ">
            Aprende ingles de forma practica y efectiva con lecciones cortas y ejercicios faciles de entender.
          </p>
          <div className="flex mt-5 flex-col gap-5 w-100">
            <button
              onClick={handleRedirect}
              className="w-full text-center py-2 px-4 rounded-xl border-2 border-emerald-400 font-semibold text-emerald-400 hover:bg-emerald-400 hover:text-white transition-all duration-300"
            >
              Empezar Ahora
            </button>
            <Spinner open={loading}></Spinner>
            <Link
              href={"/login"}
              // prefetch={false}
              className="w-full text-center py-2 px-4 rounded-xl border-2 border-purple-400 font-semibold text-purple-400 hover:bg-purple-400 hover:text-white transition-all duration-300"
            >
              Ingresar
            </Link>
          </div>
        </div>

        <div>
          algo
        </div>
        {/* <div className="fixed bottom-0 left-150 z-10 w-30 h-30 rounded-full bg-emerald-400">

        </div> */}
      </div>

      <div className="w-1/2 h-dvh text-cnter items-center t bg-purple-400">

      </div>
    </main>
  );
}
