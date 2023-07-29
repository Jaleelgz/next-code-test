import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import React from "react";

const Loader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 101,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        <Paper
          sx={{
            p: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={30} />
        </Paper>
        <Typography sx={{ color: "#fff" }}>Loading</Typography>
      </Box>
    </Box>
  );
};

export default Loader;
