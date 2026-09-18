"use client";

import { useState, useRef } from "react";
import { Disc, ExternalLink } from "lucide-react";
import { FaSpotify, FaYoutube } from "react-icons/fa";
import { SpotifyVaultTrack } from "@/lib/spotify";
import { SHOWCASE_BEATS, STATIC_MUSIC_VIDEOS, ShowcaseBeat } from "./types";
import AllSongsTab from "./AllSongsTab";
import BeatsTab from "./BeatsTab";
import MusicVideosTab from "./MusicVideosTab";

export { STATIC_MUSIC_VIDEOS, SHOWCASE_BEATS };
export type { MusicVideo, ShowcaseBeat } from "./types";

interface VaultClientProps {
  initialTracks: SpotifyVaultTrack[];
}

export default function VaultClient({ initialTracks }: VaultClientProps) {
  const [tracks] = useState<SpotifyVaultTrack[]>(initialTracks);
  const [activeTrack, setActiveTrack] = useState<SpotifyVaultTrack>(
    initialTracks[0] || null
  );
  const [activeBeat, setActiveBeat] = useState<ShowcaseBeat>(SHOWCASE_BEATS[0]);
  const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL SONGS");
  const [isPlayingPreview, setIsPlayingPreview] = useState<boolean>(false);
  const [showEmbedPlayer, setShowEmbedPlayer] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      setIsPlayingPreview(false);
      setShowEmbedPlayer(true);
    }
  };

  const handlePlayBeat = (beat: ShowcaseBeat) => {
    if (activeBeat?.id === beat.id && isPlayingPreview) {
      audioRef.current?.pause();
      setIsPlayingPreview(false);
      return;
    }

    const isSameBeat =
      activeBeat?.id === beat.id &&
      !!audioRef.current &&
      audioRef.current.src.includes(beat.audioUrl);

    setActiveBeat(beat);

    if (audioRef.current) {
      setShowEmbedPlayer(false);
      if (!isSameBeat || audioRef.current.ended) {
        audioRef.current.src = beat.audioUrl;
        audioRef.current.currentTime = 0;
      }
      audioRef.current
        .play()
        .then(() => setIsPlayingPreview(true))
        .catch((err) => {
          console.warn("Beat audio playback failed:", err);
          setIsPlayingPreview(false);
        });
    }
  };

  const handleBeatSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetDuration = audioRef.current.duration || (activeBeat ? activeBeat.durationMs / 1000 : 0);
    if (targetDuration > 0) {
      const newTime = ratio * targetDuration;
      audioRef.current.currentTime = newTime;
      setAudioCurrentTime(newTime);
    }
  };

  const handleFilterChange = (filter: string) => {
    if (filter !== selectedFilter) {
      audioRef.current?.pause();
      setIsPlayingPreview(false);
      setShowEmbedPlayer(false);
      setAudioCurrentTime(0);
      setSelectedFilter(filter);
    }
  };

  const filters = ["ALL SONGS", "MUSIC VIDEOS", "BEATS"];

  return (
    <div className="w-full bg-background min-h-screen text-foreground pb-24">
      {/* Universal audio element for tracks and showcase beats */}
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setAudioCurrentTime(audioRef.current.currentTime);
            if (audioRef.current.duration && !isNaN(audioRef.current.duration)) {
              setAudioDuration(audioRef.current.duration);
            }
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current && audioRef.current.duration && !isNaN(audioRef.current.duration)) {
            setAudioDuration(audioRef.current.duration);
          }
        }}
        onEnded={() => setIsPlayingPreview(false)}
        onError={() => {
          setIsPlayingPreview(false);
          if (selectedFilter === "ALL SONGS") {
            setShowEmbedPlayer(true);
          }
        }}
      />

      {/* Header & Filter Navigation */}
      <section className="border-b border-secondary pt-16 pb-8 bg-gradient-to-b from-black via-background to-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-primary font-space text-xs tracking-widest uppercase mb-2">
                {selectedFilter === "BEATS" ? (
                  <>
                    <Disc className="w-4 h-4 text-primary animate-spin" />
                    <span>STUDIO ARCHIVE // BEAT SHOWCASE</span>
                  </>
                ) : selectedFilter === "MUSIC VIDEOS" ? (
                  <>
                    <FaYoutube className="w-4 h-4 text-[#FF0000]" />
                    <span>VISUAL ARCHIVE // OFFICIAL VIDEOS</span>
                  </>
                ) : (
                  <>
                    <FaSpotify className="w-4 h-4 text-[#1DB954]" />
                    <span>SPOTIFY ARCHIVE // OFFICIAL DISCOGRAPHY</span>
                  </>
                )}
              </div>
              <h1 className="font-bebas text-5xl sm:text-7xl tracking-wider uppercase text-white m-0">
                {selectedFilter === "BEATS"
                  ? "THE VAULT // BEATS"
                  : selectedFilter === "MUSIC VIDEOS"
                  ? "THE VAULT // VISUALS"
                  : "THE VAULT // RELEASES"}
              </h1>
              <p className="font-space text-xs text-muted tracking-widest uppercase mt-2">
                {selectedFilter === "BEATS"
                  ? "8 SHOWCASE INSTRUMENTALS // PRODUCED AT GR8NIK STUDIOS"
                  : selectedFilter === "MUSIC VIDEOS"
                  ? "OFFICIAL VISUAL PRODUCTIONS & MUSIC VIDEOS"
                  : "LIVE MUSIC"}
              </p>
            </div>

            {selectedFilter === "BEATS" ? (
              <a
                href="https://www.youtube.com/channel/UCDSYjeJct4T7IJAVsgL8AwA"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-[#FF0000]/50 bg-[#050505] hover:border-[#FF0000] hover:bg-[#FF0000]/10 font-space text-xs tracking-widest text-[#FF0000] transition-all"
              >
                <FaYoutube className="w-4 h-4 text-[#FF0000]" />
                <span>YOUTUBE BEATS CHANNEL</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : selectedFilter === "MUSIC VIDEOS" ? (
              <a
                href="https://www.youtube.com/channel/UCDSYjeJct4T7IJAVsgL8AwA"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 px-5 py-2.5 border border-[#FF0000]/50 bg-[#050505] hover:border-[#FF0000] hover:bg-[#FF0000]/10 font-space text-xs tracking-widest text-[#FF0000] transition-all"
              >
                <FaYoutube className="w-4 h-4 text-[#FF0000]" />
                <span>OFFICIAL YOUTUBE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
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
            )}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-3 font-space text-xs tracking-widest">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterChange(filter)}
                className={`px-4 py-2 border transition-all uppercase cursor-pointer ${
                  selectedFilter === filter
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

      {/* VIEW 1: ALL SONGS (Spotify Releases) */}
      {selectedFilter === "ALL SONGS" && (
        <AllSongsTab
          tracks={tracks}
          activeTrack={activeTrack}
          onSelectTrack={setActiveTrack}
          onPlayPreview={handlePlayPreview}
          isPlayingPreview={isPlayingPreview}
          showEmbedPlayer={showEmbedPlayer}
          onToggleEmbedPlayer={() => setShowEmbedPlayer(!showEmbedPlayer)}
        />
      )}

      {/* VIEW 2: BEATS (8 Showcase Beats & YouTube Channel Link) */}
      {selectedFilter === "BEATS" && (
        <BeatsTab
          beats={SHOWCASE_BEATS}
          activeBeat={activeBeat}
          onSelectBeat={handlePlayBeat}
          isPlaying={isPlayingPreview}
          currentTime={audioCurrentTime}
          duration={audioDuration}
          onSeek={handleBeatSeek}
        />
      )}

      {/* VIEW 3: MUSIC VIDEOS SECTION (YouTube Grid & Modal) */}
      {selectedFilter === "MUSIC VIDEOS" && (
        <MusicVideosTab videos={STATIC_MUSIC_VIDEOS} />
      )}
    </div>
  );
}
