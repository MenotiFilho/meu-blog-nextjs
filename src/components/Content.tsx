import React from "react";
import RoundedButton from "./RoundedButton";

export default function Content() {
  return (
    <div>
      <div className="flex w-full gap-2 h-full">
        <div className="flex flex-col w-full p-5 bg-black border-1  rounded-3xl h-96">
          <RoundedButton href="/slugultimopost" label="Último post" />
        </div>

        <div className="flex flex-col w-full p-5 bg-yellow-600 rounded-3xl h-96">
          <RoundedButton href="/Projetos" label="Projetos" />
        </div>

        <div className="flex flex-col w-full p-5 bg-purple-400 rounded-3xl h-96">
          <RoundedButton href="/cv" label="Curriculo" />
        </div>
      </div>
    </div>
  );
}
