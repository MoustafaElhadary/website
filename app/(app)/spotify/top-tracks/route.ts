import { NextResponse } from "next/server";
import { getTopTracks } from "@/lib/spotify";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const tracks = await getTopTracks();

  return NextResponse.json({ tracks });
}
