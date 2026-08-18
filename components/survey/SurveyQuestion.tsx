"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import SingleSelect from "./QuestionTypes/SingleSelect";
import MultiSelect from "./QuestionTypes/MultiSelect";

export default function SurveyQuestion({
  question,
  answer,
  onOptionChange,
  onTextChange,
}: any) {
  if (!question) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600 }}
        >
          {question.questionText}
        </Typography>

        {question.description && (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {question.description}
          </Typography>
        )}
      </Box>

      {question.questionTypeId === 1 ? (
        <SingleSelect
          question={question}
          answer={answer}
          onOptionChange={onOptionChange}
          onTextChange={onTextChange}
        />
      ) : (
        <MultiSelect
          question={question}
          answer={answer}
          onOptionChange={onOptionChange}
          onTextChange={onTextChange}
        />
      )}
    </Box>
  );
}