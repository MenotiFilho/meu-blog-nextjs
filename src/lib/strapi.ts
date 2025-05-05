import { Post, PortfolioEntry, StrapiApiResponse } from "@/types/strapi"; // Importar tipos

// Obter URLs das variáveis de ambiente
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
export const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_BASE_URL; // Exportar BASE_URL

// ----------------- Funções para Posts -----------------

// Função para buscar todos os posts
export async function getPosts(): Promise<Post[]> {
  if (!STRAPI_API_URL) {
    console.error("Strapi API URL not configured in environment variables.");
    return [];
  }
  const apiUrl = `${STRAPI_API_URL}/posts?sort=publishedAt:desc&populate=coverImage`;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
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
    return [];
  }
}

// Função para buscar um único post pelo slug
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!STRAPI_API_URL) {
    console.error("Strapi API URL not configured in environment variables.");
    return null;
  }
  const apiUrl = `${STRAPI_API_URL}/posts?filters[slug][$eq]=${slug}&populate=coverImage`;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Post with slug "${slug}" not found (404).`);
        return null;
      }
      console.error(
        `Failed to fetch post (${slug}): ${res.status} ${res.statusText}`
      );
      return null;
    }

    const response: StrapiApiResponse<Post> = await res.json();

    if (response && response.data && response.data.length > 0) {
      return response.data[0];
    } else {
      console.warn(`Post with slug "${slug}" not found in response data.`);
      return null;
    }
  } catch (error) {
    console.error(`Error in getPostBySlug (${slug}):`, error);
    return null;
  }
}

// Função para buscar o último post
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

// ----------------- Funções para Portfolio Entries -----------------

// Função para buscar todas as entradas do portfólio
export async function getPortfolioEntries(): Promise<PortfolioEntry[]> {
  if (!STRAPI_API_URL) {
    console.error("Strapi API URL not configured in environment variables.");
    return [];
  }

  const apiUrl = `${STRAPI_API_URL}/portfolio-entries?sort=createdAt:desc&populate=*`;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      console.error(
        `Failed to fetch portfolio entries: ${res.status} ${res.statusText}`
      );
      return [];
    }

    const response: StrapiApiResponse<PortfolioEntry> = await res.json();

    if (!response || !response.data) {
      console.warn(
        "Strapi response format unexpected or empty (getPortfolioEntries):",
        response
      );
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching portfolio entries:", error);
    return [];
  }
}

// Função para buscar uma entrada de portfólio por ID
export async function getPortfolioEntryById(
  id: string
): Promise<PortfolioEntry | null> {
  if (!STRAPI_API_URL) {
    console.error("Strapi API URL not configured in environment variables.");
    return null;
  }
  const apiUrl = `${STRAPI_API_URL}/portfolio-entries/${id}?populate=*`;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      if (res.status === 404) {
        console.warn(`Portfolio entry with ID "${id}" not found (404).`);
        return null;
      }
      console.error(
        `Failed to fetch portfolio entry (${id}): ${res.status} ${res.statusText}`
      );
      return null;
    }

    const response: { data: PortfolioEntry } = await res.json();

    if (!response || !response.data) {
      console.warn(`Portfolio entry with ID "${id}" not found in response.`);
      return null;
    }

    return response.data;
  } catch (error) {
    console.error(`Error in getPortfolioEntryById (${id}):`, error);
    return null;
  }
}
