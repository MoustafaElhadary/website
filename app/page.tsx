"use client";

import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Uses } from "@/components/Uses";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // const shouldShowMore = () => {
  //   if (repos && repos.length > 9) {
  //     return true;
  //   }
  //   return false;
  // };
  return (
    <>
      <Hero />
      <Experience />
      <h1 className="text-2xl md:text-3xl text-white font-bold max-w-5xl mx-auto px-8  mt-40">
        I&apos;ve been building a lot of things
      </h1>

      <Projects />
      <h1 className="text-2xl md:text-3xl text-white font-bold max-w-5xl mx-auto px-8 mt-40">
        Latest contributions to open source
      </h1>
      {/* <LatestRepos repos={repos.slice(0, 9)} showMore={shouldShowMore()} /> */}

      <div className="max-w-5xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-3 gap-10 mt-40 ">
        <div className="col-span-2">{/* <AllBlogs blogs={blogs} /> */}</div>
        <Uses />
      </div>
    </>
  );
}

// export async function getStaticProps() {
//   // FIXME: Add back the github api call
//   // const res = await fetch("https://api.github.com/users/tylerdurden");
//   // const data = await res.json();

//   // FIXME: Add back the rss feed generation

//   const data = await getUserRepositories("manuarora700");

//   return {
//     props: {
//       repos: data,
//       blogs: (await getAllBlogs())
//         .slice(0, 4)
//         .map(({ component, ...meta }) => meta),
//     },
//   };
// }
