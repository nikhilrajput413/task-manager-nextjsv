import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(request: Request) {

  const body = await request.json();

  const { email, password } = body;

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid Email or Password" },
      { status: 401 }
    );
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Invalid Email or Password" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set(
    "user_session",
    JSON.stringify({
      id: user.id,
      // name: user.name,
      email: user.email,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    }
  );

  return NextResponse.json({
    message: "Login Successful",
    user: {
      id: user.id,
      // name: user.name,
      email: user.email,
    },
  });
}