"use client";

/* eslint-disable @next/next/no-img-element */
import { Card, CardContent } from "@/components/ui/card";
import { SpotifyTrack } from "@/lib/spotify";
import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

export const TracksList = ({ tracks }: { tracks: SpotifyTrack[] }) => {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlay = (previewURL: string) => {
    if (playingTrack === previewURL) {
      audioRef.current?.pause();
      setPlayingTrack(null);
    } else {
      if (audioRef.current) {
        audioRef.current.src = previewURL;
        audioRef.current.play();
      }
      setPlayingTrack(previewURL);
    }
  };

  return (
    <div className="">
      <h1 className="text-2xl md:text-3xl font-bold mt-10 text-gray-800">
        Top Tracks
      </h1>
      <p className="text-muted-foreground mb-6">
        Curious what I&apos;m currently listening to? Here&apos;s my top tracks
        on Spotify updated daily.
      </p>
      <Card className="w-full py-4">
        <CardContent>
          <ul className="space-y-4">
            {tracks.map((track) => (
              <li
                key={track.songUrl}
                className={`flex items-center space-x-4 group cursor-pointer rounded-md transition-colors duration-300 p-2 ${
                  playingTrack === track.previewURL
                    ? "bg-primary/10 hover:bg-primary/20"
                    : "hover:bg-muted"
                }`}
                onClick={() => track.previewURL && handlePlay(track.previewURL)}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg shadow-md overflow-hidden">
                    <img
                      src={track.imageURL}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    {playingTrack === track.previewURL ? (
                      <Pause className="h-8 w-8 text-white/90" />
                    ) : (
                      <Play className="h-8 w-8 text-white/90" />
                    )}
                  </div>
                </div>
                <div className="flex-grow min-w-0">
                  <p className="font-semibold truncate">{track.title}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {track.artist}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
        <audio ref={audioRef} onEnded={() => setPlayingTrack(null)} />
      </Card>
    </div>
  );
};
