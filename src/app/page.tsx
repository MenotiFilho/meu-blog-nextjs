import Content from "@/components/Content";
import Hero from "@/components/Hero";

export default async function Home() {
  return (
    <div className="flex flex-col w-full h-2/3 gap-5">
      <Hero />
      <Content />
    </div>
  );
}
