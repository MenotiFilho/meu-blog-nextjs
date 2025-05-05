"use client";
import { GithubLogo, LinkedinLogo, List } from "@phosphor-icons/react/dist/ssr";
import RoundedButton from "./RoundedButton";
import Link from "next/link";
import { useState } from "react";
import { Envelope } from "@phosphor-icons/react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-black text-amber-100 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto p-4 flex gap-3 justify-between items-center">
        {/* Botões principais */}
        <div className="flex gap-3 items-center w-full ">
          {/* Home sempre visível, mesma largura */}
          <div className="border-amber-100 border-2 w-full sm:w-3/5 lg:max-w-1/5 min-w-fit rounded-full p-1 mr-1 group">
            <RoundedButton href="/" label="Home" parentGroup as="a" />
          </div>

          {/* Portfolio/Blog só no desktop/tablet */}
          <div
            className="border-amber-100 border-2 w-2/5 sm:w-full lg:w-2/5 rounded-full p-1  gap-0.5
                          hidden sm:flex "
          >
            <div className="group w-full lg:w-1/2">
              <RoundedButton
                href="/portfolio"
                label="Portfolio"
                parentGroup
                as="a"
              />
            </div>
            <div className="group w-full lg:w-1/2">
              <RoundedButton href="/blog" label="Blog" parentGroup as="a" />
            </div>
          </div>
        </div>

        {/* Social só no desktop/tablet */}
        <div className=" gap-0.5 hidden sm:flex">
          <Link
            href="https://github.com/MenotiFilho"
            className="border-2 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogo size={22} weight="fill" />
          </Link>
          <Link
            href="https://www.linkedin.com/in/menoti-borri-filho/"
            className="border-2 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo size={22} weight="fill" />
          </Link>
          <Link
            href={"mailto:menotimfilho@gmail.com"}
            className="border-2 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Envelope size={22} />
          </Link>
        </div>

        {/* Botão menu mobile */}
        <div className="sm:hidden flex items-center">
          <div className="border-amber-100 border-2 w-2/5 min-w-fit rounded-full p-1">
            <button
              className="group flex justify-between items-center w-full rounded-full gap-2 p-0.5 text-xl border-2 font-bold hover:text-black hover:bg-amber-100 transition-colors"
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
            <div className="w-full group">
              <RoundedButton
                href="/portfolio"
                label="Portfolio"
                parentGroup
                as="a"
              />
            </div>
            <div className="w-full group">
              <RoundedButton href="/blog" label="Blog" parentGroup as="a" />
            </div>

            <div className="flex gap-2 mt-2">
              <Link
                href="https://github.com/MenotiFilho"
                className="border-2 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubLogo size={22} weight="fill" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/menoti-borri-filho/"
                className="border-2 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
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
