import { getPosts, STRAPI_BASE_URL } from "@/lib/strapi"; // Import STRAPI_BASE_URL

import Link from "next/link";
import Image from "next/image"; // Import next/image
import ReactMarkdown from "react-markdown";

// Removed unused `post` prop and interface
export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto px-4 py-8">
      {posts.length === 0 ? (
        <p className="text-gray-400">Nenhum post encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => {
            // Determine image URL and alt text
            const cover = post.coverImage; // Access attributes via .data.attributes
            const imageUrl = cover
              ? `${STRAPI_BASE_URL}${
                  cover.formats?.small?.url || cover.url // Use small format or fallback to original
                }`
              : null; // Handle posts without images
            const imageAlt = cover?.alternativeText || post.title; // Use alt text or title
            const excerpt = post?.content
              ? post.content.slice(0, 130) +
                (post.content.length > 130 ? "..." : "")
              : "";
            return (
              <article
                key={post.id}
                className="bg-black text-amber-100 rounded-2xl shadow-lg overflow-hidden border border-amber-100 flex flex-col" // Added flex flex-col for better layout control
              >
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex flex-col flex-grow"
                >
                  {" "}
                  {/* Added flex flex-col flex-grow */}
                  <div className="relative w-full h-48 bg-gray-800">
                    {" "}
                    {/* Added background for placeholder */}
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={imageAlt}
                        fill // Use fill to cover the container
                        style={{ objectFit: "cover" }} // Ensure image covers the area
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optional: Optimize image loading
                        priority={posts.indexOf(post) < 3} // Optional: Prioritize loading images for the first few posts
                      />
                    ) : (
                      // Optional: Placeholder content if no image
                      <div className="flex items-center justify-center h-full">
                        <span className="text-gray-500">Sem Imagem</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    {/* Added flex flex-col flex-grow */}
                    <h2 className="text-xl lg:text-2xl font-bold group-hover:text-black group-hover:bg-amber-100 transition-colors rounded-lg p-1 mb-2">
                      {/* Adjusted size and added margin */}
                      {post.title}
                    </h2>
                    {/* Displaying excerpt from content might need adjustment based on your content structure (e.g., using a dedicated excerpt field or processing markdown) */}
                    {/* For now, keeping the line-clamp on the full content */}
                    <div className="prose prose-sm prose-invert dark:prose-invert mt-2 line-clamp-3">
                      <ReactMarkdown>{excerpt}</ReactMarkdown>
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
