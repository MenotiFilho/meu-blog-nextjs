import { Post, StrapiApiResponse } from "@/types/strapi"; // Importar tipos

// Obter URLs das variáveis de ambiente
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
// Exportar a BASE_URL para ser usada também nos componentes que precisam dela
export const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL;

// Função para buscar todos os posts
export async function getPosts(): Promise<Post[]> {
  if (!STRAPI_API_URL) {
    console.error("Strapi API URL not configured in environment variables.");
    return [];
  }
  // Adicionar &populate=coverImage para incluir os dados da imagem na resposta
  const apiUrl = `${STRAPI_API_URL}/posts?sort=publishedAt:desc&populate=coverImage`;

  try {
    // Ajuste a estratégia de cache conforme necessário para produção
    // Ex: { next: { revalidate: 60 } } para ISR
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      // Retornar vazio para generateStaticParams não quebrar o build em caso de erro na API
      return [];
    }

    const response: StrapiApiResponse<Post> = await res.json();

    if (!response || !response.data) {
      console.warn(
        "Strapi response format unexpected or empty (getPosts):",
        response
      );
      return [];
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return []; // Retorna array vazio em caso de erro de fetch/parse
  }
}

// Função para buscar um único post pelo slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!STRAPI_API_URL) {
    console.error("Strapi API URL not configured in environment variables.");
    return null;
  }
  // Adicionar &populate=coverImage para incluir dados da imagem
  // Confirme se 'filters[slug][$eq]' é o filtro correto para sua API
  const apiUrl = `${STRAPI_API_URL}/posts?filters[slug][$eq]=${slug}&populate=coverImage`;

  try {
    // Ajuste a estratégia de cache conforme necessário
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Post with slug "${slug}" not found (404).`);
        return null; // Retorna null explicitamente para 404
      }
      // Logar outros erros mas retornar null para não quebrar a página
      console.error(
        `Failed to fetch post (${slug}): ${res.status} ${res.statusText}`
      );
      return null;
    }

    const response: StrapiApiResponse<Post> = await res.json();

    if (response && response.data && response.data.length > 0) {
      return response.data[0]; // Retorna o post encontrado
    } else {
      // Pode acontecer se a API retornar 200 OK mas com data: []
      console.warn(`Post with slug "${slug}" not found in response data.`);
      return null;
    }
  } catch (error) {
    console.error(`Error in getPostBySlug (${slug}):`, error);
    return null; // Retorna null em caso de erro de fetch/parse
  }
}
//funcao para buscar o ultimo post
export async function getLatestPost(): Promise<Post | null> {
  const apiUrl = `${STRAPI_API_URL}/posts?sort=publishedAt:desc&pagination[limit]=1&populate=coverImage`;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    if (!res.ok) return null;
    const response: StrapiApiResponse<Post> = await res.json();
    return response.data && response.data.length ? response.data[0] : null;
  } catch (err) {
    console.error("Erro ao buscar o último post:", err);
    return null;
  }
}
