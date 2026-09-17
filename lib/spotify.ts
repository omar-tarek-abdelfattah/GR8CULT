export interface SpotifyVaultTrack {
  id: string;
  title: string;
  artist: string;
  albumName: string;
  albumArt: string;
  releaseDate: string;
  durationMs: number;
  spotifyUrl: string;
  previewUrl: string | null;
  uri: string;
}

// Ahmedythegr8 Official Releases
export const AHMEDY_TRACK_IDS = [
  "7HEKdoES29KDfPtTD8j8Ky", // MATCH TENNIS
  "04bblc5Abrtw9TOoAP0Amz", // PHOBIA
  "1vo1fMaaQ0H4YIFgGUEeFj", // TENSANY EZAY
  "5UinoqY51RbunuOA8pz47Y", // VR
  "62aC6KEFMqOnVOumwVWe1T", // ASHBA7
  "6sUrpN0JsJLUG5QB2Rt0RP", // BTZN
  "1srF1vpxZlOLkuojIxAj0q", // BNDAWAR
  "7ldw4irowYXFC8eXLE1deY", // MAMNO3AT
];

// In-memory token cache to prevent requesting a new token on every call
let cachedToken: { token: string; expiresAt: number } | null = null;

export async function getSpotifyAccessToken(): Promise<string | null> {
  const clientId =
    process.env.SPOTIFY_CLIENT_ID || process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientSecret =
    process.env.SPOTIFY_CLIENT_SECRET || process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.warn("Spotify Client ID or Client Secret not configured.");
    return null;
  }

  // Use cached token if still valid (with 60-second buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 60000) {
    return cachedToken.token;
  }

  try {
    const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch Spotify access token: ${res.status} ${errorText}`);
      return null;
    }

    const data = await res.json();
    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in || 3600) * 1000,
    };

    return cachedToken.token;
  } catch (error) {
    console.error("Error authenticating with Spotify API:", error);
    return null;
  }
}

export function normalizeTrack(track: any): SpotifyVaultTrack {
  return {
    id: track.id,
    title: track.name,
    artist: track.artists?.map((a: any) => a.name).join(", ") || "Ahmedythegr8",
    albumName: track.album?.name || "Single",
    albumArt:
      track.album?.images?.[0]?.url ||
      track.album?.images?.[1]?.url ||
      "/test-AI-image.jpg",
    releaseDate: track.album?.release_date || "2023",
    durationMs: track.duration_ms || 0,
    spotifyUrl:
      track.external_urls?.spotify || `https://open.spotify.com/track/${track.id}`,
    previewUrl: track.preview_url || null,
    uri: track.uri || `spotify:track:${track.id}`,
  };
}

// Fallback tracks in case Spotify API is completely unreachable
export const FALLBACK_TRACKS: SpotifyVaultTrack[] = [
  {
    id: "5NO4pYMYbm6FPKaL3fAUQH",
    title: "SABR",
    artist: "Ahmedythegr8",
    albumName: "SABR",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2731a742e2e63c1b24eaf6a1d8b",
    releaseDate: "2023-08-16",
    durationMs: 164210,
    spotifyUrl: "https://open.spotify.com/track/5NO4pYMYbm6FPKaL3fAUQH",
    previewUrl: null,
    uri: "spotify:track:5NO4pYMYbm6FPKaL3fAUQH",
  },
  {
    id: "7jJQcdSFMYaffIJCEVgLDC",
    title: "3ADY",
    artist: "Ahmedythegr8",
    albumName: "3ADY",
    albumArt: "/ahmedy-hero-bg.jpeg",
    releaseDate: "2023-07-28",
    durationMs: 180000,
    spotifyUrl: "https://open.spotify.com/track/7jJQcdSFMYaffIJCEVgLDC",
    previewUrl: null,
    uri: "spotify:track:7jJQcdSFMYaffIJCEVgLDC",
  },
  {
    id: "2IWLvPnQ0T7VnTfUOnEPCG",
    title: "MEEN",
    artist: "Ahmedythegr8",
    albumName: "Truth",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273691ac6c915053b2d2abd399f",
    releaseDate: "2023-09-13",
    durationMs: 206769,
    spotifyUrl: "https://open.spotify.com/track/2IWLvPnQ0T7VnTfUOnEPCG",
    previewUrl: null,
    uri: "spotify:track:2IWLvPnQ0T7VnTfUOnEPCG",
  },
  {
    id: "4Uxc9P4vzxW0Hcbnp8t6NA",
    title: "DA3",
    artist: "Ahmedythegr8",
    albumName: "Truth",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273691ac6c915053b2d2abd399f",
    releaseDate: "2023-09-13",
    durationMs: 176000,
    spotifyUrl: "https://open.spotify.com/track/4Uxc9P4vzxW0Hcbnp8t6NA",
    previewUrl: null,
    uri: "spotify:track:4Uxc9P4vzxW0Hcbnp8t6NA",
  },
];

/**
 * Fetch tracks by specific track IDs
 */
export async function getTracksByIds(trackIds: string[] = AHMEDY_TRACK_IDS): Promise<SpotifyVaultTrack[]> {
  const token = await getSpotifyAccessToken();
  if (!token) return FALLBACK_TRACKS;

  try {
    const results = await Promise.all(
      trackIds.map(async (id) => {
        const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
          next: { revalidate: 3600 },
        });
        if (!res.ok) return null;
        return res.json();
      })
    );

    const validTracks = results.filter(Boolean).map(normalizeTrack);
    return validTracks.length > 0 ? validTracks : FALLBACK_TRACKS;
  } catch (error) {
    console.error("Error fetching Spotify tracks by IDs:", error);
    return FALLBACK_TRACKS;
  }
}
