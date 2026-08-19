import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    const updateData: any = {};

    if (body.firstName !== undefined) updateData.firstName = body.firstName;
    if (body.lastName !== undefined) updateData.lastName = body.lastName;
    if (body.applicantCategory !== undefined)
      updateData.applicantCategory = body.applicantCategory;
    if (body.organizationName !== undefined)
      updateData.organizationName = body.organizationName;
    if (body.country !== undefined) updateData.country = body.country;
    if (body.language !== undefined) updateData.language = body.language;

    const updatedUser = await prisma.users.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
}