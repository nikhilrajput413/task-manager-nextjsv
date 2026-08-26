"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import SurveyQuestion from "@/components/survey/SurveyQuestion";
import SurveyProgressBar from "@/components/survey/SurveyProgressBar";

export default function SurveyPage() {

   const registerData =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("registerData") || "{}")
    : {};
    
  useEffect(() => {
  const data = localStorage.getItem("registerData");

  if (!data) {
    window.location.href = "/register";
  }
}, []);

  const router = useRouter();

  const [survey, setSurvey] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<any>({});

  const [showPreview, setShowPreview] =
    useState(false);

  const [editMode, setEditMode] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadSurvey();
  }, []);

async function loadSurvey() {
  try {
    const res = await fetch("/api/survey");

    if (!res.ok) {
      throw new Error("Failed to fetch survey");
    }

    const result = await res.json();

    console.log("SURVEY DATA 👉", result);

    setSurvey(result);

    setLoading(false); // IMPORTANT FIX
  } catch (error) {
    console.error(error);
    setLoading(false); //  ERROR CASE me bhi
  }
}
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading survey...
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="p-10">
        Survey not found.
      </div>
    );
  }

 const questions = survey?.questions ?? [];

if (questions.length === 0) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">
        No survey questions found.
      </p>
    </div>
  );
}

const currentQuestion = questions[currentIndex];

  const isLastQuestion =
    currentIndex === questions.length - 1;

  function handleOptionChange(
    questionId: string,
    optionId: string,
    multiple: boolean
  ) {
    setAnswers((prev: any) => {
      const existing =
        prev[questionId]?.option_ids ?? [];

      let newOptions;

      if (multiple) {
        newOptions = existing.includes(optionId)
          ? existing.filter(
              (id: string) => id !== optionId
            )
          : [...existing, optionId];
      } else {
        newOptions = [optionId];
      }

      return {
        ...prev,
        [questionId]: {
          ...prev[questionId],
          option_ids: newOptions,
        },
      };
    });
  }

  function handleTextChange(
    questionId: string,
    text: string
  ) {
    setAnswers((prev: any) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        additional_text: text,
      },
    }));
  }

  function isCurrentAnswered() {
    const answer =
      answers[currentQuestion.questionId];

    return (
      answer?.option_ids?.length > 0
    );
  }

  function handleNext() {
    if (editMode) {
      setEditMode(false);
      setShowPreview(true);
      return;
    }

    if (isLastQuestion) {
      setShowPreview(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  function handleEdit(index: number) {
    setShowPreview(false);
    setEditMode(true);
    setCurrentIndex(index);
  }

  async function handleSubmit() {
    try {
      const registerData = JSON.parse(
  localStorage.getItem("registerData") || "{}"
);
      const response = await fetch(
        "/api/survey/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            surveyId: survey.id,
            registerData,
           answers: questions.map((question : any) => ({
  questionId: question.id,   //  IMPORTANT FIX
  optionIds: answers[question.questionId]?.option_ids ?? [],
  additionalText: answers[question.questionId]?.additional_text ?? null,
})),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(
          result.message ||
            "Failed to submit survey"
        );
        return;
      }

      alert(
        "Survey submitted successfully!"
      );

      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 100px)",
        bgcolor: "grey.100",
        px: 3,
        py: 4,
      }}
    >
      {/* BACK */}
      <Typography
        onClick={() => router.push("/register")}
        sx={{
          cursor: "pointer",
          color: "primary.main",
          fontSize: 14,
          mb: 3,
        }}
      >
        ← Go to Register
      </Typography>

      {/* CARD */}
      <Box
        sx={{
          bgcolor: "white",
          width: "70%",
          maxWidth: 1000,
          margin: "auto",
          borderRadius: 3,
          boxShadow: 3,
          overflow: "hidden",
        }}
      >
        {/* HEADER */}
        <Box
          sx={{
            px: 3,
            py: 2,
            bgcolor: "success.50",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "success.dark",
            }}
          >
            🎯 Help us tailor your API access
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
          >
            This quick survey helps ITRA understand
            your use case and grant you the right
            level of access.
          </Typography>
        </Box>

        {/* PROGRESS */}
        <SurveyProgressBar
          currentIndex={currentIndex}
          total={questions.length}
          showPreview={showPreview}
          editMode={editMode}
        />

        {/* CONTENT */}
        <Box
          sx={{
            px: 3,
            py: 3,
            maxHeight: "65vh",
            overflowY: "auto",
          }}
        >
          {showPreview ? (
            <Review
              questions={questions}
              answers={answers}
              onEdit={handleEdit}
              onSubmit={handleSubmit}
            />
          ) : (
            <>
              <Typography
                variant="caption"
                color="text.secondary"
              >
                Question {currentIndex + 1} of{" "}
                {questions.length}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <SurveyQuestion
                  question={currentQuestion}
                  answer={
                    answers[
                      currentQuestion.questionId
                    ]
                  }
                  onOptionChange={
                    handleOptionChange
                  }
                  onTextChange={
                    handleTextChange
                  }
                />
              </Box>

              {/* BUTTONS */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  mt: 4,
                }}
              >
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  disabled={currentIndex === 0}
                  onClick={
                    handlePrevious
                  }
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Previous
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  endIcon={
                    <ArrowForwardIcon />
                  }
                  disabled={
                    !isCurrentAnswered()
                  }
                  onClick={handleNext}
                  sx={{
                    textTransform: "none",
                    fontWeight: 600,
                  }}
                >
                  {isLastQuestion ||
                  editMode
                    ? "Save & Review"
                    : "Next"}
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

/* REVIEW */

function Review({
  questions,
  answers,
  onEdit,
  onSubmit,
}: any) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold">
          Review Your Answers
        </h2>

        <p className="text-sm text-gray-500">
          Please review your responses before
          submitting.
        </p>
      </div>

      {questions.map(
        (question: any, index: number) => {
          const answer =
            answers[question.questionId];

          const selected =
            question.options.filter(
              (option: any) =>
                answer?.option_ids?.includes(
                  option.optionId
                )
            );

          return (
            <div
              key={question.id}
              className="p-4 bg-gray-50 border rounded-lg"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    Q{index + 1}.{" "}
                    {question.questionText}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    {selected.map(
                      (option: any) => (
                        <span
                          key={option.id}
                          className="px-3 py-1 border border-green-600 text-green-700 rounded-full text-xs"
                        >
                          {option.optionText}
                        </span>
                      )
                    )}
                  </div>

                  {answer?.additional_text && (
                    <div className="mt-3 p-3 bg-white border rounded">
                      <p className="text-xs text-gray-500">
                        Additional details:
                      </p>

                      <p className="text-sm mt-1">
                        {answer.additional_text}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onEdit(index)}
                  className="text-green-600 text-sm"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        }
      )}

      <button
        onClick={onSubmit}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
      >
        Submit
      </button>
    </div>
  );
}