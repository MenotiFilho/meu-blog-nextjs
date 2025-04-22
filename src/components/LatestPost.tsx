import React from "react";
import RoundedButton from "./RoundedButton";
import { getLatestPost } from "@/lib/strapi";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

export default async function LatestPost() {
  const latestPost = await getLatestPost();

  // Monte a URL da imagem
  const cover = latestPost?.coverImage;
  const relativeUrl = cover?.formats?.large?.url || cover?.url;
  const imageUrl = relativeUrl
    ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${relativeUrl}`
    : null;

  // Pegue só um pequeno trecho do conteúdo
  const excerpt = latestPost?.content
    ? latestPost.content.slice(0, 130) +
      (latestPost.content.length > 130 ? "..." : "")
    : "";

  return (
    <div className="group flex flex-col w-full p-5 bg-black border-1 rounded-3xl h-96">
      <RoundedButton
        href={`/posts/${latestPost?.slug}`}
        label="Último post"
        parentGroup
      />

      {imageUrl && (
        <div className="relative w-full flex-1 my-3 rounded-2xl overflow-hidden">
          <Image
            src={imageUrl}
            alt={cover?.alternativeText || latestPost?.title || "Capa do post"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 400px"
            priority
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      <h1 className="mt-2">{latestPost?.title}</h1>
      <div className="prose prose-sm prose-invert dark:prose-invert mt-2 line-clamp-3">
        <ReactMarkdown>{excerpt}</ReactMarkdown>
      </div>
    </div>
  );
}
