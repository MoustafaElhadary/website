"use client";
import { useState } from "react";
import { timeline } from "@/constants/timeline";
import {
  HiOutlineCheckCircle,
  HiChevronDown,
  HiChevronUp,
} from "react-icons/hi2";
import Beam from "./Beam/Beam";

export const Timeline = () => {
  const [showAll, setShowAll] = useState(false);
  const initialItemsToShow = 3;

  const visibleTimeline = showAll
    ? timeline
    : timeline.slice(0, initialItemsToShow);

  return (
    <div className="divide-zinc-800 relative">
      <h1 className="text-2xl md:text-3xl font-bold mt-10 text-gray-800 mb-10">
        Timeline
      </h1>

      <div className="absolute h-full w-[4px] bg-gradient-to-b from-transparent via-cyan-500 to:transparent">
        <Beam showBeam={true} className={`left-1`} />
      </div>
      {visibleTimeline.map((item, idx: number) => (
        <div key={`timeline-item-${idx}`} className="">
          <h1 className="text-xl font-bold my-8 relative">
            <div className="h-3 md:h-4 w-3 md:w-4 border-2 border-cyan-500 bg-white rounded-full absolute -left-[6px] top-2 md:top-1" />
            <span className="ml-8">{item.year}</span>
          </h1>

          <div className="mb-8">
            {item.points.map((point, idx: number) => (
              <div
                key={`timeline-item-${idx}`}
                className="flex flex-row space-x-2 items-start my-2 ml-10"
              >
                <HiOutlineCheckCircle className="text-cyan-500 mt-[3px] flex-shrink-0" />
                <span className=" text-sm md:text-base">{point}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {!showAll && timeline.length > initialItemsToShow && (
        <>
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent dark:from-gray-900" />
            <div className="ml-8 opacity-50">
              <h1 className="text-xl font-bold my-8 relative">
                <div className="h-3 md:h-4 w-3 md:w-4 border-2 border-cyan-500 bg-white rounded-full absolute -left-[6px] top-2 md:top-1" />
                <span className="ml-8">
                  {timeline[initialItemsToShow].year}
                </span>
              </h1>
              <div className="mb-8">
                {timeline[initialItemsToShow].points
                  .slice(0, 1)
                  .map((point, idx: number) => (
                    <div
                      key={`preview-point-${idx}`}
                      className="flex flex-row space-x-2 items-start my-2 ml-10"
                    >
                      <HiOutlineCheckCircle className="text-cyan-500 mt-[3px] flex-shrink-0" />
                      <span className="text-sm md:text-base">{point}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setShowAll(true)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition duration-300 ease-in-out"
              aria-label="Show more"
            >
              <HiChevronDown className="h-8 w-8" />
            </button>
          </div>
        </>
      )}

      {showAll && timeline.length > initialItemsToShow && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setShowAll(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition duration-300 ease-in-out"
            aria-label="Show less"
          >
            <HiChevronUp className="h-8 w-8" />
          </button>
        </div>
      )}
    </div>
  );
};
