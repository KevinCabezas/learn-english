
import { createUser } from "@/lib/user";

export async function POST(request: Request) {
  try {
    const data = await request.json();
console.log(data)
    const user = await createUser(data);

    return Response.json(user, { status: 201 });
  } catch (error) {
    console.log(error)
    return Response.json(
      { message: "Error al crear usuario" },
      { status: 500 }
    );
  }
}