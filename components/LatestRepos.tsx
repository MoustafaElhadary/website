"use client";

import { truncateText } from "@/lib/utils";
import { Repository } from "@/types/repos";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineFork, AiOutlineStar } from "react-icons/ai";

export const LatestRepos = ({
  repos,
  showMore = false,
}: {
  repos: Repository[];
  showMore?: boolean;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-8 relative mb-20 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 mx-auto">
        {repos.map((repo: Repository, idx: number) => (
          <a
            href={repo.html_url}
            onMouseEnter={() => setHoveredIndex(idx)}
            key={repo?.html_url}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative rounded-2xl border border-gray-200 shadow-sm p-4 bg-white flex flex-col justify-between h-full transition duration-300 hover:shadow-md"
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-gray-50 rounded-xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="relative z-50 flex flex-col justify-between h-full">
              <div>
                <h2 className="text-base font-bold text-gray-800">
                  {repo.name}
                </h2>
                <p className="font-normal text-sm leading-loose mt-4 tracking-wide text-gray-600">
                  {truncateText(repo?.description, 100)}
                </p>
              </div>

              <div className="mt-4 flex flex-row space-x-4 items-center text-gray-600 group-hover:text-cyan-600">
                <div className="font-normal text-sm flex flex-row space-x-1 items-center">
                  <AiOutlineFork className="h-4 w-4 stroke-1" />
                  <span className="group-hover:text-cyan-600">
                    {repo.forks_count}
                  </span>
                </div>
                <div className="font-normal text-sm flex flex-row space-x-1 items-center">
                  <AiOutlineStar className="h-4 w-4 stroke-1" />
                  <span className="">{repo.stargazers_count}</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      {showMore && (
        <div>
          <div className="absolute h-56 max-w-5xl mx-auto w-full bottom-0 bg-gradient-to-t from-white via-white to-transparent z-[60] transition duration-500 flex items-center justify-center" />

          <div className="flex justify-center relative z-[70]">
            <Link
              href="https://github.com/moustafaelhadary"
              target="_blank"
              className="border border-gray-300 bg-white px-8 py-2 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition duration-200 text-gray-800"
            >
              Show More
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
