import { Box, Typography } from "@mui/material";

export const metadata = {
  title: "Home",
  description: "Home page",
};

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
      }}
    >
      <Typography sx={{ fontWeight: "bold" }}>Welcome to Home!</Typography>
    </Box>
  );
};

export default Home;
