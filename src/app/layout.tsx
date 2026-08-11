import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Institution Innovation Council | IIC",
  description: "Fostering the culture of innovation and entrepreneurship among students. Join the Institution Innovation Council.",
  keywords: ["IIC", "Institution Innovation Council", "Innovation", "Entrepreneurship", "Students", "Startup"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        {children}
      </body>
    </html>
  );
}
