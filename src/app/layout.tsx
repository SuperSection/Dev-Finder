import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import Providers from "@/app/providers";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Dev Finder",
  description: "Web application to help pair programming with random devlopers online",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextTopLoader />
          <Header />
          {/* <div className="container mx-auto"> */}
            {children}
          {/* </div> */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
