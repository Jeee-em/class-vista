import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionWrapper } from "@/components/session-wrapper";
import { auth } from "@/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ClassVista - Educational Management System",
  description: "Student performance tracking and analytics platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper session={session}>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
