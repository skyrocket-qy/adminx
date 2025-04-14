import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/header';
import LinkBar from '@/app/components/LinkBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <div className="h-7 bg-red-400">
          <Header />
        </div>
        <div className="flex h-full bg-pink-300">
          <main className="flex-auto h-full bg-purple-400">
            {children}
          </main>
          <div className="w-12 h-full bg-yellow-400">
            <LinkBar />
          </div>
        </div>
      </body>
    </html>
  );
}
