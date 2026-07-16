import LoginForm from "@/app/components/auth/LoginForm";
import ModalAuth from "@/app/components/auth/ModalAuth";

export default function Page() {
  return (
    <ModalAuth>
      <LoginForm />
    </ModalAuth>
  );
}