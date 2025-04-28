import React from "react";
import RoundedButton from "./RoundedButton";
import LatestPost from "./LatestPost";

export default function Content() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="flex flex-col gap-2 h-full lg:flex-row w-full lg:w-1/3">
        <LatestPost />
      </div>

      <div className="flex flex-col w-full lg:w-2/3 p-5 bg-yellow-600 rounded-3xl h-96">
        <RoundedButton href="/Projetos" label="Projetos" />
      </div>
    </div>
  );
}
