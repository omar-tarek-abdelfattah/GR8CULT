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

// Ahmedythegr8 & GR8NIK Studio Official Releases
export const AHMEDY_TRACK_IDS = [
  "48XN99rKw9mbo2CsPazPzZ", // DONIA
  "7HEKdoES29KDfPtTD8j8Ky", // MATCH TENNIS
  "04bblc5Abrtw9TOoAP0Amz", // PHOBIA
  "1srF1vpxZlOLkuojIxAj0q", // BNDAWAR
  "5UinoqY51RbunuOA8pz47Y", // VR
  "62aC6KEFMqOnVOumwVWe1T", // ASHBA7
  "1vo1fMaaQ0H4YIFgGUEeFj", // TENSANY EZAY
  "6sUrpN0JsJLUG5QB2Rt0RP", // BTZN
];

// Fallback tracks with verified metadata & CDN album art
export const FALLBACK_TRACKS: SpotifyVaultTrack[] = [
  {
    id: "48XN99rKw9mbo2CsPazPzZ",
    title: "DONIA",
    artist: "Mahdy Madness",
    albumName: "DONIA",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2736d1e35c07eb148539defb5eb",
    releaseDate: "2026-09-29",
    durationMs: 213559,
    spotifyUrl: "https://open.spotify.com/track/48XN99rKw9mbo2CsPazPzZ",
    previewUrl: null,
    uri: "spotify:track:48XN99rKw9mbo2CsPazPzZ",
  },
  {
    id: "7HEKdoES29KDfPtTD8j8Ky",
    title: "MATCH TENNIS",
    artist: "Mahdy Madness",
    albumName: "PHOBIA",
    albumArt: "https://i.scdn.co/image/ab67616d0000b27364a39cb73949c844fd76beda",
    releaseDate: "2026-04-16",
    durationMs: 124119,
    spotifyUrl: "https://open.spotify.com/track/7HEKdoES29KDfPtTD8j8Ky",
    previewUrl: null,
    uri: "spotify:track:7HEKdoES29KDfPtTD8j8Ky",
  },
  {
    id: "04bblc5Abrtw9TOoAP0Amz",
    title: "PHOBIA",
    artist: "Mahdy Madness",
    albumName: "PHOBIA",
    albumArt: "https://i.scdn.co/image/ab67616d0000b27364a39cb73949c844fd76beda",
    releaseDate: "2026-04-16",
    durationMs: 273068,
    spotifyUrl: "https://open.spotify.com/track/04bblc5Abrtw9TOoAP0Amz",
    previewUrl: null,
    uri: "spotify:track:04bblc5Abrtw9TOoAP0Amz",
  },
  {
    id: "1srF1vpxZlOLkuojIxAj0q",
    title: "BNDWAR",
    artist: "Mahdy Madness",
    albumName: "PHOBIA",
    albumArt: "https://i.scdn.co/image/ab67616d0000b27364a39cb73949c844fd76beda",
    releaseDate: "2026-04-16",
    durationMs: 152172,
    spotifyUrl: "https://open.spotify.com/track/1srF1vpxZlOLkuojIxAj0q",
    previewUrl: null,
    uri: "spotify:track:1srF1vpxZlOLkuojIxAj0q",
  },
  {
    id: "5UinoqY51RbunuOA8pz47Y",
    title: "VR",
    artist: "Mahdy Madness, Young Giza",
    albumName: "VR",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2738f979f79bd30ab2196f4557b",
    releaseDate: "2025-09-10",
    durationMs: 162253,
    spotifyUrl: "https://open.spotify.com/track/5UinoqY51RbunuOA8pz47Y",
    previewUrl: null,
    uri: "spotify:track:5UinoqY51RbunuOA8pz47Y",
  },
  {
    id: "62aC6KEFMqOnVOumwVWe1T",
    title: "ASHBA7",
    artist: "Mahdy Madness",
    albumName: "ASHBA7",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273ec264fb9b1e2ec6358b2beea",
    releaseDate: "2025-06-18",
    durationMs: 149608,
    spotifyUrl: "https://open.spotify.com/track/62aC6KEFMqOnVOumwVWe1T",
    previewUrl: null,
    uri: "spotify:track:62aC6KEFMqOnVOumwVWe1T",
  },
  {
    id: "1vo1fMaaQ0H4YIFgGUEeFj",
    title: "TENSANY EZAY",
    artist: "Ahmedythegr8, Nxur_, NourPK",
    albumName: "TENSANY EZAY",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273c62eae888b429bffbde966a5",
    releaseDate: "2022-10-23",
    durationMs: 236307,
    spotifyUrl: "https://open.spotify.com/track/1vo1fMaaQ0H4YIFgGUEeFj",
    previewUrl: null,
    uri: "spotify:track:1vo1fMaaQ0H4YIFgGUEeFj",
  },
  {
    id: "6sUrpN0JsJLUG5QB2Rt0RP",
    title: "BTZN",
    artist: "Ahmedythegr8, Flowstrr, Nxur_",
    albumName: "BTZN",
    albumArt: "https://i.scdn.co/image/ab67616d0000b2739d6e79df8764667fcedcc7f1",
    releaseDate: "2022-02-12",
    durationMs: 149551,
    spotifyUrl: "https://open.spotify.com/track/6sUrpN0JsJLUG5QB2Rt0RP",
    previewUrl: null,
    uri: "spotify:track:6sUrpN0JsJLUG5QB2Rt0RP",
  },
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

const FALLBACK_MAP = new Map<string, SpotifyVaultTrack>(
  FALLBACK_TRACKS.map((t) => [t.id, t])
);

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
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error;
    }
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

