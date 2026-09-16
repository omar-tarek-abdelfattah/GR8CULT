import { NextResponse } from "next/server";
import { getTracksByIds, AHMEDY_TRACK_IDS } from "@/lib/spotify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get("ids");
  const trackIds = idsParam ? idsParam.split(",") : AHMEDY_TRACK_IDS;

  try {
    const tracks = await getTracksByIds(trackIds);
    return NextResponse.json({ tracks });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch Spotify tracks", details: error?.message },
      { status: 500 }
    );
  }
}
