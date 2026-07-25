

type TAlert = {
  open: boolean;
  status: string;
}
export default function ModalAlert({ open, status }: TAlert) {
  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center w-1/2 ">
      <div className="flex items-center justify-center min-h-50 min-w-50 rounded-xl shadow-2xl bg-white">
        {status}
      </div>
    </div>
  )
}