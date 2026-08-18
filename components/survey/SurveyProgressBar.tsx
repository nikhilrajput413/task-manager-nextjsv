"use client";

import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

export default function SurveyProgressBar({
  currentIndex,
  total,
  showPreview,
  editMode,
}: any) {
  const progress =
    showPreview || editMode
      ? 100
      : total
      ? ((currentIndex + 1) / total) * 100
      : 0;

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={progress}
        color="success"
        sx={{ height: 6 }}
      />

      <Box
        sx={{
          px: 3,
          pt: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="caption"
          color="text.secondary"
        >
          {showPreview
            ? "All questions answered"
            : editMode
            ? `Editing Question ${
                currentIndex + 1
              } of ${total}`
            : `Question ${
                currentIndex + 1
              } of ${total}`}
        </Typography>
      </Box>
    </Box>
  );
}