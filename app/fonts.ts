import { Inter } from "next/font/google";
import localFont from "next/font/local";

// Shared next/font instances so app/[locale]/layout.tsx and
// app/global-not-found.tsx (which bypasses all layouts) stay typographically identical.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const fontClasses = `${inter.variable} ${geistMono.variable}`;
