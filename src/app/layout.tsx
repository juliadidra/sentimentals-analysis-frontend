import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner"

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sentimental Analysis",
  description: "A Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " w-full min-h-screen flex"}>
        <ThemeProvider attribute="class">
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
