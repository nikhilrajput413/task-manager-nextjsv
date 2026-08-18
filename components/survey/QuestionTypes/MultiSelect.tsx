"use client";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MultiSelect({
  question,
  answer,
  onOptionChange,
  onTextChange,
}: any) {
  const selectedIds = answer?.option_ids ?? [];

  const textValue =
    answer?.additional_text ?? "";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {question.options.map((option: any) => {
        const selected =
          selectedIds.includes(option.optionId);

        return (
          <Box
            key={option.id}
            onClick={() =>
              onOptionChange(
                question.questionId,
                option.optionId,
                true
              )
            }
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.5,
              borderRadius: 2,
              border: "1px solid",
              borderColor: selected
                ? "success.main"
                : "grey.300",
              bgcolor: selected
                ? "success.50"
                : "background.paper",
              cursor: "pointer",
            }}
          >
            <Checkbox
              checked={selected}
              color="success"
              size="small"
            />

            <Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: selected ? 600 : 400,
                }}
              >
                {option.optionText}
              </Typography>

              {option.description && (
                <Typography
                  variant="caption"
                  color="text.secondary"
                >
                  {option.description}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}

      {question.requiresAdditionalText && (
        <TextField
          fullWidth
          multiline
          rows={3}
          size="small"
          label={
            question.additionalTextLabel ??
            "Please describe..."
          }
          value={textValue}
          onChange={(e) =>
            onTextChange(
              question.questionId,
              e.target.value
            )
          }
        />
      )}
    </Box>
  );
}