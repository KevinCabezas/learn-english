import { NextResponse } from "next/server";
import { prismaCli } from "@/lib/prisma";


export async function createUser(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required"},
        { status: 400 },
      );
    }

    const newUser = await prismaCli.user.create({
      data: { name, email }
    })
    
    return NextResponse.json(newUser, { status: 201 });

  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "This email is already registered"},
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error"},
      { status: 500 }
    );
  }
}