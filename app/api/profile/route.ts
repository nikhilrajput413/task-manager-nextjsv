import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // TEMP: userId = 1 
    const userId = 1;

    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}