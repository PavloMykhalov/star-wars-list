import { CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <CircularProgress 
      size="xl" 
      sx={{
        position: "absolute",
      }}
    />
  );
}