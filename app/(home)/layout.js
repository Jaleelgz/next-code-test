import { Inter } from "next/font/google";
import HomeLayout from "@/components/HomeLayout/HomeLayout";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }) {
  return <HomeLayout>{children}</HomeLayout>;
}
