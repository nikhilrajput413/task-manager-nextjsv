import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("GET USER ERROR:", error);

    return NextResponse.json(
      { message: "Failed to fetch user" },
      { status: 500 }
    );
  }
}