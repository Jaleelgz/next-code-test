import ThemeRegistry from "../theme/ThemeRegistry";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/common/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={inter.className}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </ThemeRegistry>
    </html>
  );
}
