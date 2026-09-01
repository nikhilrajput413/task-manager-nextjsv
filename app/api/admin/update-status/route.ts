import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, action } = body;

    let updatedUser;

    if (action === "approve") {
      updatedUser = await prisma.users.update({
        where: { id: userId },
        data: { isApproved: true },
      });
    } else if (action === "reject") {
      updatedUser = await prisma.users.delete({
        where: { id: userId },
      });
    }

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}