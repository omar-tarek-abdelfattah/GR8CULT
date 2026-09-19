"use client";

import { Play, Square, ExternalLink, Disc, Music, Sparkles } from "lucide-react";
import { FaSpotify } from "react-icons/fa";
import { SpotifyVaultTrack } from "@/lib/spotify";
import { formatDuration } from "./types";

interface AllSongsTabProps {
  tracks: SpotifyVaultTrack[];
  activeTrack: SpotifyVaultTrack | null;
  onSelectTrack: (track: SpotifyVaultTrack) => void;
  onPlayPreview: (track: SpotifyVaultTrack) => void;
  isPlayingPreview: boolean;
  showEmbedPlayer: boolean;
  onToggleEmbedPlayer: () => void;
}

export default function AllSongsTab({
  tracks,
  activeTrack,
  onSelectTrack,
  onPlayPreview,
  isPlayingPreview,
  showEmbedPlayer,
  onToggleEmbedPlayer,
}: AllSongsTabProps) {
  return (
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
                    alt={`${activeTrack.title} by ${activeTrack.artist} - Engineered at GR8NIK STUDIOS`}
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
                      onClick={() => onPlayPreview(activeTrack)}
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
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={onToggleEmbedPlayer}
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
                        title={`Spotify audio player for ${activeTrack.title} by ${activeTrack.artist}`}
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
                  onClick={() => onSelectTrack(track)}
                  className={`border bg-[#050505] group transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                    isSelected
                      ? "border-primary shadow-[0_0_20px_rgba(214,0,0,0.25)]"
                      : "border-secondary/60 hover:border-primary"
                  }`}
                >
                  {/* Album Cover with Play Overlay */}
                  <div className="w-full aspect-square bg-[#0a0a0a] relative border-b border-secondary/50 group-hover:border-primary/50 overflow-hidden">
                    {track.albumArt ? (
                      <img
                        src={track.albumArt}
                        alt={`${track.title} by ${track.artist} - Official GR8NIK STUDIOS release`}
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
                          onPlayPreview(track);
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
                      <span className="text-secondary">
                        {track.releaseDate.split("-")[0]}
                      </span>
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
  );
}
