"use client";

import React, { useEffect, useState } from "react";
import RoundedButton from "./RoundedButton";
import { PortfolioEntry } from "@/types/strapi";
import { getPortfolioEntries } from "@/lib/strapi";
import Image from "next/image";

export default function ProjetosCard() {
  const [projects, setProjects] = useState<PortfolioEntry[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      const entries = await getPortfolioEntries();
      if (entries.length > 0) {
        setProjects(entries.slice(0, 2)); // Seleciona os dois últimos projetos
      }
    }
    fetchProjects();
  }, []);

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center w-full lg:w-2/3 p-5 bg-yellow-600 rounded-3xl h-96">
        <p className="text-white">Carregando projetos...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full lg:w-2/3 p-5 bg-yellow-600 rounded-3xl  ">
      {/* Botão para redirecionar ao portfólio */}
      <div className="group">
        <RoundedButton
          href="/portfolio"
          label="Portfólio"
          parentGroup
          as="a"
          defaultTextColor="text-black"
          defaultBgColor="transparent"
          hoverTextColor="text-amber-100"
          hoverBgColor="bg-black"
          defaultBorderColor="border-black"
          iconColor="text-amber-100"
          hoverIconColor="text-black"
          iconBgColor="bg-black"
          hoverIconBgColor="bg-amber-100"
        />
      </div>

      {/* Exibição dos dois últimos projetos */}
      <div className="flex flex-col lg:flex-row gap-4 mt-4 h-full">
        {projects.map((project) => {
          const imageUrl =
            project.Image && project.Image.length > 0
              ? `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}${project.Image[0].url}`
              : null;

          return (
            <div
              key={project.id}
              className="flex flex-col w-full lg:w-1/2 border-1 border-black rounded-2xl hover:shadow-lg transition-all"
            >
              {/* Imagem do projeto */}
              {imageUrl && (
                <div className="relative w-full h-40 rounded-t-xl overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={
                      project.Image?.[0]?.alternativeText ||
                      project.Title ||
                      "Imagem do projeto"
                    }
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
              )}

              {/* Detalhes do projeto */}
              <div className="p-2">
                <h1 className="mt-1 text-black text-lg font-bold">
                  {project.Title}
                </h1>
                <p className="text-black mt-2 line-clamp-4 text-xs">
                  {project.Resumo}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
