import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { registerData, surveyId, answers } = body;

    //  CREATE USER
    const hashedPassword = await bcrypt.hash(registerData.password, 10);

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

    //  SAVE SURVEY
    await prisma.surveyResponse.create({
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

    return NextResponse.json({
      success: true,
      userId: user.id, //  IMPORTANT
    });
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    return NextResponse.json(
      { message: "Failed to submit survey" },
      { status: 500 }
    );
  }
}