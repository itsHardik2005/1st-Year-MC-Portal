"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Layers,
  Video,
  FileClock,
  ArrowRight,
  Hash,
  Zap,
  Calculator,
  Code,
  Calendar,
  Megaphone,
  Clock,
  MapPin,
  School,
  History,
  PlayCircle,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const [activeHighlightTab, setActiveHighlightTab] = useState<"exams" | "notices">("exams");

  const examSchedules = [
    { date: "OCT 10, 2026", code: "LAB-EVAL", title: "Mid-Semester Lab Viva Submissions", time: "09:00 AM - 04:00 PM", venue: "Computer Center & Physics Labs" },
    { date: "OCT 28 - NOV 05, 2026", code: "MID-SEM", title: "1st Year Mid-Semester Examinations", time: "10:00 AM & 02:00 PM", venue: "Main Academic Block (Halls A-F)" },
    { date: "NOV 30, 2026", code: "PRACTICAL", title: "Final Engineering Practical Viva Voce", time: "09:30 AM Onward", venue: "Respective Department Labs" },
    { date: "DEC 10 - DEC 22, 2026", code: "END-SEM", title: "University End-Semester Theory Exams", time: "09:30 AM - 12:30 PM", venue: "University Examination Hall" },
  ];

  const collegeNotices = [
    {
      id: 1,
      badge: "PRAYAG TECH FEST",
      badgeColor: "bg-pink-500 text-white",
      title: "PRAYAG 2026: Annual Tech Fest",
      date: "OCT 05, 2026",
      desc: "Annual inter-departmental innovation hackathon hosted by the 1st Year Student Advisory Committee.",
    },
    {
      id: 2,
      badge: "CENTRAL LIBRARY",
      badgeColor: "bg-cyan-300 text-black",
      title: "24/7 Central Library Reading Room Access During Midterm Exams",
      date: "OCT 12, 2026",
      desc: "Central Library digital computer section and study halls will remain open round-the-clock for 1st-year B.Tech exam prep.",
    },
    {
      id: 3,
      badge: "MAKAUT EXAMINATION",
      badgeColor: "bg-yellow-400 text-black font-black",
      title: "MAKAUT B.Tech 1st Year Mid-Semester Viva Voce Schedule",
      date: "OCT 20, 2026",
      desc: "Official MAKAUT Semester 1 theory exam dates and practical laboratory viva voce timetables released on notice board.",
    },
  ];

  const recentHistoryData = [
    {
      id: "h1",
      code: "MATH-101",
      subject: "Mathematics-1",
      title: "Unit I: Differential Calculus & Rolle's Theorem",
      type: "Syllabus Unit",
      accessedAt: "12 mins ago",
      progressPercent: 75,
      route: "/core",
      badgeBg: "bg-cyan-300 text-black",
      thumbnail: null,
    },
    {
      id: "h2",
      code: "PHYS-102",
      subject: "Engineering Physics",
      title: "Quantum Mechanics & Matter Waves Problem Set",
      type: "PDF Vault",
      accessedAt: "2 hours ago",
      progressPercent: 40,
      route: "/core",
      badgeBg: "bg-pink-500 text-white",
      thumbnail: null,
    },
    {
      id: "h3",
      code: "CS-103",
      subject: "Data Structures",
      title: "Pointers, Stacks & Memory Allocation Cheat Sheet",
      type: "Temp Vault",
      accessedAt: "Yesterday",
      progressPercent: 90,
      route: "/temp-pdfs",
      badgeBg: "bg-yellow-400 text-black",
      thumbnail: null,
    },
    {
      id: "h4",
      code: "EE-104",
      subject: "Basic Electrical Eng.",
      title: "DC Circuit Mesh & Nodal Analysis Video Stream",
      type: "Video Lecture",
      accessedAt: "1 day ago",
      progressPercent: 60,
      route: "/lectures",
      badgeBg: "bg-purple-300 text-black",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10 font-sans">

      {/* Streamlined Student Hero Banner */}
      <div className="border-3 sm:border-4 border-black bg-yellow-400 p-6 sm:p-10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-yellow-300 border-2 border-black font-mono text-xs font-black uppercase">
            <Hash className="w-4 h-4 text-yellow-400 stroke-[4] shrink-0" />
            <span>ACADEMIC STUDY PORTAL • B.TECH 1ST YEAR</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-black leading-tight">
            1ST YEAR MC PORTAL
          </h1>

          <p className="text-xs sm:text-sm font-bold text-black leading-relaxed bg-white p-3.5 border-2 sm:border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-mono">
            Clean, focused portal for 1st-year engineering students. Access course notes, unlisted video lectures, and upcoming exam schedules.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#recent-history"
              className="px-6 py-3 bg-black text-yellow-300 font-black text-xs sm:text-sm uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center space-x-2 font-mono"
            >
              <History className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3] text-pink-500" />
              <span>CONTINUE LEARNING</span>
            </a>

            <Link
              href="/core"
              className="px-6 py-3 bg-white text-black font-black text-xs sm:text-sm uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <span>EXPLORE SUBJECTS</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[3]" />
            </Link>

            <a
              href="#college-highlights"
              className="px-6 py-3 bg-pink-500 text-white font-black text-xs sm:text-sm uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200 transform hover:-translate-y-1 flex items-center justify-center space-x-2 font-mono"
            >
              <Calendar className="w-4 h-4 stroke-[3]" />
              <span>EXAMS & NOTICES</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: CONTINUE LEARNING // RECENT STUDY HISTORY */}
      {/* ========================================================================= */}
      <div id="recent-history" className="space-y-4 scroll-mt-24">

        {/* Section Header */}
        <div className="border-3 sm:border-4 border-black bg-black text-white p-4 sm:p-5 shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-yellow-400 text-black font-mono text-xs font-black uppercase border-2 border-white">
              <History className="w-4 h-4 text-black stroke-[3]" />
              <span>CONTINUE LEARNING // RECENT STUDY HISTORY</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-yellow-300 tracking-tight">
              RESUME YOUR ACADEMIC PROGRESS
            </h2>
          </div>

          <span className="bg-pink-500 text-white font-mono text-xs font-black px-3 py-1 border-2 border-white uppercase">
            4 SESSIONS SAVED
          </span>
        </div>

        {/* History Cards Grid with Video Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentHistoryData.map((item) => (
            <div
              key={item.id}
              className="border-3 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[7px_7px_0px_0px_rgba(236,72,153,1)] hover:-translate-y-1.5 transition-all duration-200 transform flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Optional Thumbnail for Video Streams */}
                {item.thumbnail ? (
                  <div className="relative w-full aspect-video bg-black border-2 border-black overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover filter contrast-110 opacity-85"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-yellow-400 fill-current" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black text-yellow-300 font-mono text-[9px] font-black px-1.5 py-0.5 border border-white">
                      THUMBNAIL
                    </span>
                  </div>
                ) : null}

                <div className="flex items-center justify-between font-mono">
                  <span className="bg-black text-yellow-300 font-black text-[10px] px-2 py-0.5 border border-black uppercase">
                    {item.code}
                  </span>
                  <span className={`text-[9px] font-black px-2 py-0.5 border border-black uppercase ${item.badgeBg}`}>
                    {item.type}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">
                    {item.subject}
                  </span>
                  <h4 className="font-black text-sm uppercase text-black leading-snug pt-0.5 line-clamp-2">
                    {item.title}
                  </h4>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1 pt-1 font-mono">
                  <div className="flex justify-between text-[10px] font-black text-black">
                    <span>PROGRESS</span>
                    <span className="text-pink-600">{item.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 h-2 border border-black overflow-hidden">
                    <div
                      className="bg-pink-500 h-full border-r border-black"
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between font-mono">
                <div className="flex items-center space-x-1 text-[10px] font-bold text-zinc-600">
                  <Clock className="w-3 h-3 text-black" />
                  <span>{item.accessedAt}</span>
                </div>

                <Link
                  href={item.route}
                  className="px-3 py-1 bg-black text-yellow-300 font-black text-[11px] uppercase border border-black shadow-[2px_2px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-white transition-all duration-200 transform hover:-translate-y-0.5 flex items-center space-x-1"
                >
                  <span>RESUME</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: STREAMLINED CURRICULUM BUCKETS */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-4 border-black pb-2">
          <h2 className="text-2xl font-black uppercase text-black tracking-tight">
            1ST YEAR ACADEMIC CATALOG BUCKETS
          </h2>
          <span className="font-mono text-xs font-black bg-black text-white px-3 py-1 border border-black uppercase hidden sm:inline-block">
            DIRECT CATALOG VAULTS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Core Subjects */}
          <Link
            href="/core"
            className="group border-3 sm:border-4 border-black bg-cyan-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-cyan-400 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-black text-white px-2.5 py-0.5 font-mono text-[10px] font-black uppercase border border-black">
                  CORE MODULES
                </span>
                <Calculator className="w-7 h-7 text-black stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-black tracking-tight">
                  Core Subjects Vault
                </h3>
                <p className="text-xs font-bold text-black mt-2 leading-relaxed bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono">
                  Mathematics-1, Engineering Physics, Data Structures (C/Python), and Basic Electrical Engineering notes.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t-3 border-black flex items-center justify-between text-xs font-black uppercase text-black font-mono">
              <span>EXPLORE CORE SUBJECTS</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Electives */}
          <Link
            href="/non-core"
            className="group border-3 sm:border-4 border-black bg-purple-300 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-purple-400 active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-black text-white px-2.5 py-0.5 font-mono text-[10px] font-black uppercase border border-black">
                  ELECTIVES
                </span>
                <Layers className="w-7 h-7 text-black stroke-[2.5]" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase text-black tracking-tight">
                  Electives & Ethics Vault
                </h3>
                <p className="text-xs font-bold text-black mt-2 leading-relaxed bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono">
                  Technical Communication, IEEE Professional Ethics, Report Writing, and Presentation Slides.
                </p>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t-3 border-black flex items-center justify-between text-xs font-black uppercase text-black font-mono">
              <span>EXPLORE ELECTIVES</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Video Streams & Temp PDFs with Thumbnail preview */}
          <Link
            href="/lectures"
            className="group border-3 sm:border-4 border-black bg-rose-400 p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-rose-500 text-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-black text-yellow-400 px-2.5 py-0.5 font-mono text-[10px] font-black uppercase border border-black">
                  VIDEO STREAMS
                </span>
                <Video className="w-7 h-7 text-black stroke-[2.5]" />
              </div>
              <div>
                {/* Thumbnail Image Box inside Bento Card */}
                <div className="relative w-full aspect-video bg-black border-2 border-black overflow-hidden mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <img
                    src="https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                    alt="Video Lecture Stream"
                    className="w-full h-full object-cover opacity-80 filter contrast-125"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <PlayCircle className="w-8 h-8 text-yellow-400 fill-current" />
                  </div>
                </div>

                <h3 className="text-xl font-black uppercase text-black tracking-tight">
                  Unlisted Video Lectures
                </h3>
              </div>
            </div>
            <div className="mt-5 pt-3 border-t-3 border-black flex items-center justify-between text-xs font-black uppercase text-black font-mono">
              <span>WATCH VIDEO LECTURES</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: EXAM SCHEDULES & CAMPUS NOTICES */}
      {/* ========================================================================= */}
      <div id="college-highlights" className="space-y-4 scroll-mt-24">

        {/* Header */}
        <div className="border-3 sm:border-4 border-black bg-pink-400 p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-yellow-300 font-mono text-xs font-black uppercase border-2 border-black">
                <School className="w-4 h-4 stroke-[3]" />
                <span>ACADEMIC BULLETIN 2026</span>
              </div>
              <span className="bg-black text-yellow-300 px-2.5 py-0.5 font-mono text-[11px] font-black uppercase border-2 border-black animate-pulse">
                COMING SOON // TESTING MODEL
              </span>
            </div>
            <h2 className="text-2xl font-black uppercase text-black tracking-tight">
              EXAM SCHEDULES & CAMPUS NOTICES
            </h2>
          </div>

          {/* Highlights Tab Switcher */}
          <div className="flex items-center space-x-2 font-mono text-xs">
            <button
              onClick={() => setActiveHighlightTab("exams")}
              className={`px-3 py-1.5 font-black uppercase border-2 border-black transition-all flex items-center space-x-1.5 ${activeHighlightTab === "exams"
                  ? "bg-black text-cyan-300 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  : "bg-white text-black hover:bg-cyan-300"
                }`}
            >
              <Calendar className="w-4 h-4 stroke-[3]" />
              <span>EXAMS</span>
            </button>

            <button
              onClick={() => setActiveHighlightTab("notices")}
              className={`px-3 py-1.5 font-black uppercase border-2 border-black transition-all flex items-center space-x-1.5 ${activeHighlightTab === "notices"
                  ? "bg-black text-rose-300 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  : "bg-white text-black hover:bg-rose-300"
                }`}
            >
              <Megaphone className="w-4 h-4 stroke-[3]" />
              <span>NOTICES</span>
            </button>
          </div>
        </div>

        {/* Tab: Exam Timetable */}
        {activeHighlightTab === "exams" && (
          <div className="border-3 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3 font-mono">
            <div className="flex items-center justify-between border-b-2 border-black pb-2 flex-wrap gap-2">
              <h3 className="text-lg font-black uppercase text-black flex items-center gap-2">
                <Calendar className="w-5 h-5 stroke-[3] text-cyan-500" /> MIDTERM & END-SEMESTER EXAM SCHEDULE
              </h3>
              <span className="text-[10px] font-black bg-yellow-300 text-black px-2 py-0.5 border border-black uppercase">
                COMING SOON // TESTING MODEL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {examSchedules.map((ex, idx) => (
                <div
                  key={idx}
                  className="border-2 border-black bg-cyan-50 p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="bg-black text-cyan-300 font-black text-[10px] px-2 py-0.5 border border-black">
                      {ex.code}
                    </span>
                    <span className="bg-yellow-300 text-black font-black text-[10px] px-2 py-0.5 border border-black">
                      {ex.date}
                    </span>
                  </div>
                  <h4 className="font-black text-sm uppercase text-black leading-tight">
                    {ex.title}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] font-bold text-zinc-800 pt-1">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-pink-600" /> {ex.time}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-blue-600" /> {ex.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Campus Student Noticeboard */}
        {activeHighlightTab === "notices" && (
          <div className="border-3 border-black bg-white p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-3 font-mono">
            <div className="flex items-center justify-between border-b-2 border-black pb-2 flex-wrap gap-2">
              <h3 className="text-lg font-black uppercase text-black flex items-center gap-2">
                <Megaphone className="w-5 h-5 stroke-[3] text-rose-500" /> CAMPUS STUDENT NOTICEBOARD
              </h3>
              <span className="text-[10px] font-black bg-yellow-300 text-black px-2 py-0.5 border border-black uppercase">
                COMING SOON // TESTING MODEL
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {collegeNotices.map((not) => (
                <div
                  key={not.id}
                  className="border-2 border-black bg-rose-50 p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-black px-2 py-0.5 border border-black ${not.badgeColor}`}>
                        {not.badge}
                      </span>
                      <span className="text-[9px] font-black text-zinc-600 bg-white px-1.5 py-0.5 border border-black">
                        {not.date}
                      </span>
                    </div>

                    <h4 className="font-black text-xs uppercase text-black leading-snug">
                      {not.title}
                    </h4>

                    <p className="text-[11px] font-bold text-black leading-relaxed bg-white p-2 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {not.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-black flex items-center justify-between text-[9px] font-black text-black">
                    <span>OFFICIAL NOTICE</span>
                    <Sparkles className="w-3 h-3 text-pink-600" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
