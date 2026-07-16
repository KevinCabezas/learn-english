'use client'

import { useRouter } from 'next/navigation'


export default function ModalAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  return (
    <div className="fixed inset-0 z-50 w-1/2 h-dvh flex items-center justify-center bg-red-400/30 ">
      <div className="relative">
        <button
          onClick={() => router.back()}
          className="absolute right-3 top-3 cursor-pointer border-none bg-transparent text-lg font-bold"
          aria-label="Cerrar modal"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  )
}