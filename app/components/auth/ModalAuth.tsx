export default function ModalAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex min-h-dvh w-dvw justify-cener items-center pb-1 bg-purple-400">
      <div className="w-1/2 min-h-dvh flex items-center justify-center bg-white ">
        {children}

      </div>
    </div>
  )
}
