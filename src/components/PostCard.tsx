import { Post } from "@/types/strapi";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";

interface PostHomeProps {
  post: Post;
}

const STRAPI_BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_BASE_URL || "http://localhost:1337";

export default function PostCard({ post }: PostHomeProps) {
  const publicationDate = new Date(post.publishedAt).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  const coverData = post.coverImage;

  const relativeImageUrl = coverData?.formats?.small?.url || coverData?.url;

  const imageUrl = relativeImageUrl
    ? `${STRAPI_BASE_URL}${relativeImageUrl}`
    : null;

  const imageAlt =
    coverData?.alternativeText || `Imagem de capa para ${post.title}`;

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-gray-600/50 transition-shadow duration-200 bg-white dark:bg-gray-800 overflow-hidden">
      <Link href={`/posts/${post.slug}`} className="block group">
        {/* --- Imagem de Capa --- */}
        {imageUrl && ( // Renderizar somente se a URL da imagem existir
          <div className="relative w-full h-48 sm:h-56">
            {" "}
            {/* Container com altura fixa */}
            <Image
              src={imageUrl} // Usar a URL obtida
              alt={imageAlt}
              fill // Faz a imagem preencher o container div
              style={{ objectFit: "cover" }} // Garante que a imagem cubra a área sem distorcer
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Ajuda o Next.js a otimizar
              priority={false} // Pode definir como 'true' para as primeiras imagens da lista (LCP)
            />
          </div>
        )}

        {/* --- Conteúdo de Texto (Título, Data, Trecho) --- */}
        <div className="p-4 md:p-6">
          {" "}
          {/* Adicionar padding ao redor do texto */}
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2 transition-colors">
            {post.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            Publicado em: {publicationDate}
          </p>
          {/* --- Trecho do Post Renderizado --- */}
          <div className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {" "}
            {/* line-clamp limita a 3 linhas */}
            <ReactMarkdown
              // Evitar elementos grandes/complexos no trecho
              disallowedElements={[
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "img",
                "pre",
                "code",
                "a",
                "ul",
                "ol",
              ]}
              unwrapDisallowed={true} // Tentar renderizar o conteúdo de elementos não permitidos
            >
              {/* Pegar apenas uma parte do conteúdo para o trecho */}
              {post.content.substring(0, 180) +
                (post.content.length > 180 ? "..." : "")}
            </ReactMarkdown>
          </div>
        </div>
      </Link>
    </div>
  );
}
