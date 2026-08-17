import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const tasks = await prisma.tasks.findMany({
      include: {
        categories: true,
        users: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to fetch tasks",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      title,
      description,
      categoryid,
      priority,
      status,
      duedate,
      notes,
    } = body;

    if (!title) {
      return NextResponse.json(
        { message: "Task Title is required." },
        { status: 400 }
      );
    }

    const task = await prisma.tasks.create({
      data: {
        title,
        description,
        categoryid: Number(categoryid),
        priority,
        status,
        duedate: duedate
          ? new Date(duedate)
          : null,
        notes,

        // Temporary User Id
        userid: 1,
      },
    });

    return NextResponse.json({
      message: "Task Created Successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Failed to create task.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    const {
      id,
      title,
      description,
      categoryid,
      priority,
      status,
      duedate,
      notes,
    } = body;

    if (!id || !title) {
      return NextResponse.json(
        { message: "Task Id and Title are required." },
        { status: 400 }
      );
    }

    const task = await prisma.tasks.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        categoryid: Number(categoryid),
        priority,
        status,
        duedate: duedate
          ? new Date(duedate)
          : null,
        notes,
      },
    });

    return NextResponse.json({
      message: "Task Updated Successfully",
      task,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update task." },
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
        { message: "Task Id is required." },
        { status: 400 }
      );
    }

    await prisma.tasks.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Task Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete task." },
      { status: 500 }
    );
  }
}