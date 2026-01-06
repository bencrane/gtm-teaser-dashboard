import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ 
  subsets: ["latin"],
  variable: "--font-geist",
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Bullseye Revenue",
  description: "Identify warm leads from your customer network.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        geist.variable, 
        geistMono.variable,
        "font-sans antialiased min-h-screen bg-background text-foreground"
      )}>
        {children}
      </body>
    </html>
  );
}
