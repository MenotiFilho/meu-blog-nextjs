import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ICKFJ",
  description: "I could kill for a job",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.className}>
      <body className={`${inter.className} `}>
        <div className="flex flex-col min-h-screen bg-black text-amber-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-2">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
