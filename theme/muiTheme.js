import { COLORS } from "@/constants/colors";
import { createTheme } from "@mui/material/styles";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: COLORS.PRIMARY,
    },
    background: {
      default: COLORS.WHITE,
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
  },
});
