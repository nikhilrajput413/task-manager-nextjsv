import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const survey = await prisma.survey.findFirst({
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            displayOrder: "asc",
          },
        },
      },
    });

    return NextResponse.json(survey);

  } catch (error) {
    console.error("SURVEY ERROR:", error);
    return NextResponse.json(
      { message: "Failed to load survey" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { registerData, surveyId, answers } = body;

    // 🔴 VALIDATION
    if (!registerData || !surveyId || !answers) {
      return NextResponse.json(
        { message: "Missing required data" },
        { status: 400 }
      );
    }

    // 🔴 CHECK USER EXISTS
    const existingUser = await prisma.users.findUnique({
      where: { email: registerData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    //  HASH PASSWORD
    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    //  TRANSACTION (VERY IMPORTANT)
    const result = await prisma.$transaction(async (tx) => {
      // 👤 CREATE USER
      const user = await tx.users.create({
        data: {
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
          password: hashedPassword,
          applicantCategory: registerData.applicantCategory,
          organizationName: registerData.organizationName,
          website: registerData.website,
          country: registerData.country,
          language: registerData.language,
        },
      });

      //  SAVE SURVEY RESPONSE
      await tx.surveyResponse.create({
        data: {
          userId: user.id,
          surveyId: Number(surveyId),

          answers: {
            create: answers.map((a: any) => ({
              questionId: a.questionId,
              additionalText: a.additionalText || null,

              options: {
                create: (a.optionIds || []).map((optionId: string) => ({
                  option: {
                    connect: {
                      questionId_optionId: {
                        questionId: a.questionId,
                        optionId: optionId,
                      },
                    },
                  },
                })),
              },
            })),
          },
        },
      });

      return user;
    });

    //  SUCCESS RESPONSE
    return NextResponse.json({
      success: true,
      userId: result.id,
      message: "User registered & survey submitted",
    });

  } catch (err: any) {
    console.error("SUBMIT ERROR:", err);

    return NextResponse.json(
      {
        message: "Failed to submit survey",
        error: err.message,
      },
      { status: 500 }
    );
  }
}