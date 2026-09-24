import { Metadata } from "next";
import { getTracksByIds, AHMEDY_TRACK_IDS } from "@/lib/spotify";
import VaultClient from "@/components/Vault/VaultClient";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "The Vault | Discography, Exclusive Beats & Music Videos",
  description:
    "Explore official records, instrumental beats, stems, and high-definition music videos engineered and produced at GR8NIK STUDIOS in Cairo.",
  alternates: {
    canonical: "/vault",
  },
  openGraph: {
    title: "The Vault // GR8NIK STUDIOS Discography & Beats",
    description:
      "Official releases, beats with stems, and official music videos from the GR8NIK sanctuary.",
    url: `${SITE_URL}/vault`,
    images: [
      {
        url: "/logo-nobg.png",
        width: 1200,
        height: 630,
        alt: "GR8NIK STUDIOS Vault Discography",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Vault // GR8NIK STUDIOS Discography & Beats",
    description:
      "Official releases, beats with stems, and official music videos from the GR8NIK sanctuary.",
    images: ["/logo-nobg.png"],
  },
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
