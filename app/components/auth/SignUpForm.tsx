"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { set, useForm } from "react-hook-form";
import { useState } from "react";
import ModalAlert from "../ModalAlert";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("");

  const router = useRouter();

  const { register, handleSubmit, formState: { errors }, watch, } = useForm<SignUpFormData>();

  const password = watch("password");

  const onSubmit = async (data: SignUpFormData) => {
    try {
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        // alert(result.message);
        // console.log(response.ok)
        handleRedirectFail('mail ya registrddo')
        return;
      }

      console.log("Usuario creado:", result);
      handleRedirectOk(result.message)
      // router.push("/syllabus");
    } catch (error) {
      console.error("Error:", error);
    }
  };


  const handleRedirectOk = async (message: string) => {

    setLoading(true);
    setLabel(message)
    await new Promise((reslover) => setTimeout(reslover, 2000));

    router.push('/syllabus');


  }

  const handleRedirectFail = async (message: string) => {

    setLoading(true);
    setLabel(message)
    await new Promise((reslover) => setTimeout(reslover, 2000));

    setLoading(false);
    // router.push('/syllabus');


  }
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl border border-gray-200">

      <ModalAlert open={loading} status={label} ></ModalAlert>
      <div className="mb-4 flex items-center justify-end">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="p-1 rounded-lg hover:bg-emerald-400 hover:text-white text-gray-400 transition-all duration-300"
          aria-label="Cerrar modal"
        >
          <Icon icon="mingcute:close-line" className="text-xl" />
        </button>
      </div>

      <h2 className="mb-6 text-2xl text-purple-400">
        Crear cuenta
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <div>
          <input
            type="text"
            placeholder="Nombre"
            {...register("name", {
              required: "El nombre es obligatorio",
              minLength: {
                value: 2,
                message: "El nombre debe tener al menos 2 caracteres",
              },
            })}
            className="w-full text-sm rounded-xl border border-gray-300 bg-white py-1.5 px-3 focus:outline-none"
          />

          {errors.name && (
            <p className="mt-1 ml-2 text-xs text-red-500">
              {errors.name.message}
            </p>
          )}
        </div>
        {/* EMAIL */}
        <div>
          <input
            type="email"
            placeholder="Correo"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Ingresa un correo válido",
              },
            })}
            className="w-full text-sm rounded-xl border border-gray-300 bg-white py-1.5 px-3 focus:outline-none"
          />

          {errors.email && (
            <p className="mt-1 ml-2 text-xs text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Contraseña"
            {...register("password", {
              required: "La contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            })}
            className="w-full text-sm rounded-xl border border-gray-300 bg-white py-1.5 px-3 focus:outline-none"
          />

          {errors.password && (
            <p className="mt-1 ml-2 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <input
            type="password"
            placeholder="Repetir contraseña"
            {...register("confirmPassword", {
              required: "Debes repetir la contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="w-full text-sm rounded-xl border border-gray-300 bg-white py-1.5 px-3 focus:outline-none"
          />

          {errors.confirmPassword && (
            <p className="mt-1 ml-2 text-xs text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-5 rounded-xl bg-emerald-400 py-3 font-semibold text-white hover:bg-neutral-800 transition-all duration-300"
        >
          Registrarse
        </button>
      </form>

      <div className="flex items-center justify-center gap-1 mt-5 text-sm text-gray-500">
        <span>¿Ya tienes una cuenta?</span>

        <Link
          href="/login"
          replace
          className="underline hover:text-emerald-400"
        >
          Ingresar
        </Link>
      </div>
    </div>
  );
}