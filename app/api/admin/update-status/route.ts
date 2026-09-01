import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, action } = body;

    const id = Number(userId); // important fix

    let updatedUser;

    if (action === "approve") {
      updatedUser = await prisma.users.update({
        where: { id: id },
        data: { isApproved: true },
      });
   } else if (action === "reject") {

  // 1. Delete related SurveyResponse
  await prisma.surveyResponse.deleteMany({
    where: { userId: userId },
  });

  // 2. Now delete user
  updatedUser = await prisma.users.delete({
    where: { id: userId },
  });
}

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });

  } catch (error: any) {
    console.error("ERROR:", error); // ADD THIS

    return NextResponse.json(
      { message: error.message || "Update failed" },
      { status: 500 }
    );
  }
}