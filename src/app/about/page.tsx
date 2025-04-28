import {
  Envelope,
  GithubLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import React from "react";

interface Curriculo {
  Nome: string;
  Cidade: string;
  Resumo: string;
  Objetivos: string;
  Email: string;
  GitProfile: string;
  LinkedinLink: string;
  Experiencia: Array<{
    Cargo: string;
    Empresa: string;
    Inicio: string;
    Fim: string | null;
    Atribuicoes: string | null; // Adicionado para exibir atribuições
  }>;
  Formacao: {
    Curso: string;
    Instituicao: string;
    Inicio: string;
    Fim: string;
    Cidade: string;
  };
  HardSkills: Array<{
    Skill: string;
  }>;
  Idioma: Array<{
    Skill: string;
    Nivel: string;
  }>;
  CursosLivres: Array<{
    Nome: string;
    Instituicao: string | null;
    Local: string;
    Inicio: string;
    Fim: string | null;
    Resumo: string;
  }>;
}

async function fetchCurriculo(): Promise<Curriculo> {
  const response = await fetch(
    "http://localhost:1337/api/curricula/k83un8xxjn4q917db8ghy29u?populate=*",
    { cache: "no-store" }
  );
  if (!response.ok) {
    throw new Error("Erro ao carregar o currículo");
  }
  const data = await response.json();
  return data.data;
}

export default async function AboutPage() {
  const curriculo = await fetchCurriculo();

  return (
    <main className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-amber-50 text-6xl lg:text-8xl xl:text-9xl">
        Menoti Filho
      </h1>
      {/* Contato */}
      <section>
        <div className="gap-0.5 hidden sm:flex">
          <Link
            href={curriculo.GitProfile}
            className="border-1 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubLogo size={22} weight="fill" />
          </Link>
          <Link
            href={curriculo.LinkedinLink}
            className="border-1 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo size={22} weight="fill" />
          </Link>
          <Link
            href={`mailto:${curriculo.Email}`}
            className="border-1 rounded-full p-2 hover:text-black hover:bg-amber-100 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Envelope size={22} />
          </Link>
        </div>
      </section>
      {/* Resumo Profissional */}
      <section>
        <h1 className="text-3xl font-bold mb-2">Sobre Mim</h1>
        <div className="ml-3">
          <p>{curriculo.Resumo}</p>
          <p className="mt-2 ">
            <strong>Objetivos:</strong> {curriculo.Objetivos}
          </p>
        </div>
      </section>

      {/* Formação Acadêmica */}
      <section className="grid lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold mb-2">Formação</h2>
          <div className="ml-3">
            <p>
              <strong>Curso:</strong> {curriculo.Formacao.Curso}
            </p>
            <p>
              <strong>Instituição:</strong> {curriculo.Formacao.Instituicao}
            </p>
            <p>
              <strong>Cidade:</strong> {curriculo.Formacao.Cidade}
            </p>
            <p>
              <strong>Período:</strong>{" "}
              {new Date(curriculo.Formacao.Inicio).toLocaleDateString("pt")} -{" "}
              {new Date(curriculo.Formacao.Fim).toLocaleDateString("pt")}
            </p>
          </div>
        </div>

        {/* Experiência Profissional */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Experiência</h2>
          {curriculo.Experiencia.map((exp) => (
            <div key={exp.Cargo} className="mb-3 ml-3">
              <div className="flex gap-3">
                <p>
                  <strong>Cargo:</strong> {exp.Cargo} - {exp.Empresa}
                </p>
              </div>
              <p>
                <strong>Período:</strong>{" "}
                {new Date(exp.Inicio).toLocaleDateString("pt")} -{" "}
                {exp.Fim
                  ? new Date(exp.Fim).toLocaleDateString("pt")
                  : "Atualmente"}
              </p>
              {exp.Atribuicoes && (
                <div className="mt-2">
                  <ul className="list-disc ml-4 text-sm">
                    {exp.Atribuicoes.split("\n").map((attr, index) => (
                      <li key={index}>{attr.trim()}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Habilidades */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Habilidades</h2>
        <ul className="list-none pl-3 grid grid-cols-3 gap-y-2">
          {curriculo.HardSkills.map((skill) => (
            <li key={skill.Skill}>{skill.Skill}</li>
          ))}
        </ul>
      </section>

      {/* Idiomas */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Idiomas</h2>
        <ul className="list-none pl-3 grid lg:grid-cols-3 gap-y-2">
          {curriculo.Idioma.map((idioma) => (
            <li key={idioma.Skill}>
              {idioma.Skill} - {idioma.Nivel}
            </li>
          ))}
        </ul>
      </section>

      {/* Cursos Livres */}
      <section>
        <h2 className="text-2xl font-bold mb-2">Cursos Livres</h2>
        <div className="grid lg:grid-cols-3 pl-3 gap-3">
          {curriculo.CursosLivres.map((curso) => {
            const inicio = new Date(curso.Inicio).toLocaleDateString("pt");
            const fim = curso.Fim
              ? new Date(curso.Fim).toLocaleDateString("pt")
              : null;

            return (
              <div key={curso.Nome} className="mb-3">
                <p>
                  <strong>Nome:</strong> {curso.Nome}
                </p>
                <p>
                  <strong>Instituição:</strong>{" "}
                  {curso.Instituicao || "Não informado"}
                </p>
                <p>
                  <strong>Resumo:</strong> {curso.Resumo}
                </p>
                <p>
                  <strong>Local:</strong> {curso.Local}
                </p>
                <p>
                  <strong>Data: </strong>
                  {fim && inicio === fim ? (
                    <span>{inicio}</span>
                  ) : (
                    <span>
                      {inicio}
                      {fim ? ` - ${fim}` : " (Em andamento)"}
                    </span>
                  )}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
