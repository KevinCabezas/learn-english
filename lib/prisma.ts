// este es un arachivo central para crear una instancia del cliente
// para utilizarlo en cualquier lado y no cerar una instancia en cada archivo
// el cliente seria una conexion a la db y si haccemos un new PrismaClient 
// en cada archivo estaremos haciendo varias conexiones
// este file se crea a manopla

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

export const prismaCli = new PrismaClient({
  adapter,
});


export const prisma = prismaCli.$extends({
  model: {
    user: {
      async findForEmail(email: string) {
        const user = await prismaCli.user.findUnique({
          where: { email }, 
        });

        if (!user) {
          throw new Error(`user with email is nor registered`)
        }

        return user;
      },
    },
  },
});