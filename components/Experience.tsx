"use client";

import { workExperience } from "@/constants/workExperience";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import moment from "moment";
import Image from "next/image";
import { useState } from "react";
import { BsCheck2 } from "react-icons/bs";
import Beam from "./Beam/Beam";

export const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeWorkExperience, setActiveWorkExperience] = useState(
    workExperience[0]
  );

  const [animationKey, setAnimationKey] = useState(0);

  const handleSetActiveWorkExperience = (exp: typeof activeWorkExperience) => {
    setActiveWorkExperience(exp);
    setAnimationKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mt-10 text-gray-800">
        Work Experience
      </h1>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-2 mt-10">
        <div className="flex flex-row md:flex-col relative overflow-x-auto md:overflow-x-visible">
          <div className="overflow-hidden absolute h-full w-[1px] bg-cyan-500">
            <Beam showBeam={true} className={`-left-0`} />
          </div>

          {workExperience.map((exp, idx) => (
            <div
              key={`exp-${idx}`}
              className="relative my-2 ml-8"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Active background */}
              {activeWorkExperience?.company === exp.company && (
                <motion.span
                  className="absolute inset-0 h-full w-full rounded-md bg-cyan-600"
                  layoutId="activeBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}

              {/* Hover background */}
              <AnimatePresence>
                {hoveredIndex === idx &&
                  activeWorkExperience?.company !== exp.company && (
                    <motion.span
                      className="absolute inset-0 h-full w-full rounded-md bg-gray-200"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
              </AnimatePresence>

              <button
                onClick={() => handleSetActiveWorkExperience(exp)}
                className={clsx(
                  "px-4 py-2 relative z-20 min-w-28 w-full text-left rounded-md flex flex-row space-x-2 items-center group transition-colors duration-200",
                  activeWorkExperience?.company === exp.company
                    ? "text-white font-medium"
                    : "text-gray-700 hover:text-black"
                )}
              >
                <div
                  className={clsx(
                    "p-1 h-6 w-6 flex items-center justify-center rounded-full transition duration-200",
                    activeWorkExperience?.company === exp.company
                      ? "bg-white"
                      : "bg-cyan-500 "
                  )}
                >
                  <Image
                    src={exp.logo}
                    width={12}
                    height={12}
                    alt={exp.company}
                    className={"flex-shrink-0 transition duration-200 "}
                  />
                </div>
                <span>{exp.company}</span>
              </button>
            </div>
          ))}
        </div>
        <div className="md:pl-10 flex-1">
          <div className="flex flex-col space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={animationKey}
                className="flex flex-col space-y-2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15 },
                }}
              >
                <h1 className="text-2xl font-bold text-gray-800">
                  {activeWorkExperience?.role}{" "}
                  <span className="text-cyan-600">
                    @ {activeWorkExperience?.company}
                  </span>
                </h1>

                <div className="text-gray-600 text-sm tracking-widest">
                  {moment(activeWorkExperience?.startDate).format("MMM YYYY")} -{" "}
                  {moment(activeWorkExperience?.endDate).format("MMM YYYY")}
                </div>
                <p className="text-gray-600 text-sm">
                  {activeWorkExperience?.location}
                </p>

                <div>
                  {activeWorkExperience?.description.map((bullet, idx) => (
                    <div
                      key={`bullet-${idx}`}
                      className="flex flex-row space-x-2 items-start my-2"
                    >
                      <BsCheck2 className="text-cyan-600 mt-[3px] flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{bullet}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