/**
 * Fetch a single track with timeout, retry, and fallback protection
 */
async function fetchTrackWithRetry(
  id: string,
  token: string,
  retries = 2
): Promise<SpotifyVaultTrack | null> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);

      const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
        next: { revalidate: 3600 },
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        return normalizeTrack(data);
      }

      if (res.status === 404 || res.status === 400) {
        console.warn(`Spotify track ${id} not found (${res.status})`);
        return FALLBACK_MAP.get(id) || null;
      }

      console.warn(`Attempt ${attempt + 1}: Spotify track ${id} returned status ${res.status}`);
    } catch (err: any) {
      console.warn(`Attempt ${attempt + 1}: Error fetching Spotify track ${id}:`, err?.message || err);
    }

    if (attempt < retries) {
      await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
    }
  }

  // Gracefully fallback to local track record if network request failed
  return FALLBACK_MAP.get(id) || null;
}

/**
 * Concurrency limiter to prevent socket saturation and ETIMEDOUT errors
 */
async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const currentIndex = nextIndex++;
      results[currentIndex] = await fn(items[currentIndex]);
    }
  }

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    () => worker()
  );
  await Promise.all(workers);
  return results;
}

/**
 * Fetch tracks by specific track IDs with controlled concurrency and resilient fallback
 */
export async function getTracksByIds(
  trackIds: string[] = AHMEDY_TRACK_IDS
): Promise<SpotifyVaultTrack[]> {
  const token = await getSpotifyAccessToken();

  if (!token) {
    const fallbackList = trackIds
      .map((id) => FALLBACK_MAP.get(id))
      .filter((t): t is SpotifyVaultTrack => Boolean(t));
    return fallbackList.length > 0 ? fallbackList : FALLBACK_TRACKS.slice(0, 8);
  }

  try {
    // Process at most 2 requests concurrently to avoid TLS socket saturation & ETIMEDOUT
    const tracks = await mapWithConcurrency(trackIds, 2, (id) =>
      fetchTrackWithRetry(id, token)
    );

    const validTracks = tracks.filter((t): t is SpotifyVaultTrack => Boolean(t));

    if (validTracks.length > 0) {
      return validTracks;
    }

    const fallbackList = trackIds
      .map((id) => FALLBACK_MAP.get(id))
      .filter((t): t is SpotifyVaultTrack => Boolean(t));
    return fallbackList.length > 0 ? fallbackList : FALLBACK_TRACKS.slice(0, 8);
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") {
      throw error;
    }
    console.error("Error fetching Spotify tracks by IDs:", error);
    const fallbackList = trackIds
      .map((id) => FALLBACK_MAP.get(id))
      .filter((t): t is SpotifyVaultTrack => Boolean(t));
    return fallbackList.length > 0 ? fallbackList : FALLBACK_TRACKS.slice(0, 8);
  }
}
