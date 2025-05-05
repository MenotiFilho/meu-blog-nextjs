import React from "react";
import LatestPost from "./LatestPost";
import ProjetosCard from "./ProjetosCard";

export default function Content() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row">
      <div className="flex flex-col gap-2 h-full lg:flex-row w-full lg:w-1/3">
        <LatestPost />
      </div>

      <ProjetosCard />
    </div>
  );
}
