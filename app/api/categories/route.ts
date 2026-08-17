import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL CATEGORIES
export async function GET() {
  try {
    const categories = await prisma.categories.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}

// CREATE CATEGORY
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, color } = body;

    // Validation
    if (!name || name.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "Category name is required.",
        },
        { status: 400 }
      );
    }

    // Check duplicate category
    const existingCategory = await prisma.categories.findFirst({
      where: {
        name,
      },
    });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Category already exists.",
        },
        { status: 400 }
      );
    }

    const category = await prisma.categories.create({
      data: {
        userid: 1, // Temporary (later logged-in user ID)
        name: name.trim(),
        color,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully.",
        data: category,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create category.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const { id, name, color } = body;

    if (!id || !name) {
      return NextResponse.json(
        { message: "Id and Name are required." },
        { status: 400 }
      );
    }

    const category = await prisma.categories.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        color,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update category." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Category Id is required." },
        { status: 400 }
      );
    }

    await prisma.categories.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete category." },
      { status: 500 }
    );
  }
}