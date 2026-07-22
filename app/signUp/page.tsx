import SingupForm from "@/app/components/auth/SignUpForm";
import { Icon } from "@iconify/react";


export default function Page() {
  return (
    <main className="flex  min-h-dvh w-full   ">

      <div className="w-1/2 h-dvh flex justify-center items-center bg-white">
        <SingupForm />
      </div>

      <div className="w-1/2 h-dvh bg-purple-400">

      </div>

    </main>
  );
}