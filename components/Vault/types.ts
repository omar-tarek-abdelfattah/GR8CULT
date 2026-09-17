export interface MusicVideo {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string;
  thumbnail?: string;
  releaseDate?: string;
  role?: string;
}

export const STATIC_MUSIC_VIDEOS: MusicVideo[] = [
  {
    id: "mv-1",
    title: "MATCH TENNIS",
    artist: "MAHDY MADNESS",
    youtubeUrl: "https://youtu.be/uicpbIPw_ow?si=XFvQSfw8ygdvFNH5Z",
    releaseDate: "2026",
    role: "MUSIC VIDEO",
  },
  {
    id: "mv-2",
    title: "PHOBIA TEASER",
    artist: "MAHDY MADNESS",
    youtubeUrl: "https://youtu.be/R_dfBWS68Fo?si=gHJVYt5LXTgDEgCK",
    releaseDate: "2026",
    role: "SOUND DESIGN",
  },
  {
    id: "mv-3",
    title: "BNDAWAR",
    artist: "MAHDY MADNESS",
    youtubeUrl: "https://youtu.be/wY2FIk-ozZw?si=HeqxfLmcO1yCZgKZ",
    releaseDate: "2026",
    role: "MUSIC VIDEO/ RECORDED",
  },
  {
    id: "mv-4",
    title: "AHO GEH YA WLAD",
    artist: "Ahmedythegr8",
    youtubeUrl: "https://youtu.be/_qcgrHATozI?si=0pNehW0dvLU6EzKz",
    releaseDate: "2023",
    role: "WRITING/ RECORDING/ PRODUCING",
  },
];

export interface ShowcaseBeat {
  id: string;
  title: string;
  producer: string;
  bpm: number;
  key: string;
  genre: string;
  durationMs: number;
  audioUrl: string;
  thumbnail: string;
  tags?: string[];
}

export const SHOWCASE_BEATS: ShowcaseBeat[] = [
  {
    id: "beat-1",
    title: "PARADE",
    producer: "AHMEDYTHEGR8",
    bpm: 140,
    key: "A Min",
    genre: "AFRO / TRAP",
    durationMs: 167000,
    audioUrl: "https://d2flaqome864xs.cloudfront.net/beats/PARADE.mp3",
    thumbnail: "/logo-nobg.png",
    tags: ["PERCUSSION", "AFRO", "808"],
  },
  {
    id: "beat-2",
    title: "CHANCLAS",
    producer: "AHMEDYTHEGR8",
    bpm: 82,
    key: "G# Min",
    genre: "TRAP",
    durationMs: 158000,
    audioUrl: "https://d2flaqome864xs.cloudfront.net/beats/CHANCLAS.mp3",
    thumbnail: "/logo-nobg.png",
    tags: ["TRAP", "BELLS", "DARK"],
  },
  {
    id: "beat-3",
    title: "SELFISH",
    producer: "AHMEDYTHEGR8",
    bpm: 150,
    key: "B Min",
    genre: "TRAP / HARD",
    durationMs: 168000,
    audioUrl: "https://d2flaqome864xs.cloudfront.net/beats/SELFISH.mp3",
    thumbnail: "/logo-nobg.png",
    tags: ["BASS", "HARD", "GRIT"],
  },
  {
    id: "beat-4",
    title: "TALK",
    producer: "AHMEDYTHEGR8",
    bpm: 120,
    key: "C Min",
    genre: "MELANCHOLIC / SAD",
    durationMs: 240000,
    audioUrl: "https://d2flaqome864xs.cloudfront.net/beats/TALK.mp3",
    thumbnail: "/logo-nobg.png",
    tags: ["SAD", "ACOUSTIC", "MELANCHOLIC"],
  },
  {
    id: "beat-5",
    title: "SATURN",
    producer: "GR8NIK",
    bpm: 130,
    key: "F Maj",
    genre: "CHILL TRAP",
    durationMs: 179000,
    audioUrl: "https://d2flaqome864xs.cloudfront.net/beats/SATURN.mp3",
    thumbnail: "/logo-nobg.png",
    tags: ["SPACEY", "SMOOTH", "CHILL"],
  },
  {
    id: "beat-6",
    title: "DOWNTOWN",
    producer: "GR8NIK",
    bpm: 125,
    key: "G Min",
    genre: "MELODIC TRAP",
    durationMs: 124000,
    audioUrl: "https://d2flaqome864xs.cloudfront.net/beats/DOWNTOWN.mp3",
    thumbnail: "/logo-nobg.png",
    tags: ["SLIDING 808", "AGGRESSIVE", "DARK"],
  },
  {
    id: "beat-7",
    title: "DTF",
    producer: "GR8NIK",
    bpm: 150,
    key: "F Min",
    genre: "CHILL TRAP",
    durationMs: 155000,
    audioUrl: "https://d2flaqome864xs.cloudfront.net/beats/DTF.mp3",
    thumbnail: "/logo-nobg.png",
    tags: ["VOX", "ATMOSPHERIC", "DEEP"],
  },
  {
    id: "beat-8",
    title: "TBD",
    producer: "GR8NIK",
    bpm: 128,
    key: "E Maj",
    genre: "HARD TRAP",
    durationMs: 170000,
    audioUrl: "https://d2flaqome864xs.cloudfront.net/beats/TBD.mp3",
    thumbnail: "/logo-nobg.png",
    tags: ["ORCHESTRAL", "ANTHEM", "HEAVY"],
  },
];

export const STATIC_BEAT_BARS = [
  35, 55, 75, 45, 60, 85, 40, 70, 95, 65, 80, 50, 40, 65, 90, 100, 75, 60, 45, 80,
  95, 70, 55, 65, 85, 90, 60, 45, 75, 85, 100, 70, 50, 65, 80, 60, 45, 70, 85, 50,
];

export function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  return match ? match[1] : null;
}

export function formatDuration(ms: number): string {
  if (!ms) return "0:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
