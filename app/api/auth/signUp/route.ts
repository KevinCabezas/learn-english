import { createUser, createSession } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log(data);

    // Crear usuario
    const user = await createUser(data);

    // Crear sesión y cookie
    await createSession(user.id);

    return Response.json(
      {
        message: "Usuario registrado correctamente",
        user, 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Error al crear usuario",},
      { status: 500 }
    );
  }
}