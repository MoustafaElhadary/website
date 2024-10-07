import { Timeline } from "@/components/Timeline";
import { user } from "@/constants/user";
import { getTopTracks } from "@/lib/spotify";
import Image from "next/image";
import {
  AiOutlineGithub,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Experience } from "./Experience";
import { LinkPreview } from "./LinkPreview";
import { TracksList } from "./spotify/TopTracksList";

const ProfileImageWithSocials = ({ isMobile = false }) => {
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
    <div
      className={`flex ${"flex-col items-center lg:flex-row lg:items-center lg:justify-between"}`}
    >
      <Image
        src={`/images/profile.jpeg`}
        width={260}
        height={260}
        alt="Avatar"
        className="rounded-2xl"
      />
      <div
        className={`flex ${
          isMobile
            ? "flex-row ml-4"
            : "lg:flex-col justify-center lg:justify-center space-x-4 lg:space-x-0 lg:space-y-4 mt-4 lg:mt-0"
        }`}
      >
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
  );
};

export default async function Hero() {
  const tracks = await getTopTracks();

  return (
    <div className="mt-10 px-8 flex flex-col lg:flex-row lg:space-x-10">
      {/* Profile image with socials for mobile */}
      <div className="lg:hidden mb-8">
        <ProfileImageWithSocials isMobile={true} />
      </div>

      {/* Now Playing for mobile */}

      <div className="flex-grow">
        <div className="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 justify-between">
          <div>
            <h1 className="font-bold text-3xl md:text-5xl md:leading-tight max-w-3xl">
              Hey! I&apos;m
              <span className="text-cyan-500"> Moustafa Elhadary</span> 👋🏽
            </h1>
            <p className="text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
              I&apos;m a software engineer and tech lead at{" "}
              <LinkPreview
                className="font-bold hover:text-cyan-500 transition duration-150 outline-none"
                url="https://www.mckinsey.com/"
              >
                McKinsey & Company
              </LinkPreview>
              , collaborating with Fortune 100 companies to build AI-driven
              solutions that transform industries. From creating AI tools that
              save thousands of hours in data processing to developing
              forecasting systems for teams of over 16,000, to delivering
              solutions that resulted in $70 million in savings for a healthcare
              client.
            </p>
          </div>
        </div>
        <>
          <p className="text-sm md:text-base mt-8 md:leading-loose tracking-wide">
            In my free time, I love building projects that make a real
            difference:
          </p>
          <ul className="list-disc list-inside text-sm md:text-base mt-4 md:leading-loose tracking-wide">
            <li>
              <LinkPreview
                className="font-bold hover:text-cyan-500 transition duration-150 outline-none"
                url="https://lpukrainerelief.com"
              >
                LPUkraineRelief.com
              </LinkPreview>
              : Developed this platform in 12 hours to support my Ukrainian
              colleagues, helping raise over $700,000.
            </li>
            <li>
              <LinkPreview
                className="font-bold hover:text-cyan-500 transition duration-150 outline-none"
                url="https://web.archive.org/web/20231003074741/https://www.tawwr.com/"
              >
                Tawwr
              </LinkPreview>
              : Co-founded the Middle East&apos;s first income-share software
              engineering bootcamp, empowering students to kickstart their tech
              careers without upfront costs.
            </li>
          </ul>

          <Experience />
          <Timeline />
        </>
      </div>

      <aside className="lg:w-[300px] mt-10 lg:mt-0">
        {/* Profile image with socials for desktop */}
        <div className="hidden lg:block">
          <ProfileImageWithSocials />
        </div>
        <TracksList tracks={tracks} />
      </aside>
    </div>
  );
}
