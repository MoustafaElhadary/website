import { getNowPlaying } from "@/lib/spotify";
import { NextResponse } from "next/server";

export async function GET() {
  const track = await getNowPlaying();

  return NextResponse.json({ track });
}
