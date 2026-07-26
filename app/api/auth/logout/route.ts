import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const cookieStore = await cookies();

    // Obtener token de la cookie
    const token = cookieStore.get("session_token")?.value;

    // Si existe el token, eliminar la sesión de la DB
    if (token) {
      await prisma.session.delete({
        where: {
          token,
        },
      });
    }

    // Eliminar cookie
    cookieStore.delete("session_token");

    return Response.json(
      {
        message: "Sesión cerrada correctamente",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error al cerrar sesión:", error);

    return Response.json(
      {
        message: "Error al cerrar sesión",
      },
      {
        status: 500,
      }
    );
  }
}