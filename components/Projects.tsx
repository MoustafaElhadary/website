"use client";

import { projects } from "@/constants/projects";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import { BsTerminal } from "react-icons/bs";

export const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto px-8">
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10 mt-20">
        {projects.map((project, idx) => (
          <a
            href={project.link}
            key={project?.link}
            className="relative group block p-2"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-gray-100 rounded-3xl"
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
            <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md group-hover:shadow-lg relative z-50 transition duration-300">
              <div className="relative z-50">
                <div className="h-44 sm:h-60 md:h-44 w-full relative transition duration-500 bg-gray-100 group-hover:bg-white">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="absolute inset-0 object-cover object-center"
                  />
                </div>
                <div className="p-4">
                  <h4 className="font-bold tracking-wide mt-4 text-gray-800">
                    {project.title}
                  </h4>
                  <p className="mt-8 tracking-wide leading-relaxed text-sm text-gray-600">
                    {project.description}
                  </p>

                  <div className="flex flex-row flex-wrap mt-8">
                    {project.stack.map((stack, idx) => (
                      <div key={`stack-${idx}`}>
                        <span className="text-gray-400 mr-4 inline-block">
                          {stack.icon}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-row space-x-2 mt-4 items-center px-0.5">
                    <BsTerminal className="h-3 w-3 text-gray-400 group-hover:text-blue-500" />
                    <p className="text-gray-400 group-hover:text-blue-500 text-xs">
                      View Source
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
