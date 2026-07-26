import { getCurrentUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return Response.json(
        {
          message: "No estás autenticado",
        },
        {
          status: 401,
        }
      );
    }

    return Response.json(
      {
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
        message: "Error al obtener usuario",
      },
      {
        status: 500,
      }
    );
  }
}