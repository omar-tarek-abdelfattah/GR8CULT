"use client";

import { useState } from "react";
import { Play, ExternalLink, Film, X } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { MusicVideo, getYouTubeId } from "./types";

interface MusicVideosTabProps {
  videos: MusicVideo[];
}

export default function MusicVideosTab({ videos }: MusicVideosTabProps) {
  const [selectedVideo, setSelectedVideo] = useState<MusicVideo | null>(null);

  return (
    <>
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
            {videos.map((mv) => {
              const videoId = getYouTubeId(mv.youtubeUrl);
              const thumb = videoId
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : mv.thumbnail || "/ahmedy-hero-bg.jpeg";

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
                  src={`https://www.youtube-nocookie.com/embed/${getYouTubeId(
                    selectedVideo.youtubeUrl
                  )}?autoplay=1`}
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
                    PASTE A VALID YOUTUBE VIDEO LINK INTO STATIC_MUSIC_VIDEOS ARRAY IN TYPES.TS
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
    </>
  );
}
