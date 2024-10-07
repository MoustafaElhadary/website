import Hero from "@/components/Hero";
import { Projects } from "@/components/Projects";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <Hero />
      <Projects />
    </div>
  );
}
