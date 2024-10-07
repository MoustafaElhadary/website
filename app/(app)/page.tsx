import Hero from "@/components/Hero";
import { LatestRepos } from "@/components/LatestRepos";
import { Projects } from "@/components/Projects";
import { getUserRepositories } from "@/lib/github";

export default async function Home() {
  const repos = await getUserRepositories("MoustafaElhadary");

  const shouldShowMore = () => {
    if (repos && repos.length > 9) {
      return true;
    }
    return false;
  };

  return (
    <div className="max-w-7xl mx-auto px-8">
      <Hero />

      <Projects />
      <h1 className="text-2xl md:text-3xl  font-bold px-8 mt-10">
        My Latest Public GitHub Repositories
      </h1>
      <LatestRepos repos={repos.slice(0, 15)} showMore={shouldShowMore()} />
    </div>
  );
}
