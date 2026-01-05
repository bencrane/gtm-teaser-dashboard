import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTM Teaser Dashboard",
  description: "A professional dashboard for GTM insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "antialiased min-h-screen bg-background")}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-screen-xl mx-auto flex h-14 items-center px-4 sm:px-6 lg:px-8">
              <div className="mr-4 hidden md:flex">
                <a className="mr-6 flex items-center space-x-2" href="/">
                  <span className="hidden font-bold sm:inline-block">
                    Dashboard
                  </span>
                </a>
                <nav className="flex items-center space-x-6 text-sm font-medium">
                  <a
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="#"
                  >
                    Overview
                  </a>
                  <a
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    href="#"
                  >
                    Analytics
                  </a>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">
             <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
