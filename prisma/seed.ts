import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting survey seed...");

  await prisma.surveyAnswerOption.deleteMany();
  await prisma.surveyAnswer.deleteMany();
  await prisma.surveyResponse.deleteMany();
  await prisma.surveyOption.deleteMany();
  await prisma.surveyQuestion.deleteMany();
  await prisma.survey.deleteMany();

  const survey = await prisma.survey.create({
    data: {
      title: "Help us tailor your API access",
      description:
        "This quick survey helps ITRA understand your use case and grant you the right level of access.",
    },
  });

  // QUESTION 1
  await prisma.surveyQuestion.create({
    data: {
      surveyId: survey.id,
      questionId: "q1",
      questionText: "What is your intended use?",
      displayOrder: 1,
      questionTypeId: 1,
      options: {
        create: [
          {
            optionId: "trail-running",
            optionText: "Trail Running App or Platform",
            description:
              "Race management, coaching, athlete tracking, results display",
          },
          {
            optionId: "media",
            optionText: "Media, Analytics & Journalism",
            description:
              "Leaderboards, ranking insights, editorial data use",
          },
          {
            optionId: "academic",
            optionText: "Academic or Independent Research",
            description:
              "Sports science, data analysis, university project",
          },
          {
            optionId: "commercial",
            optionText: "Commercial Data Product",
            description:
              "Aggregating or redistributing ITRA data as part of a paid or monetised offering",
          },
          {
            optionId: "personal",
            optionText: "Personal or Hobbyist Project",
            description:
              "Private use, non-commercial experimentation",
          },
          {
            optionId: "other",
            optionText: "Other (please describe)",
            requiresAdditionalText: true,
          },
        ],
      },
    },
  });

  // QUESTION 2
  await prisma.surveyQuestion.create({
    data: {
      surveyId: survey.id,
      questionId: "q2",
      questionText:
        "Which ITRA data types do you need access to?",
      description:
        "Select all data types required for your use case.",
      displayOrder: 2,
      questionTypeId: 2,
      requiresAdditionalText: true,
      additionalTextLabel:
        "Please briefly describe how you plan to use the data selected above",
      options: {
        create: [
          {
            optionId: "runner-validation",
            optionText:
              "Runner Validation & Performance Index",
            description:
              "Verify runner eligibility and access ITRA Performance Index scores",
          },
          {
            optionId: "batch-runner",
            optionText: "Batch Runner Lookup",
            description:
              "Query multiple runner profiles in a single request",
          },
          {
            optionId: "race-calendar",
            optionText: "Race Calendar & Course Data",
            description:
              "Upcoming trail races, course information, ITRA points and difficulty evaluations",
          },
          {
            optionId: "historical-results",
            optionText: "Historical Results & Scores",
            description:
              "Past race finisher data, event results, scoring history",
          },
          {
            optionId: "webhooks",
            optionText: "Real-time Webhooks",
            description:
              "Notifications when a runner Performance Index updates or new race results are published. Phase 2 roadmap - not yet available.",
          },
          {
            optionId: "gpx",
            optionText: "GPX Track Data",
            description:
              "Access to course GPX files and route data. Phase 2 roadmap - not yet available.",
          },
        ],
      },
    },
  });

  /*
   * QUESTION 3
   * QUESTION 4
   *
   * Exact content was not included in the screenshots/code
   * provided, so add them once their actual text/options are available.
   */

  // QUESTION 5
  await prisma.surveyQuestion.create({
    data: {
      surveyId: survey.id,
      questionId: "q5",
      questionText:
        "Are you happy to be contacted by ITRA regarding your access request or future API developments?",
      displayOrder: 5,
      questionTypeId: 1,
      options: {
        create: [
          {
            optionId: "contact-future",
            optionText:
              "Yes - ITRA may contact me regarding my access request, onboarding support, and future API features",
          },
          {
            optionId: "contact-onboarding",
            optionText:
              "Yes - ITRA may contact me regarding my access request and onboarding only",
          },
          {
            optionId: "no-contact",
            optionText:
              "No - please do not contact me beyond the outcome of this access request",
          },
        ],
      },
    },
  });

  console.log("Survey seeded successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });