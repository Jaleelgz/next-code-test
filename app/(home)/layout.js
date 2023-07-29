import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({ children }) {
  return <div style={inter.style}>{children}</div>;
}
