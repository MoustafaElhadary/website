"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AudiogramComposition,
  AudiogramCompositionSchemaType,
} from "@/lib/remotion/AudioGram/Composition";
import {
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "@/lib/remotion/types/constants";
import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineGithub } from "react-icons/ai";
import { staticFile } from "remotion";
import { LinkPreview } from "@/components/LinkPreview";

interface AudiogramFormProps {
  inputProps: AudiogramCompositionSchemaType;
  onInputPropsChange: (
    newProps: Partial<AudiogramCompositionSchemaType>
  ) => void;
}

const AudiogramForm: React.FC<AudiogramFormProps> = ({
  inputProps,
  onInputPropsChange,
}) => {
  const form = useForm<AudiogramCompositionSchemaType>({
    defaultValues: inputProps,
  });

  React.useEffect(() => {
    const subscription = form.watch((value) => {
      onInputPropsChange(value as AudiogramCompositionSchemaType);
    });
    return () => subscription.unsubscribe();
  }, [form, onInputPropsChange]);

  return (
    <Form {...form}>
      <form className="space-y-4">
        <FormField
          control={form.control}
          name="titleText"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title Text</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Enter the title for the audiogram
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="titleColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title Color</FormLabel>
              <FormControl>
                <Input {...field} type="color" />
              </FormControl>
              <FormDescription>
                Choose the color for the title text
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subtitlesTextColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitles Color</FormLabel>
              <FormControl>
                <Input {...field} type="color" />
              </FormControl>
              <FormDescription>
                Choose the color for the subtitles
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="waveColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wave Color</FormLabel>
              <FormControl>
                <Input {...field} type="color" />
              </FormControl>
              <FormDescription>
                Choose the color for the audio wave
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="backgroundColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Background Color</FormLabel>
              <FormControl>
                <Input {...field} type="color" />
              </FormControl>
              <FormDescription>
                Choose the background color for the audiogram
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Remove the "Apply Changes" button */}
      </form>
    </Form>
  );
};

const player: React.CSSProperties = {
  width: "100%",
};

const initialInputProps: AudiogramCompositionSchemaType = {
  audioOffsetInSeconds: 0,
  audioFileName: staticFile("moustafa.mp3"),
  coverImgFileName: staticFile("cover.jpg"),
  titleText: "AI-Generated Podcast: Exploring the Life and Work of Moustafa",
  titleColor: "rgba(186, 186, 186, 0.93)",
  subtitlesFileName: staticFile("subtitles.srt"),
  onlyDisplayCurrentSentence: true,
  subtitlesTextColor: "rgba(255, 255, 255, 0.93)",
  subtitlesLinePerPage: 4,
  subtitlesZoomMeasurerSize: 10,
  subtitlesLineHeight: 98,
  waveColor: "#a3a5ae",
  waveFreqRangeStartIndex: 7,
  waveLinesToDisplay: 29,
  waveNumberOfSamples: "256",
  mirrorWave: true,
  durationInSeconds: 849,
  backgroundColor: "rgba(0, 0, 0, 0.93)",
};

const Home: NextPage = () => {
  const [inputProps, setInputProps] =
    useState<AudiogramCompositionSchemaType>(initialInputProps);
  const handleInputPropsChange = (
    newProps: Partial<AudiogramCompositionSchemaType>
  ) => {
    setInputProps((prevProps) => ({ ...prevProps, ...newProps }));
  };
  return (
    <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-3xl font-bold text-center">
          AI-Generated Podcast Player
        </h1>
        <a
          href="https://github.com/moustafaelhadary/website"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2"
        >
          <AiOutlineGithub className="w-6 h-6 hover:text-primary transition duration-150" />
        </a>
      </div>

      <Card className="mb-8">
        <CardContent>
          <p className="text-sm md:text-base md:leading-loose tracking-wide mt-8">
            This interactive audiogram combines AI-generated content using{" "}
            <LinkPreview
              className="font-bold hover:text-cyan-500 transition duration-150 outline-none"
              url="https://notebooklm.google/"
            >
              Google&apos;s NotebookLM
            </LinkPreview>
            , transcription with{" "}
            <LinkPreview
              className="font-bold hover:text-cyan-500 transition duration-150 outline-none"
              url="https://openai.com/research/whisper"
            >
              OpenAI&apos;s Whisper
            </LinkPreview>
            , and programmable video using{" "}
            <LinkPreview
              className="font-bold hover:text-cyan-500 transition duration-150 outline-none"
              url="https://www.remotion.dev/"
            >
              Remotion
            </LinkPreview>
            . It features customizable colors, an audio waveform, and
            interactive transcripts. Try highlighting the text in the player!
          </p>
          <p>all the stories in the podcast are real!</p>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side: Video player */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <Player
              component={AudiogramComposition}
              inputProps={inputProps}
              durationInFrames={849 * VIDEO_FPS}
              fps={VIDEO_FPS}
              compositionHeight={VIDEO_HEIGHT}
              compositionWidth={VIDEO_WIDTH}
              style={player}
              controls
              loop
              showVolumeControls
            />
          </div>
        </div>

        {/* Right side: Form and View Code button */}
        <div className="w-full md:w-1/2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Customize Audiogram</CardTitle>
            </CardHeader>
            <CardContent>
              <AudiogramForm
                inputProps={inputProps}
                onInputPropsChange={handleInputPropsChange}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
