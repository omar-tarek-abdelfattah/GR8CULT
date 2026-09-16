import { Metadata } from "next";
import { getTracksByIds, AHMEDY_TRACK_IDS } from "@/lib/spotify";
import VaultClient from "@/components/Vault/VaultClient";

export const metadata: Metadata = {
  title: "Vault | GR8NIK STUDIOS",
  description: "Official releases and discography from GR8NIK STUDIOS on Spotify.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function VaultPage() {
  const tracks = await getTracksByIds(AHMEDY_TRACK_IDS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicPlaylist",
    "name": "GR8NIK STUDIOS Vault",
    "description": "Official releases engineered and mastered at GR8NIK STUDIOS.",
    "track": tracks.map((track) => ({
      "@type": "MusicRecording",
      "name": track.title,
      "byArtist": {
        "@type": "MusicGroup",
        "name": track.artist,
      },
      "duration": `PT${Math.floor(track.durationMs / 1000)}S`,
      "url": track.spotifyUrl,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <VaultClient initialTracks={tracks} />
    </>
  );
}
