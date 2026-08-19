import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      firstName,
      lastName,
      email,
      password,
      applicantCategory,
      organizationName,
      website,
      country,
      language,
    } = body;

    // Check existing user
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already exists"},
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
 const user = await prisma.users.create({
  data: {
    firstName,
    lastName,
    email,
    password: hashedPassword,
    applicantCategory,
    organizationName,
    website,
    country,
    language,
  },
});

    return NextResponse.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}