import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Institution's Innovation Council (IIC) | Ministry of Education Initiative",
  description: "Fostering the culture of innovation, startup incubation, and entrepreneurship among students under the Ministry of Education Innovation Cell.",
  keywords: [
    "IIC",
    "Institution's Innovation Council",
    "Ministry of Education",
    "Innovation Cell",
    "MoE",
    "Startups",
    "Incubation",
    "Hackathon",
    "Entrepreneurship"
  ],
  icons: {
    icon: "/iic-logo.png",
  },
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
