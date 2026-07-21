export default function ModalAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex min-h-dvh w-1/2 justify-center items-center pb-1 bg-white">
      {children}
    </div>
  )
}
