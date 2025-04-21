import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="pt-BR">
      <body
        className={`${inter.className} bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        {" "}
        {/* Estilos base para body */}
        <div className="flex flex-col min-h-screen">
          {" "}
          {/* Container principal para layout sticky footer */}
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {" "}
            {/* 3. Envolver 'children' com 'main' e adicionar padding */}
            {children}{" "}
            {/* 'children' representa o conteúdo da página atual (ex: page.tsx ou posts/[slug]/page.tsx) */}
          </main>
          {/* Você pode adicionar um Footer aqui também, se desejar */}
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
