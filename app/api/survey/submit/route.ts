import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { registerData, surveyId, answers } = body;

    // 🔥 1. CREATE USER FIRST
    const existingUser = await prisma.users.findUnique({
      where: { email: registerData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(
      registerData.password,
      10
    );

    const user = await prisma.users.create({
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

    // 🔥 2. SAVE SURVEY RESPONSE
    const response = await prisma.surveyResponse.create({
      data: {
        userId: user.id,
        surveyId: Number(surveyId),

        answers: {
          create: answers.map((answer: any) => ({
            questionId: answer.questionId,
            additionalText: answer.additionalText ?? null,

            options: {
              create: (answer.optionIds || []).map(
                (optionId: string) => ({
                  option: {
                    connect: {
                      questionId_optionId: {
                        questionId: answer.questionId,
                        optionId: optionId,
                      },
                    },
                  },
                })
              ),
            },
          })),
        },
      },
    });

    return NextResponse.json({
      success: true,
      userId: user.id,
      responseId: response.id,
    });
  } catch (error) {
    console.error("SUBMIT ERROR:", error);

    return NextResponse.json(
      { message: "Failed to submit survey" },
      { status: 500 }
    );
  }
}