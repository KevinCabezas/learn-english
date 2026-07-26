import { loginUser } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const user = await loginUser(data);

    return Response.json(
      {
        message: "Login exitoso",
        user,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Email o contraseña incorrectos",
      },
      {
        status: 401,
      }
    );
  }
}