// Interface para os formatos de mídia (thumbnail, small, etc.)
// Esta interface parece correta com base no JSON
export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes?: number; // Adicionado porque estava no JSON
  url: string; // URL relativa do formato específico
}

// Interface para o objeto coverImage como ele aparece no JSON
// (Combina ID, atributos e formatos diretamente)
export interface CoverImageData {
  id: number;
  documentId: string; // Adicionado baseado no JSON
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    // Objeto contendo os diferentes tamanhos/formatos
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number; // Adicionado baseado no JSON (tamanho original?)
  url: string; // URL relativa da imagem original
  previewUrl: string | null;
  provider: string;
  provider_metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string; // Adicionado baseado no JSON
}

// --- Atualizar a Interface Post ---
export interface Post {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // coverImage agora é do tipo CoverImageData ou null/undefined se não for obrigatório
  coverImage: CoverImageData | null;
}

// --- Interfaces Meta e StrapiApiResponse permanecem as mesmas ---
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface Meta {
  pagination: PaginationMeta;
}

export interface StrapiApiResponse<T> {
  data: T[];
  meta: Meta;
}
