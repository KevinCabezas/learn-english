

export default function LoginForm() {

  return (
   <div className="w-full max-w-md bg-white p-8 ">
      <h2 className="mb-6 text-2xl font-bold">
        Iniciar sesión
      </h2>

      <form className="space-y-4">
        <input
          type="email"
          placeholder="Correo"
          className="w-full rounded-lg border p-3"
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full rounded-lg border p-3"
        />

        <button
          className="w-full rounded-lg bg-purple-400 py-3 text-white"
        >
          Ingresar
        </button>
      </form>
    </div>
  )
}