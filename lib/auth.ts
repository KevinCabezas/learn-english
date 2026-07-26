import crypto from "crypto";
import { cookies } from "next/headers";
// import bcrypt from "bcrypt";
import bcrypt from 'bcrypt'
import { prisma } from "@/lib/prisma";

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await bcrypt.hash(
    data.password,
    10
  );

  const user = await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    },
  });

  return user;
}



export async function loginUser(data: {
  email: string;
  password: string;
}) {
  // 1. Buscar usuario
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  // 2. Si no existe
  if (!user) {
    throw new Error("Email o contraseña incorrectos");
  }

  // 3. Comparar contraseña
  const passwordCorrect = await bcrypt.compare(
    data.password,
    user.password
  );

  // 4. Contraseña incorrecta
  if (!passwordCorrect) {
    throw new Error("Email o contraseña incorrectos");
  }

  // 5. Crear sesión
  await createSession(user.id);

  // 6. No devolver password
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

export async function createSession(userId: number) {
  const token = crypto
    .randomBytes(32)
    .toString("hex");

  const expiresAt = new Date(
    Date.now() +
      1000 * 60 * 60 * 24 * 7
  );

  await prisma.session.create({
    data: {
      token,
      userId,
      expiresAt,
    },
  });

  const cookieStore = await cookies();

  cookieStore.set(
    "session_token",
    token,
    {
      httpOnly: true,
      secure:
      process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    }
  );
}


export async function getCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("session_token")?.value;

  if (!token) {
    return null;
  }

  const session = await prisma.session.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });

  if (!session) {
    return null;
  }

  // Verificar expiración
  if (session.expiresAt < new Date()) {
    // Opcional: eliminar sesión expirada
    await prisma.session.delete({
      where: {
        id: session.id,
      },
    });

    return null;
  }

  return session.user;
}