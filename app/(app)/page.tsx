import Hero from "@/components/Hero";
import { Projects } from "@/components/Projects";

export default async function Home() {
  return (
    <div className="max-w-7xl mx-auto px-8">
      <Hero />

      <h1 className="text-2xl md:text-3xl  font-bold px-8  mt-10">
        I&apos;ve been building a lot of things
      </h1>

      <Projects />
      <h1 className="text-2xl md:text-3xl  font-bold px-8 mt-10">
        Latest contributions to open source
      </h1>
      {/* <LatestRepos repos={repos.slice(0, 9)} showMore={shouldShowMore()} /> */}
    </div>
  );
}
