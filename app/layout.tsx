import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChullSheet",
  description: "AI-powered workspace for developers and students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} ${plusJakartaSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className="h-full bg-background text-foreground font-sans">
          {children}
          <Toaster position="top-center" />
        </body>
      </html>
    </ClerkProvider>
  );
}
