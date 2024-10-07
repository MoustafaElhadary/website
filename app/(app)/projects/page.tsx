"use client";

import { Projects } from "@/components/Projects";

export default function ProjectsPage() {
  return (
    <>
      <div className="max-w-5xl mx-auto px-8 mt-10 md:mt-20 relative">
        <h1 className="font-bold text-3xl md:text-5xl md:leading-tight  max-w-3xl">
          I&apos;ve been building a
          <span className="text-cyan-500"> lot of things</span>
        </h1>
        <p className=" text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
          Come explore the fruits of my labor, from small experiments to
          full-blown web applications, each project showcases my love for coding
          and design.
        </p>
      </div>

      <Projects />
    </>
  );
}
