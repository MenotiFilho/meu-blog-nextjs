import PostCard from "@/components/PostCard";
import { getPosts } from "@/lib/strapi";
import { Post } from "@/types/strapi";

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    // O 'main' já tem padding/container vindo do layout.tsx
    <section>
      {" "}
      {/* Usar section pode ser semanticamente melhor aqui */}
      {posts && posts.length > 0 ? (
        // Aplicar espaçamento entre os itens da lista
        <div className="space-y-6 md:space-y-8 max-w-3xl mx-auto">
          {/* 2. Mapear os posts e renderizar o componente PostHome para cada um */}
          {posts.map((post) => (
            // Passar a key (essencial para React) e a prop 'post'
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-gray-400">
          Nenhum post encontrado. Volte em breve!
        </p>
      )}
    </section>
  );
}
