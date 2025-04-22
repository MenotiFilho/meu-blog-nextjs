import { GithubLogo, LinkedinLogo } from "@phosphor-icons/react/dist/ssr";
import RoundedButton from "./RoundedButton";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black text-amber-100 shadow-md sticky top-0 z-50">
      {" "}
      {/* Sticky header */}
      <nav className="container mx-auto px-4 pt-2 pb-1 flex justify-between items-center">
        {/* Logo/Nome do Blog */}
        <div className="flex gap-3 items-center w-full">
          <div className="border-amber-100 border-1 w-1/5 min-w-fit rounded-full p-1">
            <RoundedButton href="/" label="Home" />
          </div>
          <div className="border-amber-100 border-1 w-2/5 min-w-fit rounded-full p-1 flex gap-0.5">
            <RoundedButton href="/portfolio" label="Portfolio" />
            <RoundedButton href="/blog" label="Blog" />
          </div>
        </div>
        <div className="flex gap-0.5">
          <Link
            href={"https://github.com/MenotiFilho"}
            className=" border-1 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogo size={22} weight="fill" />
          </Link>
          <Link
            href={"https://www.linkedin.com/in/menoti-borri-filho/"}
            className=" border-1 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo size={22} weight="fill" />
          </Link>
        </div>
      </nav>
    </header>
  );
}
