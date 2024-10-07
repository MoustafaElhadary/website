import React from "react";
import { Timeline } from "@/components/Timeline";
import { user } from "@/constants/user";
import Image from "next/image";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
  AiOutlineInstagram,
} from "react-icons/ai";
import { LinkPreview } from "./LinkPreview";
import { Experience } from "./Experience";
import NowPlaying from "./spotify/NowPlaying";
import { getTopTracks } from "@/lib/spotify";
import { TracksList } from "./spotify/TopTracksList";

export default async function Hero() {
  const tracks = await getTopTracks();

  const socials = [
    {
      name: "twitter",
      icon: (
        <AiOutlineTwitter className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: user.twitter,
    },
    {
      name: "LinkedIn",
      icon: (
        <AiOutlineLinkedin className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: user.linkedin,
    },
    {
      name: "GitHub",
      icon: (
        <AiOutlineGithub className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: user.github,
    },
    {
      name: "Instagram",
      icon: (
        <AiOutlineInstagram className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: user.instagram,
    },
  ];
  return (
    <div className="mt-10 px-8 flex flex-col lg:flex-row lg:space-x-10">
      <div className="flex-grow">
        <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 justify-between">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl md:leading-tight max-w-3xl">
              Hey! I&apos;m
              <span className="text-cyan-500"> Moustafa Elhadary</span> and
              I&apos;m a full stack soap engineer.
            </h1>
            <p className=" text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
              I&apos;ve been obsessed with technology ever since I was a kid.
              When I wasn&apos;t taking apart my family&apos;s computer (sorry,
              mom), I was teaching myself how to code. Fast forward a few years,
              and now I&apos;m a full-fledged code ninja with an insatiable
              thirst for creating beautiful websites and functional
              applications.
            </p>
          </div>
        </div>
        <>
          <p className=" text-sm md:text-base mt-8 md:leading-loose tracking-wide">
            When I&apos;m not busy slaying bugs and writing code, I&apos;m
            usually busy indulging in my two favorite hobbies: hot sauce and dad
            jokes. I firmly believe that a good laugh and a dash of hot sauce
            can fix just about anything, including bugs in my code (okay, maybe
            not that last part).
          </p>
          <div className="mt-8  text-sm md:text-base max-w-2xl leading-loose tracking-wide">
            Building{" "}
            <LinkPreview
              className={
                " font-bold hover:text-cyan-500 transition duration-150 outline-none"
              }
              url="https://algochurn.com"
            >
              Algochurn
            </LinkPreview>{" "}
            and{" "}
            <LinkPreview
              className={
                " font-bold hover:text-cyan-500 transition duration-150"
              }
              url="https://aceternity.com"
            >
              Aceternity
            </LinkPreview>{" "}
            when I&apos;m not working on my day job.
          </div>
          <p className=" text-sm md:text-base mt-8 md:leading-loose tracking-wide">
            Here&apos;s a timeline of what I&apos;ve been upto
          </p>

          <Experience />
          <Timeline />
        </>
      </div>

      <aside className="lg:w-[300px] mt-10 lg:mt-0">
        <div className="flex flex-col items-center lg:flex-row lg:items-center lg:justify-between">
          <Image
            src={`/images/profile.jpeg`}
            width={260}
            height={260}
            alt="Avatar"
            className="rounded-2xl"
          />
          <div className="flex lg:flex-col justify-center lg:justify-center space-x-4 lg:space-x-0 lg:space-y-4 mt-4 lg:mt-0">
            {socials.map((socialLink, idx) => (
              <a
                key={`footer-link-${idx}`}
                href={socialLink.link}
                className="text-sm relative"
                target="__blank"
              >
                <span className="relative z-10 p-2 inline-block hover:text-cyan-500">
                  {socialLink.icon}
                </span>
              </a>
            ))}
          </div>
        </div>
        <NowPlaying />
        <TracksList tracks={tracks} />
      </aside>
    </div>
  );
}
