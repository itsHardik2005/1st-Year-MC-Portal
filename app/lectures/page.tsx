"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import VideoPlayer from "@/components/VideoPlayer";
import { Video, ShieldCheck, PlayCircle, History, Clock, ArrowRight } from "lucide-react";

export default function LecturesPage() {
  const [lectures, setLectures] = useState<any[]>([]);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const defaultLectures = [
    {
      id: "55555555-5555-5555-5555-555555555555",
      title: "Data Structures & Neural Networks Masterclass",
      description: "Unlisted video lecture explaining Transformers, Convolutional Neural Networks (CNNs), Backpropagation calculus, and Attention mechanics.",
      video_id: "dQw4w9WgXcQ",
      duration: "52 mins",
      instructor: "Prof. Alan Turing",
      isUnlisted: true,
      lastPlayedTimestamp: "27:04",
      progressPercent: 52,
    },
    {
      id: "66666666-6666-6666-6666-666666666666",
      title: "System Design & Scalable Distributed Architectures",
      description: "Unlisted video lecture detailing load balancers, consistent hashing algorithms, database sharding, and caching strategies.",
      video_id: "L302GZou0jI",
      duration: "68 mins",
      instructor: "Dr. Grace Hopper",
      isUnlisted: true,
      lastPlayedTimestamp: "12:15",
      progressPercent: 18,
    },
  ];

  useEffect(() => {
    const fetchLectures = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || "student@portal.edu");

      const { data } = await supabase
        .from("materials")
        .select("*")
        .eq("category", "lecture");

      if (data && data.length > 0) {
        setLectures(data);
      } else {
        setLectures(defaultLectures);
      }
    };

    fetchLectures();
  }, []);

  const scrollToVideo = (id: string) => {
    const el = document.getElementById(`lecture-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="border-3 sm:border-4 border-black bg-rose-400 p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-yellow-400 font-mono text-xs font-black uppercase border-2 border-black">
              <Video className="w-4 h-4 stroke-[3]" />
              <span>UNLISTED VIDEO STREAM LIBRARY</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tighter">
              UNLISTED YOUTUBE LECTURES
            </h1>
            <p className="text-xs font-bold text-black max-w-2xl bg-white p-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Embedded unlisted video streams using privacy-enhanced YouTube frames (`youtube-nocookie.com`) overlaid with live diagonal user email watermark.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-black bg-black text-yellow-400 px-4 py-2 border-2 border-black">
            <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>WATERMARKED EMBEDS</span>
          </div>
        </div>
      </div>

      {/* Resume Last Played Lecture Card */}
      <div className="border-3 sm:border-4 border-black bg-black text-white p-6 shadow-[8px_8px_0px_0px_rgba(236,72,153,1)] font-mono space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-zinc-800 pb-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-yellow-400 text-black text-xs font-black uppercase border border-white">
            <History className="w-4 h-4 stroke-[3]" />
            <span>RESUME LAST WATCHED LECTURE</span>
          </div>
          <span className="text-xs font-bold text-pink-400 bg-zinc-900 px-3 py-1 border border-zinc-700 uppercase">
            SAVED PLAYBACK STATE
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Thumbnail Preview Box */}
            <div className="relative w-full sm:w-44 aspect-video bg-zinc-900 border-2 border-white overflow-hidden shrink-0 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
              <img
                src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                alt="Lecture Thumbnail"
                className="w-full h-full object-cover filter contrast-125 opacity-80"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircle className="w-8 h-8 text-yellow-400 fill-current" />
              </div>
              <span className="absolute bottom-1 right-1 bg-black text-yellow-300 font-mono text-[9px] font-black px-1.5 py-0.5 border border-white">
                27:04
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black uppercase text-yellow-300 leading-tight">
                Data Structures & Neural Networks Masterclass
              </h3>
              <p className="text-xs text-zinc-300 max-w-xl font-sans font-bold">
                Prof. Alan Turing • Paused at timestamp <span className="text-pink-400 font-mono font-black">27:04</span> / 52:00 mins
              </p>

              {/* Playback progress bar */}
              <div className="space-y-1 pt-1 max-w-md">
                <div className="flex justify-between text-[10px] font-black text-zinc-400">
                  <span>LECTURE PLAYBACK PROGRESS</span>
                  <span className="text-yellow-400 font-bold">52% COMPLETED</span>
                </div>
                <div className="w-full bg-zinc-800 h-2.5 border border-zinc-600 overflow-hidden">
                  <div className="bg-pink-500 h-full w-[52%] border-r border-white" />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => scrollToVideo("55555555-5555-5555-5555-555555555555")}
            className="px-6 py-3 bg-yellow-400 text-black font-black text-xs uppercase border-2 border-white shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center space-x-2 shrink-0"
          >
            <PlayCircle className="w-5 h-5 stroke-[3] fill-current" />
            <span>CONTINUE WATCHING LECTURE</span>
          </button>
        </div>
      </div>

      {/* Lectures List */}
      <div className="space-y-8">
        {lectures.map((lec) => (
          <div key={lec.id} id={`lecture-${lec.id}`}>
            <VideoPlayer
              videoId={lec.video_id || "dQw4w9WgXcQ"}
              title={lec.title}
              description={lec.description}
              duration={lec.duration || "45 mins"}
              instructor={lec.instructor || "Faculty Professor"}
              isUnlisted={true}
              userEmail={userEmail}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

