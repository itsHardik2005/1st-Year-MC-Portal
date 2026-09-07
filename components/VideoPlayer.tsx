"use client";

import React, { useState, useEffect } from "react";
import { Play, Video, ShieldCheck, Clock, BookOpen, Lock } from "lucide-react";

interface VideoPlayerProps {
  videoId: string; // YouTube Video ID (e.g. 'dQw4w9WgXcQ')
  title: string;
  description?: string;
  duration?: string;
  instructor?: string;
  isUnlisted?: boolean;
  userEmail?: string | null;
}

export default function VideoPlayer({
  videoId,
  title,
  description,
  duration = "45 mins",
  instructor = "Prof. Alex Rivera",
  isUnlisted = true,
  userEmail = "student@portal.edu",
}: VideoPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [timestamp, setTimestamp] = useState("");
  const displayEmail = userEmail || "student@portal.edu";

  useEffect(() => {
    setTimestamp(new Date().toLocaleTimeString());
  }, []);

  // Clean YouTube embed URL using privacy-enhanced domain (youtube-nocookie.com)
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="w-full h-full flex flex-col font-mono select-none overflow-hidden bg-zinc-950 text-white">
      
      {/* Header Info Toolbar */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 bg-zinc-900 border-b border-zinc-800 text-xs font-mono text-zinc-200">
        <div className="flex items-center space-x-2 min-w-0 max-w-[60%] sm:max-w-md">
          <Video className="w-3.5 h-3.5 text-rose-400 stroke-[3] shrink-0" />
          <h3 className="font-bold text-xs uppercase tracking-tight truncate text-rose-300">
            {title}
          </h3>
        </div>

        <div className="flex items-center space-x-2 shrink-0 text-[11px]">
          <span className="text-zinc-400 hidden sm:inline">{instructor}</span>
          <span className="bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 px-1.5 py-0.5 font-mono text-[10px]">
            {duration}
          </span>
          {isUnlisted && (
            <span className="bg-rose-500/20 text-rose-300 border border-rose-500/40 px-1.5 py-0.5 text-[10px] font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-rose-400" />
              <span className="hidden md:inline">UNLISTED</span>
            </span>
          )}
        </div>
      </div>

      {/* Responsive 16:9 YouTube Iframe Container with Diagonal Email Watermark Overlay */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden flex-1">
        
        {/* Dynamic Watermark Overlay on Video Wrapper */}
        <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none opacity-20">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-10 p-4 sm:p-6 w-[150%] -translate-x-[15%] -rotate-12">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-2 border border-dashed border-white/30 bg-black/60 text-center"
              >
                <div className="text-[10px] sm:text-xs font-black tracking-wider uppercase font-mono bg-pink-600 text-white px-1.5 py-0.5 border border-white/50 truncate max-w-full">
                  {displayEmail}
                </div>
                <div className="text-[8px] text-zinc-400 font-mono font-bold mt-1 truncate">
                  UNLISTED STREAM • {timestamp}
                </div>
              </div>
            ))}
          </div>
        </div>

        {!isLoaded && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center bg-zinc-950 relative overflow-hidden">
            {/* YouTube Thumbnail Background Image */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-40 filter contrast-125"
            />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

            <div className="relative z-10 flex flex-col items-center max-w-sm px-4">
              <button
                onClick={() => setIsLoaded(true)}
                className="p-3 bg-yellow-400 text-black border border-black hover:bg-pink-500 hover:text-white transition-all duration-200 transform hover:-translate-y-1 hover:scale-105 mb-3 group shadow-[3px_3px_0px_0px_rgba(236,72,153,1)]"
                title="Play Lecture Stream"
              >
                <Play className="w-8 h-8 translate-x-0.5 fill-current" />
              </button>
              
              <h4 className="text-xs sm:text-sm font-bold uppercase text-zinc-100 bg-black/80 px-2.5 py-1 border border-zinc-700 line-clamp-2">
                {title}
              </h4>

              <button
                onClick={() => setIsLoaded(true)}
                className="mt-3 px-4 py-2 bg-yellow-400 text-black font-mono font-bold text-xs uppercase tracking-wider border border-black hover:bg-pink-500 hover:text-white transition-all duration-200 transform hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(236,72,153,1)] flex items-center space-x-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>START LECTURE STREAM</span>
              </button>
            </div>
          </div>
        )}

        {isLoaded && (
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0 relative z-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </div>

      {/* Description & Topics Footer */}
      {description && (
        <div className="px-3 py-2 bg-zinc-900 border-t border-zinc-800 text-[11px] font-mono text-zinc-400">
          <p className="line-clamp-2">{description}</p>
        </div>
      )}
    </div>
  );
}
