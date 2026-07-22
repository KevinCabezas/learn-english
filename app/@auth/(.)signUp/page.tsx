import SingupForm from "@/app/components/auth/SignUpForm";
import ModalAuth from "@/app/components/auth/ModalAuth";

export default function Page() {
  return (
    <ModalAuth>
      <SingupForm />
    </ModalAuth>
  );
}