"use client";
import { GithubLogo, LinkedinLogo, List } from "@phosphor-icons/react/dist/ssr";
import RoundedButton from "./RoundedButton";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black text-amber-100 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Botões principais */}
        <div className="flex gap-3 items-center w-full">
          {/* Home sempre visível, mesma largura */}
          <div className="border-amber-100 border-1 w-full sm:w-1/5 min-w-fit rounded-full p-1 mr-1">
            <RoundedButton href="/" label="Home" />
          </div>

          {/* Portfolio/Blog só no desktop/tablet */}
          <div
            className="border-amber-100 border-1 w-2/5 min-w-fit rounded-full p-1 flex gap-0.5
                          hidden sm:flex"
          >
            <RoundedButton href="/portfolio" label="Portfolio" />
            <RoundedButton href="/blog" label="Blog" />
          </div>
        </div>

        {/* Social só no desktop/tablet */}
        <div className="flex gap-0.5 hidden sm:flex">
          <Link
            href="https://github.com/MenotiFilho"
            className="border-1 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogo size={22} weight="fill" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/menoti-borri-filho/"
            className="border-1 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo size={22} weight="fill" />
          </Link>
        </div>

        {/* Botão menu mobile */}
        <div className="sm:hidden flex items-center">
          <div className="border-amber-100 border-1 w-2/5 min-w-fit rounded-full p-1">
            <button
              className="group flex justify-between items-center w-full rounded-full p-0.5 text-xl border-0 font-bold hover:text-black hover:bg-amber-100 transition-colors"
              onClick={() => setOpen(!open)}
            >
              <span className="ml-3 font-light">Menu</span>
              <span
                className="
                  flex items-center justify-center 
                  w-6 h-6 rounded-full 
                  bg-amber-100
                  text-black
                  group-hover:bg-black group-hover:text-amber-100 
                  transition-colors
                  mr-0.5
                "
              >
                <List size={22} weight="bold" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Dropdown do menu mobile */}
      {open && (
        <div className="sm:hidden fixed top-[72px] left-0 w-full bg-black border-t border-amber-100 z-40 p-4">
          <div className="flex flex-col items-center gap-2">
            <RoundedButton href="/portfolio" label="Portfolio" />
            <RoundedButton href="/blog" label="Blog" />

            <div className="flex gap-2 mt-2">
              <Link
                href="https://github.com/MenotiFilho"
                className="border-1 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo size={22} weight="fill" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/menoti-borri-filho/"
                className="border-1 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinLogo size={22} weight="fill" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
