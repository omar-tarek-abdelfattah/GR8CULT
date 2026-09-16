"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Play, Square, ExternalLink, Disc, Music, Sparkles, Film, X } from "lucide-react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SpotifyVaultTrack } from "@/lib/spotify";

export interface MusicVideo {
  id: string;
  title: string;
  artist: string;
  youtubeUrl: string; // <-- Put your YouTube video links here!
  thumbnail?: string;
  releaseDate?: string;
  role?: string;
}

export const STATIC_MUSIC_VIDEOS: MusicVideo[] = [
  {
    id: "mv-1",
    title: "SABR",
    artist: "Ahmedythegr8",
    youtubeUrl: "https://youtu.be/lVFISrDb2Pc?si=JgHcLuO-glqVJOkZ",
    releaseDate: "2023",
    role: "PROD / MIX / MASTER",
  },
  {
    id: "mv-2",
    title: "AHO GEH YA WLAD",
    artist: "Ahmedythegr8",
    youtubeUrl: "https://youtu.be/_qcgrHATozI?si=0pNehW0dvLU6EzKz",
    releaseDate: "2023",
    role: "RECORDED / ENGINEERED",
  },
  {
    id: "mv-3",
    title: "MEEN",
    artist: "Ahmedythegr8",
    youtubeUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_3",
    releaseDate: "2023",
    role: "MIX & MASTER",
  },
  {
    id: "mv-4",
    title: "SHAB TAYESH",
    artist: "Ahmedythegr8",
    youtubeUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID_4",
    releaseDate: "2023",
    role: "EXECUTIVE PROD",
  },
];

function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  return match ? match[1] : null;
}

interface VaultClientProps {
  initialTracks: SpotifyVaultTrack[];
}

