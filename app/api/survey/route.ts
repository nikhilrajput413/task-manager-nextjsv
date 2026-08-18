import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    console.log("SURVEY API CALLED");

    const survey = await prisma.survey.findFirst({
      orderBy: {
        id: "desc",
      },
      include: {
        questions: {
          orderBy: {
            displayOrder: "asc",
          },
          include: {
            options: {
              orderBy: {
                id: "asc",
              },
            },
          },
        },
      },
    });

    console.log("SURVEY FROM DB:", survey);

    if (!survey) {
      return NextResponse.json({
        survey: null,
        questions: [],
      });
    }

    return NextResponse.json(survey);
  } catch (error) {
    console.error("SURVEY API ERROR:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch survey",
        error: String(error),
      },
      { status: 500 }
    );
  }
}