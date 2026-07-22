'use client'
import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'
import Link from "next/link";


export default function LoginForm() {
  const router = useRouter()
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl border border-gray-200 ">
      <div className='mb-4 flex items-center justify-end'>
        <button
          type="button"
          onClick={() => router.push('/')}
          aria-label="Cerrar inicio de sesión"
          className='p-1 rounded-lg hover:bg-emerald-400 hover:text-white text-gray-400 transition-all duration-300'
        >
          <Icon icon={"mingcute:close-line"} className='text-xl '></Icon>
        </button>
      </div>
      <h2 className="mb-6 text-2xl font- text-purple-400">
        Iniciar sesión
      </h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Correo"
          className="w-full rounded-xl border border-gray-300 bg-white p-3 focus:outline-none "
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full rounded-xl p-3 border border-gray-300 focus:outline-none"
        />

        <button
          className="w-full mt-5 rounded-xl bg-emerald-400 py-3 font-semibold text-white hover:bg-neutral-800 hover:border-neutral-800 transition-all duration-300"
        >
          Ingresar
        </button>
      </form>
      <div className='flex items-center justify-center gap-1 mt-5 text-sm text-gray-500'>
        <span>No tienes una cuenta?</span>
        <Link href="/signUp" replace className="underline hover:text-emerald-400">
          Registrarse
        </Link>

      </div>
    </div>
  )
}
