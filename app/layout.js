import ThemeRegistry from "../theme/ThemeRegistry";
import "./globals.css";
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/common/ReduxProvider";
import AppComponent from "@/common/AppComponent";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={inter.className}>
          <ReduxProvider>
            <AppComponent>{children}</AppComponent>
          </ReduxProvider>
        </body>
      </ThemeRegistry>
    </html>
  );
}
