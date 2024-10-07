"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AiFillSpotify } from "react-icons/ai";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { NowPlayingData } from "@/lib/spotify";

const fetchNowPlaying = async (): Promise<NowPlayingData> => {
  const response = await fetch("/spotify/now-playing", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch now playing data");
  }
  return response.json();
};

export default function NowPlaying() {
  const { data } = useQuery<NowPlayingData, Error>({
    queryKey: ["nowPlaying"],
    queryFn: fetchNowPlaying,
    refetchInterval: 10000,
    staleTime: 0,
  });

  return (
    <Card className="my-4 w-[300px]">
      <CardContent className="p-2 flex items-center justify-between">
        <div className="flex items-center">
          <AiFillSpotify className="mr-2" />
          <div className="flex flex-col justify-center items-start">
            <a
              href={data?.songUrl}
              className="font-medium max-w-[190px] truncate hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {data?.title || "Not Playing"}
            </a>
            <p className="text-muted-foreground max-w-[190px] truncate">
              {data?.artist || "Spotify"}
            </p>
          </div>
        </div>
        <Image
          alt="Spotify album cover"
          height={60}
          width={60}
          src={data?.albumImageUrl || "/images/placeholder.jpg"}
          className="rounded-lg"
        />
      </CardContent>
    </Card>
  );
}
