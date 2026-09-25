import Link from "next/link";
import { ArrowUpRight, ArrowRight, Disc } from "lucide-react";
import { FaSpotify, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

interface SpotifyPlaylistProps {
  /**
   * Spotify Playlist ID or full open.spotify.com/playlist/... URL.
   * Defaults to a curated hip-hop playlist if not provided.
   */
  playlistId?: string;
  /**
   * Optional custom direct Spotify playlist URL for external link button.
   */
  playlistUrl?: string;
  /**
   * If true, formats the component cleanly for embedding inside tabs (e.g. Join the Cult tab)
   */
  isTab?: boolean;
  /**
   * If true, renders Cult network social links (Instagram, YouTube)
   */
  showSocials?: boolean;
}

// Default curated playlist: RapCaviar / Urban sound (can be customized via props or directly here)
const DEFAULT_PLAYLIST_ID = "3HVdF0oFrRlQhqnLRVcEO2";

function extractSpotifyPlaylistId(input: string): string {
  if (!input) return DEFAULT_PLAYLIST_ID;
  const trimmed = input.trim();
  const match = trimmed.match(/playlist[\/:]([a-zA-Z0-9]+)/);
  if (match && match[1]) {
    return match[1];
  }
  return trimmed.split("?")[0];
}

export default function SpotifyPlaylist({
  playlistId = DEFAULT_PLAYLIST_ID,
  playlistUrl,
  isTab = false,
  showSocials = false,
}: SpotifyPlaylistProps) {
  const cleanPlaylistId = extractSpotifyPlaylistId(playlistId);
  const directSpotifyUrl =
    playlistUrl || `https://open.spotify.com/playlist/${cleanPlaylistId}`;

  const content = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      {/* Left Column: Text & Context */}
      <div className="lg:col-span-6 flex flex-col items-start text-left">
        {/* Tactical Tag */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[#1DB954]/40 bg-[#1DB954]/10 text-[#1DB954] font-space text-[11px] tracking-[0.25em] uppercase mb-6">
          <FaSpotify className="w-3.5 h-3.5" />
          <span>CATCH THE GR8CULT</span>
        </div>

        {/* Title in Bebas Neue */}
        <h2 className="font-bebas text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-none mb-6">
          THE SOUND OF <br />
          <span className="text-primary">GR8NIK.</span>
        </h2>

        {/* Motivating Copy */}
        <p className="font-space text-sm md:text-base text-gray-300 leading-relaxed max-w-xl mb-4 font-light">

          The music coming out of the room.
          <br />
          Beats we've made.
          <br />
          Records we've worked on.
          <br />
          Artists we're building with.
          <br />
          Sounds we're discovering.
          <br />

          From Cairo's underground to wherever the music takes us
        </p>

        <p className="font-space text-xs md:text-sm text-muted uppercase tracking-[0.2em] max-w-lg mb-8">
          HEAVY 808S // REAL ARTISTS // REAL RECORDS.
        </p>

        {/* Tactical Spec Badges */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-8">
          <div className="border border-zinc-900 bg-zinc-950/80 p-4">
            <div className="text-[10px] font-space text-muted tracking-widest uppercase mb-1">
              CURATION
            </div>
            <div className="text-xs font-space text-white tracking-wider font-semibold">
              HEAVY ROTATION
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
          <a
            href={directSpotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 bg-[#1DB954] text-black font-space text-xs font-bold uppercase tracking-widest px-7 py-4 hover:bg-white transition-all shadow-[0_0_25px_rgba(29,185,84,0.25)] group cursor-pointer"
          >
            <FaSpotify className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>OPEN IN SPOTIFY</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <Link
            href="/vault"
            className="flex items-center justify-center gap-3 border border-primary/60 bg-primary/10 text-zinc-100 font-space text-xs uppercase tracking-widest px-7 py-4 hover:border-primary hover:bg-primary/20 hover:text-white hover:shadow-[0_0_22px_rgba(214,0,0,0.5)] transition-all group cursor-pointer"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-80" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_6px_#D60000]" />
            </span>
            <Disc className="w-3.5 h-3.5 text-primary group-hover:rotate-180 transition-transform duration-500 shrink-0" />
            <span>ENTER THE VAULT</span>
            <ArrowRight className="w-4 h-4 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Optional Cult Network Links */}
        {showSocials && (
          <div className="mt-8 pt-6 border-t border-zinc-900 w-full">
            <div className="text-[10px] font-space text-muted tracking-widest uppercase mb-3">
              NETWORK // SOCIAL CHANNELS
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://www.instagram.com/gr8nikstudios/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 border border-zinc-800 text-muted font-space text-xs uppercase tracking-widest px-5 py-3 hover:border-primary hover:text-white transition-all bg-black"
              >
                <FaInstagram className="w-3.5 h-3.5 text-primary" />
                <span>INSTAGRAM</span>
              </a>
              <a
                href="https://www.tiktok.com/@gr8nikstudios"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 border border-zinc-800 text-muted font-space text-xs uppercase tracking-widest px-5 py-3 hover:border-primary hover:text-white transition-all bg-black"
              >
                <FaTiktok className="w-3.5 h-3.5 text-primary" />
                <span>TIKTOK</span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCDSYjeJct4T7IJAVsgL8AwA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 border border-zinc-800 text-muted font-space text-xs uppercase tracking-widest px-5 py-3 hover:border-primary hover:text-white transition-all bg-black"
              >
                <FaYoutube className="w-3.5 h-3.5 text-primary" />
                <span>YOUTUBE</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Spotify Playlist Integration */}
      <div className="lg:col-span-6 w-full">
        <div className="relative border border-zinc-800 bg-zinc-950/90 shadow-2xl">
          {/* Tactical Status Header Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800/80 bg-black text-[11px] font-space tracking-widest text-muted">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]"></span>
              </span>
              <span className="text-zinc-300 font-medium">
                GR8NIK_ARCHIVE // SPOTIFY_STREAM
              </span>
            </div>
            <span className="text-[#1DB954] text-[10px] tracking-[0.2em] font-mono uppercase font-bold">
              CONNECTED
            </span>
          </div>

          {/* Embedded Spotify Playlist Player */}
          <div className="p-2 sm:p-3 bg-black">
            <iframe
              src={`https://open.spotify.com/embed/playlist/${cleanPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="450"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full rounded-none border-0 shadow-inner"
              title="GR8NIK Studios Spotify Playlist"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (isTab) {
    return (
      <div
        id="playlist-tab"
        className="relative w-full bg-black border border-zinc-900 p-6 sm:p-8 lg:p-12 overflow-hidden"
      >
        <div className="w-full relative z-10">{content}</div>
      </div>
    );
  }

  return (
    <section
      id="playlist"
      className="relative w-full py-20 md:py-32 bg-black border-t border-zinc-900 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        {content}
      </div>
    </section>
  );
}
