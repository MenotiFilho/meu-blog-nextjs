import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

interface RoundedButtonProps {
  href: string;
  label: string;
}

export default function RoundedButton({ href, label }: RoundedButtonProps) {
  return (
    <Link
      href={href}
      className="group flex justify-between items-center w-full rounded-full p-0.5 text-xl border-1 border-amber-100 font-bold hover:text-black hover:bg-amber-100 transition-colors"
    >
      <p className="ml-3 font-light">{label}</p>
      <div
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
        <ArrowRight size={22} />
      </div>
    </Link>
  );
}
