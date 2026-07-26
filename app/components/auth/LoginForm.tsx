"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import ModalAlert from "../ModalAlert";
import { useForm } from "react-hook-form";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        await handleRedirectFail(
          result.message || "Email o contraseña incorrectos"
        );
        return;
      }

      console.log("Login correcto:", result);

      await handleRedirectOk("Bienvenido!");

    } catch (error) {
      console.error("Error:", error);

      await handleRedirectFail(
        "No se pudo conectar con el servidor"
      );
    }
  };

  const handleRedirectOk = async (message: string) => {
    setLoading(true);
    setLabel(message);

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    setLoading(false);

    router.replace("/syllabus");
  };

  const handleRedirectFail = async (message: string) => {
    setLoading(true);
    setLabel(message);

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl border shadow-xl border-gray-200">

      <ModalAlert
        open={loading}
        status={label}
      />

      <div className="mb-4 flex items-center justify-end">
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label="Cerrar inicio de sesión"
          className="p-1 rounded-lg hover:bg-emerald-400 hover:text-white text-gray-400 transition-all duration-300"
        >
          <Icon
            icon="mingcute:close-line"
            className="text-xl"
          />
        </button>
      </div>

      <h2 className="mb-6 text-2xl text-purple-400">
        Iniciar sesión
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >

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
            })}
            className="w-full text-sm rounded-xl border border-gray-300 bg-white py-1.5 px-3 focus:outline-none"
          />

          {errors.password && (
            <p className="mt-1 ml-2 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-5 rounded-xl bg-emerald-400 py-3 font-semibold text-white hover:bg-neutral-800 transition-all duration-300 disabled:opacity-50"
        >
          Ingresar
        </button>
      </form>

      <div className="flex items-center justify-center gap-1 mt-5 text-sm text-gray-500">
        <span>¿No tienes una cuenta?</span>

        <Link
          href="/signUp"
          replace
          className="underline hover:text-emerald-400"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
}