export default function VaultClient({ initialTracks }: VaultClientProps) {
  const [tracks] = useState<SpotifyVaultTrack[]>(initialTracks);
  const [activeTrack, setActiveTrack] = useState<SpotifyVaultTrack>(
    initialTracks[0] || null
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL SONGS");
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [showEmbedPlayer, setShowEmbedPlayer] = useState<boolean>(false);
  const [selectedVideo, setSelectedVideo] = useState<MusicVideo | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatDuration = (ms: number) => {
    if (!ms) return "0:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlayPreview = (track: SpotifyVaultTrack) => {
    if (activeTrack?.id === track.id && isPlayingPreview) {
      audioRef.current?.pause();
      setIsPlayingPreview(false);
      return;
    }

    setActiveTrack(track);

    if (track.previewUrl) {
      setShowEmbedPlayer(false);
      if (audioRef.current) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.currentTime = 0;
        audioRef.current
          .play()
          .then(() => setIsPlayingPreview(true))
          .catch((err) => {
            console.warn("Direct preview playback failed, falling back to Spotify Embed:", err);
            setShowEmbedPlayer(true);
          });
      }
    } else {
      // If Spotify didn't return a raw mp3 previewUrl, launch the official Spotify Embed Player!
      setIsPlayingPreview(false);
      setShowEmbedPlayer(true);
    }
  };

  const filters = ["ALL SONGS", "MUSIC VIDEOS"];

  const filteredTracks =
    selectedFilter === "ALL SONGS"
      ? tracks
      : tracks.filter((t) => t.albumName === selectedFilter);

  return (
    <div className="w-full bg-background min-h-screen text-foreground pb-24">
      {/* Hidden audio element for tracks that have preview_url */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlayingPreview(false)}
        onError={() => {
          setIsPlayingPreview(false);
          setShowEmbedPlayer(true);
        }}
      />

      {/* Header & Filter Navigation */}
      <section className="border-b border-secondary pt-16 pb-8 bg-gradient-to-b from-black via-background to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary font-space text-xs tracking-widest uppercase mb-2">
                <FaSpotify className="w-4 h-4 text-[#1DB954]" />
                <span>SPOTIFY ARCHIVE // OFFICIAL DISCOGRAPHY</span>
              </div>
              <h1 className="font-bebas text-5xl sm:text-7xl tracking-wider uppercase text-white m-0">
                THE VAULT // RELEASES
              </h1>
              <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
                LIVE METADATA SYNCED DIRECTLY VIA SPOTIFY WEB API
              </p>
            </div>

            <a
              href="https://open.spotify.com/artist/72v5C9amne1zphSU3n7H3u"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-[#1DB954]/50 bg-[#050505] hover:border-[#1DB954] hover:bg-[#1DB954]/10 font-space text-xs tracking-widest text-[#1DB954] transition-all"
            >
              <FaSpotify className="w-4 h-4 text-[#1DB954]" />
              <span>FOLLOW ON SPOTIFY</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 font-space text-xs tracking-widest">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-4 py-2 border transition-all uppercase cursor-pointer ${selectedFilter === filter
                  ? "bg-primary border-primary text-white shadow-[0_0_12px_rgba(214,0,0,0.3)]"
                  : "border-secondary/60 text-muted hover:border-primary hover:text-white bg-[#0a0a0a]"
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Conditional Rendering: ALL RELEASES (Spotify) vs MUSIC VIDEOS (YouTube) */}
      {selectedFilter === "ALL SONGS" ? (
        <>
          {/* Featured Release Hero Spotlight */}
          {activeTrack && (
            <section className="border-b border-secondary p-4 md:p-8 bg-gradient-to-r from-[#0d0202] via-[#080808] to-background">
              <div className="container mx-auto">
                <div className="w-full border border-primary/80 bg-[#0a0a0a] flex flex-col lg:flex-row relative group overflow-hidden shadow-[0_0_30px_rgba(214,0,0,0.15)]">
                  {/* Top Accent Badges */}
                  <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                    <span className="bg-primary text-white font-space text-[10px] tracking-widest px-3 py-1 uppercase shadow-md flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      CURRENT_ROTATION
                    </span>
                    <span className="bg-black/80 backdrop-blur-md border border-secondary/50 text-muted font-space text-[10px] tracking-widest px-2.5 py-1 uppercase">
                      {activeTrack.albumName}
                    </span>
                  </div>

                  {/* Album Art Showcase */}
                  <div className="w-full lg:w-2/5 aspect-square relative overflow-hidden border-b lg:border-b-0 lg:border-r border-secondary/50 bg-[#000]">
                    {activeTrack.albumArt ? (
                      <img
                        src={activeTrack.albumArt}
                        alt={activeTrack.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#111]">
                        <Disc className="w-20 h-20 text-muted animate-spin" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Track Metadata & Audio Controls */}
                  <div className="p-6 md:p-10 flex flex-col justify-between flex-grow gap-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-space text-xs text-primary tracking-[0.25em] uppercase">
                          {activeTrack.artist}
                        </span>
                        <span className="text-secondary">•</span>
                        <span className="font-space text-xs text-muted tracking-widest">
                          {activeTrack.releaseDate.split("-")[0]}
                        </span>
                      </div>

                      <h2 className="font-bebas text-4xl sm:text-6xl text-white mb-4 tracking-wider">
                        {activeTrack.title}
                      </h2>

                      {/* Audio Metadata Specs */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6 max-w-lg">
                        <div className="border border-secondary/40 bg-black/60 p-3">
                          <span className="font-space text-[10px] text-muted tracking-widest block uppercase">
                            DURATION
                          </span>
                          <span className="font-space text-sm text-white font-bold">
                            {formatDuration(activeTrack.durationMs)}
                          </span>
                        </div>
                        <div className="border border-secondary/40 bg-black/60 p-3">
                          <span className="font-space text-[10px] text-muted tracking-widest block uppercase">
                            RELEASE DATE
                          </span>
                          <span className="font-space text-sm text-white font-bold">
                            {activeTrack.releaseDate}
                          </span>
                        </div>
                        <div className="border border-secondary/40 bg-black/60 p-3 col-span-2 sm:col-span-1">
                          <span className="font-space text-[10px] text-muted tracking-widest block uppercase">
                            AUDIO ENGINE
                          </span>
                          <span className="font-space text-sm text-primary font-bold">
                            GR8NIK MASTER
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Player */}
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-wrap items-center gap-4">
                        <button
                          onClick={() => handlePlayPreview(activeTrack)}
                          className="bg-primary hover:bg-white text-white hover:text-black font-space text-xs px-6 py-3 tracking-widest transition-all uppercase flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(214,0,0,0.3)]"
                        >
                          {isPlayingPreview ? (
                            <>
                              <Square className="w-3.5 h-3.5 fill-current" />
                              <span>STOP PREVIEW</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 fill-current" />
                              <span>PLAY 30S PREVIEW</span>
                            </>
                          )}
                        </button>

                        <a
                          href={activeTrack.spotifyUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-[#1DB954] bg-[#050505] hover:bg-[#1DB954] text-[#1DB954] hover:text-black font-space text-xs px-6 py-3 tracking-widest transition-all uppercase flex items-center gap-2.5 cursor-pointer"
                        >
                          <FaSpotify className="w-4 h-4" />
                          <span>OPEN IN SPOTIFY</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>

                        <button
                          onClick={() => setShowEmbedPlayer(!showEmbedPlayer)}
                          className="border border-secondary text-muted hover:border-primary hover:text-white font-space text-xs px-5 py-3 tracking-widest transition-colors uppercase cursor-pointer"
                        >
                          {showEmbedPlayer ? "HIDE SPOTIFY PLAYER" : "SPOTIFY PLAYER"}
                        </button>
                      </div>

                      {/* Embedded Spotify Player Preview */}
                      {showEmbedPlayer && (
                        <div className="mt-4 border border-secondary/60 bg-black/80 p-2 rounded-none animate-in fade-in duration-300">
                          <div className="flex items-center justify-between px-2 pb-2 text-[10px] font-space text-muted tracking-widest">
                            <span>SPOTIFY_WEB_PLAYER // {activeTrack.title}</span>
                            <span className="text-[#1DB954]">STREAMING CONNECTED</span>
                          </div>
                          <iframe
                            src={`https://open.spotify.com/embed/track/${activeTrack.id}?utm_source=generator&theme=0`}
                            width="100%"
                            height="152"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            className="rounded-none bg-black"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Grid of All Spotify Releases */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-8 border-b border-secondary/40 pb-4">
                <h3 className="font-bebas text-3xl tracking-wider text-white uppercase m-0">
                  CATALOGUE ARCHIVE ({tracks.length})
                </h3>
                <span className="font-space text-xs text-muted tracking-widest">
                  STREAMING // ONLINE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {tracks.map((track) => {
                  const isSelected = activeTrack?.id === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => setActiveTrack(track)}
                      className={`border bg-[#050505] group transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${isSelected
                        ? "border-primary shadow-[0_0_20px_rgba(214,0,0,0.25)]"
                        : "border-secondary/60 hover:border-primary"
                        }`}
                    >
                      {/* Album Cover with Play Overlay */}
                      <div className="w-full aspect-square bg-[#0a0a0a] relative border-b border-secondary/50 group-hover:border-primary/50 overflow-hidden">
                        {track.albumArt ? (
                          <img
                            src={track.albumArt}
                            alt={track.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Music className="w-12 h-12 text-muted" />
                          </div>
                        )}

                        {/* Quick Play Preview Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayPreview(track);
                            }}
                            className="w-12 h-12 bg-primary hover:bg-white text-white hover:text-black flex items-center justify-center transition-transform hover:scale-110 shadow-lg cursor-pointer"
                            title="Play Preview"
                          >
                            {isSelected && isPlayingPreview ? (
                              <Square className="w-4 h-4 fill-current" />
                            ) : (
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            )}
                          </button>
                          <a
                            href={track.spotifyUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="w-12 h-12 bg-[#0a0a0a] border border-[#1DB954] hover:bg-[#1DB954] text-[#1DB954] hover:text-black flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                            title="Open in Spotify"
                          >
                            <FaSpotify className="w-5 h-5" />
                          </a>
                        </div>
                      </div>

                      {/* Card Content & Metadata */}
                      <div className="p-4 flex flex-col flex-grow justify-between gap-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-space text-[10px] text-muted tracking-widest uppercase truncate max-w-[70%]">
                              {track.albumName}
                            </span>
                            <span className="font-space text-[10px] text-primary tracking-widest">
                              {formatDuration(track.durationMs)}
                            </span>
                          </div>
                          <h4 className="font-bebas text-2xl text-white group-hover:text-primary transition-colors tracking-wide m-0">
                            {track.title}
                          </h4>
                          <p className="font-space text-xs text-muted tracking-widest uppercase mt-0.5">
                            {track.artist}
                          </p>
                        </div>

                        <div className="flex justify-between items-center border-t border-secondary/50 pt-2 font-space text-[10px] tracking-widest">
                          <span className="text-secondary">{track.releaseDate.split("-")[0]}</span>
                          <span className="text-primary hover:underline flex items-center gap-1">
                            SELECT &gt;
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      ) : (
        /* MUSIC VIDEOS SECTION (Static Array) */
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b border-secondary/40 pb-4 gap-2">
              <div>
                <h3 className="font-bebas text-4xl sm:text-5xl tracking-wider text-white uppercase m-0">
                  OFFICIAL MUSIC VIDEOS
                </h3>
                <p className="font-space text-xs text-muted tracking-widest uppercase mt-1">
                  OFFICIAL VISUALS &amp; VIDEO PRODUCTIONS // DIRECT LINK ACCESS
                </p>
              </div>
              <a
                href="https://www.youtube.com/channel/UCDSYjeJct4T7IJAVsgL8AwA"
                target="_blank"
                rel="noreferrer"
                className="font-space text-xs text-[#FF0000] hover:text-white flex items-center gap-2 tracking-widest transition-colors w-fit"
              >
                <FaYoutube className="w-4 h-4" />
                <span>OFFICIAL YOUTUBE CHANNEL &gt;</span>
              </a>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {STATIC_MUSIC_VIDEOS.map((mv) => {
                const videoId = getYouTubeId(mv.youtubeUrl);
                const thumb = videoId
                  ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                  : (mv.thumbnail || "/ahmedy-hero-bg.jpeg");

                return (
                  <div
                    key={mv.id}
                    className="border border-secondary/70 bg-[#080808] group hover:border-primary transition-all duration-300 flex flex-col overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                  >
                    {/* Video Thumbnail with Play Button */}
                    <div
                      onClick={() => setSelectedVideo(mv)}
                      className="relative w-full aspect-video bg-black overflow-hidden cursor-pointer"
                    >
                      <img
                        src={thumb}
                        alt={mv.title}
                        onError={(e) => {
                          const img = e.currentTarget as HTMLImageElement;
                          if (videoId && img.src.includes("maxresdefault")) {
                            img.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                          } else {
                            img.src = mv.thumbnail || "/ahmedy-hero-bg.jpeg";
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-primary/90 text-white flex items-center justify-center shadow-[0_0_25px_rgba(214,0,0,0.6)] group-hover:scale-110 group-hover:bg-white group-hover:text-black transition-all">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </div>
                      </div>

                      <div className="absolute bottom-3 right-3 bg-black/85 backdrop-blur-md px-2.5 py-1 border border-secondary/50 font-space text-[10px] text-white tracking-widest uppercase flex items-center gap-1.5">
                        <FaYoutube className="w-3.5 h-3.5 text-[#FF0000]" />
                        <span>HD 4K</span>
                      </div>
                    </div>

                    {/* Metadata & Direct Links */}
                    <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-space text-[10px] text-primary tracking-widest uppercase">
                            {mv.role || "OFFICIAL RELEASE"}
                          </span>
                          <span className="font-space text-[10px] text-muted tracking-widest">
                            {mv.releaseDate}
                          </span>
                        </div>
                        <h4 className="font-bebas text-3xl text-white group-hover:text-primary transition-colors tracking-wide m-0">
                          {mv.title}
                        </h4>
                        <p className="font-space text-xs text-muted tracking-widest uppercase mt-1">
                          {mv.artist}
                        </p>
                      </div>

                      <div className="flex items-center justify-between border-t border-secondary/40 pt-4 gap-3">
                        <button
                          onClick={() => setSelectedVideo(mv)}
                          className="bg-primary hover:bg-white text-white hover:text-black font-space text-xs px-5 py-2.5 tracking-widest transition-all uppercase flex items-center gap-2 cursor-pointer"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>WATCH VIDEO</span>
                        </button>

                        <a
                          href={mv.youtubeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-secondary/60 hover:border-[#FF0000] text-muted hover:text-white font-space text-xs px-4 py-2.5 tracking-widest transition-colors uppercase flex items-center gap-2"
                        >
                          <FaYoutube className="w-3.5 h-3.5 text-[#FF0000]" />
                          <span className="hidden sm:inline">ON YOUTUBE</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Video Modal Player (opens on click) */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative w-full max-w-4xl border border-primary/70 bg-[#0a0a0a] shadow-[0_0_50px_rgba(214,0,0,0.3)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-secondary/50 bg-black">
              <div className="flex items-center gap-2">
                <FaYoutube className="w-5 h-5 text-[#FF0000]" />
                <span className="font-bebas text-2xl text-white tracking-wider">
                  {selectedVideo.title} — {selectedVideo.artist}
                </span>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="text-muted hover:text-white p-1 cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Video Iframe or Fallback Container */}
            <div className="relative w-full aspect-video bg-black">
              {getYouTubeId(selectedVideo.youtubeUrl) ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(selectedVideo.youtubeUrl)}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <Film className="w-16 h-16 text-secondary mb-4 animate-pulse" />
                  <p className="font-space text-sm text-white tracking-widest uppercase mb-2">
                    {selectedVideo.title}
                  </p>
                  <p className="font-space text-xs text-muted tracking-widest uppercase max-w-md">
                    PASTE A VALID YOUTUBE VIDEO LINK INTO STATIC_MUSIC_VIDEOS ARRAY IN VAULTCLIENT.TSX
                  </p>
                  <a
                    href={selectedVideo.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 px-6 py-2.5 border border-primary text-primary hover:bg-primary hover:text-white font-space text-xs tracking-widest uppercase transition-all"
                  >
                    TEST LINK ON YOUTUBE &gt;
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 flex items-center justify-between border-t border-secondary/50 bg-[#050505] text-xs font-space text-muted">
              <span className="text-secondary tracking-widest uppercase">
                {selectedVideo.role || "OFFICIAL VIDEO PRODUCTION"}
              </span>
              <a
                href={selectedVideo.youtubeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#FF0000] hover:text-white flex items-center gap-1.5 tracking-widest uppercase transition-colors"
              >
                <FaYoutube className="w-4 h-4" />
                <span>OPEN ON YOUTUBE</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
