import { notFound } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
// Importar tipos e a função getPosts (se for usar generateStaticParams)
import { getPostBySlug, getPosts, STRAPI_BASE_URL } from "@/lib/strapi"; // Importar a função centralizada

// Componente da Página do Post Individual
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound(); // Renderiza a página 404 do Next.js
  }

  // --- Obter dados da Imagem de Capa ---
  const coverData = post.coverImage;
  // Para a página do post, geralmente queremos a imagem original ou um formato grande
  const relativeImageUrl = coverData?.formats?.large?.url || coverData?.url;
  const imageUrl = relativeImageUrl
    ? `${STRAPI_BASE_URL}${relativeImageUrl}`
    : null;
  const imageAlt =
    coverData?.alternativeText || `Imagem de capa para ${post.title}`;
  const imageWidth = coverData?.width; // Largura original
  const imageHeight = coverData?.height; // Altura original

  const publicationDate = new Date(post.publishedAt).toLocaleDateString(
    "pt-BR",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }
  );

  return (
    // Aplicar classes 'prose' do @tailwindcss/typography para estilizar o conteúdo Markdown
    <article className="prose prose-stone dark:prose-invert max-w-3xl mx-auto px-4 pt-5 ">
      {/* Título do Post */}
      <h1 className="mb-2">{post.title}</h1>

      {/* Data de Publicação */}
      <p className="text-sm text-gray-600 dark:text-gray-400 !mt-0 !mb-6">
        Publicado em: {publicationDate}
      </p>

      {/* --- Imagem de Capa (se existir) --- */}
      {imageUrl && imageWidth && imageHeight && (
        <div className="relative w-full mb-8 aspect-[16/9]">
          {" "}
          {/* Manter proporção 16:9 ou outra */}
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill // Preenche o container
            style={{ objectFit: "cover" }} // Cobre a área
            priority // Marcar como prioridade para LCP (Largest Contentful Paint) na página do post
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 66vw"
          />
          {/* Alternativa se não quiser 'fill', usar width/height diretamente */}
          {/* <Image
               src={imageUrl}
               alt={imageAlt}
               width={imageWidth} // Usar largura original
               height={imageHeight} // Usar altura original
               priority
               className="rounded-lg shadow-md" // Estilos opcionais
           /> */}
        </div>
      )}

      {/* --- Conteúdo Markdown Renderizado --- */}
      {/* O plugin @tailwindcss/typography deve cuidar da estilização */}
      <ReactMarkdown>{post.content}</ReactMarkdown>

      {/* TODO: Adicionar seção de comentários (Giscus/Utterances) aqui */}
    </article>
  );
}

// (Opcional) Gerar Páginas Estáticas no Build (SSG)
// Isso melhora muito a performance para páginas de blog
export async function generateStaticParams() {
  try {
    // Busca todos os posts (ou apenas os slugs)
    const posts = await getPosts(); // Reutiliza a função da home page

    // Retorna um array de objetos, cada um com a propriedade 'slug'
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("Error generating static params for posts:", error);
    return []; // Retorna array vazio em caso de erro para não quebrar o build
  }
}
