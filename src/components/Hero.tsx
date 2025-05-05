import React from "react";
import RoundedButton from "./RoundedButton";

export default function Hero() {
  return (
    <div className="flex justify-between items-center pt-15  w-full h-full rounded-4xl bg-gray-400 p-10 ">
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-start w-full">
          <h1 className="text-amber-50 text-6xl lg:text-8xl xl:text-9xl">
            Menoti Filho
          </h1>
        </div>
        <p className="text-amber-100 max-w-lg ml-1 text-xs lg:text-md xl:text-lg">
          Sou um desenvolvedor front‑end apaixonado por tecnologia. Com foco em
          React e Next.js, adoro transformar ideias em interfaces intuitivas,
          sempre buscando performance e acessibilidade.
        </p>
        <div className="w-2/5 ml-1 group">
          <RoundedButton
            href="/about"
            label="About"
            parentGroup
            as="a"
            defaultBgColor="bg-transparent"
            hoverBorderColor="border-amber-100"
          />
        </div>
      </div>
      {/*<div className="h-32 w-32 bg-white rounded-full hidden lg:block self-start mt-2"></div>*/}
    </div>
  );
}
