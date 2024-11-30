import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./Components/AuthProvider";
import ToasterProvider from "./Components/ToasterProvider";
import { Analytics } from "@vercel/analytics/react"
const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "FlashLink",
  description: "Create and share personalized flashcards with your social media links.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics/>
        <AuthProvider>
          {children}
          <ToasterProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
