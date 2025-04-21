import { Post, StrapiApiResponse } from "@/types/strapi";
import Link from "next/link";

async function getPosts(): Promise<Post[]> {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const apiUrl = `${strapiUrl}/posts?sort=publishedAt:desc`;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    const response: StrapiApiResponse<Post> = await res.json();

    if (!response || !response.data) {
      console.warn("Strapi response format unexpected or empty:", response);
      return [];
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <main /* ... */>
      <h1 /* ... */>Meu Blog</h1>

      {posts && posts.length > 0 ? (
        <ul /* ... */>
          {/* 'post' aqui é inferido como Post graças à tipagem da função e da variável */}
          {posts.map((post) => (
            <li key={post.id} /* ... */>
              <Link href={`/posts/${post.slug}`} /* ... */>
                <h2 /* ... */>{post.title}</h2>
                <p /* ... */>
                  Publicado em:{" "}
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum post encontrado ou erro ao buscar.</p>
      )}
    </main>
  );
}
