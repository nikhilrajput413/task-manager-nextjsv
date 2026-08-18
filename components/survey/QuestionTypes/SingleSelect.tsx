"use client";

import Radio from "@mui/material/Radio";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function SingleSelect({
  question,
  answer,
  onOptionChange,
  onTextChange,
}: any) {
  const selectedId = answer?.option_ids?.[0];

  const otherOption = question.options.find(
    (o: any) =>
      o.requiresAdditionalText &&
      selectedId === o.optionId
  );

  const textValue = answer?.additional_text ?? "";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
      {question.options.map((option: any) => {
        const selected =
          selectedId === option.optionId;

        return (
          <Box
            key={option.id}
            onClick={() =>
              onOptionChange(
                question.questionId,
                option.optionId,
                false
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
              transition: "all .2s",
              "&:hover": {
                borderColor: "success.main",
              },
            }}
          >
            <Radio
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

      {otherOption && (
        <TextField
          fullWidth
          multiline
          rows={3}
          size="small"
          label="Please describe..."
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