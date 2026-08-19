import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//  GET USER BY ID
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "User id required" },
        { status: 400 }
      );
    }

    const user = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching user" },
      { status: 500 }
    );
  }
}

//  UPDATE USER
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { message: "User id required" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.users.update({
      where: { id: Number(body.id) },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        applicantCategory: body.applicantCategory,
        organizationName: body.organizationName,
        country: body.country,
        language: body.language,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Update failed" },
      { status: 500 }
    );
  }
}