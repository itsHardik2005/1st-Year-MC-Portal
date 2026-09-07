"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSubjectsByCategory,
  getModulesBySubject,
  StudyModule,
  LectureItem,
} from "@/lib/modulesData";
import {
  BookOpen,
  ArrowRight,
  Calculator,
  Atom,
  Code,
  Zap,
  CheckCircle2,
  Filter,
  Play,
  FileText,
  ChevronRight,
  ListVideo,
  Moon,
  Sun,
  Coffee,
  Sparkles,
  Maximize2,
} from "lucide-react";

export default function CorePage() {
  const router = useRouter();
  const subjects = getSubjectsByCategory("core");

  // Step 1 State: Active Selected Subject
  const [selectedSubject, setSelectedSubject] = useState<string>(subjects[0] || "Mathematics-1");

  const currentModules = getModulesBySubject(selectedSubject);

  const getSubjectIcon = (subject: string) => {
    if (subject.includes("Math")) return <Calculator className="w-7 h-7 stroke-[2.5]" />;
    if (subject.includes("Physics")) return <Atom className="w-7 h-7 stroke-[2.5]" />;
    if (subject.includes("Data")) return <Code className="w-7 h-7 stroke-[2.5]" />;
    return <Zap className="w-7 h-7 stroke-[2.5]" />;
  };

  const getSubjectColor = (index: number) => {
    const colors = [
      "bg-cyan-300 hover:bg-cyan-400",
      "bg-yellow-300 hover:bg-yellow-400",
      "bg-emerald-300 hover:bg-emerald-400",
      "bg-purple-300 hover:bg-purple-400",
    ];
    return colors[index % colors.length];
  };

  const handleLaunchModule = (moduleId: string, lectureId?: string, readingMode?: string) => {
    const params = new URLSearchParams();
    if (lectureId) params.set("lectureId", lectureId);
    if (readingMode) params.set("readingMode", readingMode);
    const qs = params.toString();
    router.push(`/module/${moduleId}${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      
      {/* Neo-Brutalist Header Banner */}
      <div className="border-3 sm:border-4 border-black bg-yellow-400 p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-yellow-300 font-mono text-xs font-black uppercase border-2 border-black">
              <BookOpen className="w-4 h-4 stroke-[3]" />
              <span>1ST YEAR CORE ENGINEERING CATALOG</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tighter">
              CORE SUBJECTS & MULTI-LECTURE SELECTOR
            </h1>
            <p className="text-xs md:text-sm font-bold text-black bg-white p-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] max-w-3xl">
              Step 1: Pick a Core Subject &rarr; Step 2: Choose Module & Specific Video Lecture &rarr; Launch dedicated Video & PDF split viewer!
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-black bg-black text-yellow-400 px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
            <Filter className="w-4 h-4 text-pink-500 stroke-[3]" />
            <span>INTERACTIVE 2-STEP FILTER</span>
          </div>
        </div>
      </div>

      {/* ================= STEP 1: SUBJECT SELECTION ================= */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3 border-b-4 border-black pb-3">
          <span className="bg-black text-yellow-400 font-mono text-xs font-black px-3 py-1 border-2 border-black uppercase shrink-0">
            STEP 1 OF 2
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight">
            SELECT CORE SUBJECT
          </h2>
        </div>

        {/* Subject Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {subjects.map((subj, idx) => {
            const isSelected = selectedSubject === subj;
            return (
              <button
                key={subj}
                onClick={() => setSelectedSubject(subj)}
                className={`p-5 sm:p-6 text-left border-3 sm:border-4 border-black transition-all duration-200 transform hover:-translate-y-1.5 flex flex-col justify-between relative ${
                  isSelected
                    ? "bg-black text-white shadow-[6px_6px_0px_0px_rgba(236,72,153,1)] translate-x-1 -translate-y-1"
                    : `${getSubjectColor(idx)} text-black shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none`
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 bg-pink-500 text-white font-mono text-[10px] font-black px-2 py-0.5 border-2 border-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" /> SELECTED
                  </div>
                )}

                <div className="space-y-4">
                  <div className={`p-3 w-fit border-2 border-black ${isSelected ? "bg-yellow-400 text-black" : "bg-white text-black"}`}>
                    {getSubjectIcon(subj)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight leading-tight">
                      {subj}
                    </h3>
                    <p className={`text-[11px] mt-1 font-mono ${isSelected ? "text-zinc-300 font-bold" : "text-black font-bold"}`}>
                      {getModulesBySubject(subj).length} MODULES AVAILABLE
                    </p>
                  </div>
                </div>

                <div className={`mt-6 pt-3 border-t-2 ${isSelected ? "border-zinc-700 text-yellow-300" : "border-black text-black"} font-black text-xs uppercase flex items-center justify-between`}>
                  <span>{isSelected ? "FILTER ACTIVE" : "SELECT SUBJECT"}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= STEP 2: NUMBERED MODULE & LECTURE SELECTION ================= */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-wrap items-center justify-between border-b-4 border-black pb-3 gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="bg-black text-cyan-300 font-mono text-xs font-black px-3 py-1 border-2 border-black uppercase shrink-0">
              STEP 2 OF 2
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase text-black tracking-tight">
              SELECT MODULE & SPECIFIC YOUTUBE LECTURE FOR <span className="bg-yellow-300 text-black px-2 py-0.5 border-2 border-black inline-block mt-1 sm:mt-0">[{selectedSubject}]</span>
            </h2>
          </div>
          <span className="font-mono text-xs font-black text-black bg-white px-3 py-1 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {currentModules.length} MODULES IN THIS SUBJECT
          </span>
        </div>

        {/* Modules & Nested Lectures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentModules.map((mod) => (
            <div
              key={mod.id}
              className="border-3 sm:border-4 border-black bg-white p-5 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1.5 transition-all duration-200 transform flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Module Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="bg-black text-yellow-400 font-mono text-xs font-black px-3 py-1 border-2 border-black uppercase truncate">
                    {mod.moduleLabel}
                  </span>
                  <div className="flex items-center space-x-2 text-[10px] font-mono font-bold bg-cyan-300 text-black px-2 py-0.5 border border-black shrink-0">
                    <span>{mod.lectures.length} LECTURES</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase text-black tracking-tight">
                    {mod.title}
                  </h3>
                  <p className="text-xs font-bold text-black mt-2 leading-relaxed bg-zinc-50 p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono">
                    {mod.description}
                  </p>
                </div>

                {/* Specific YouTube Lecture Choices */}
                <div className="space-y-2 pt-2 border-t-2 border-black font-mono">
                  <span className="text-[10px] font-black uppercase text-black flex items-center gap-1">
                    <ListVideo className="w-3.5 h-3.5 text-pink-600 stroke-[3] shrink-0" /> PICK A SPECIFIC LECTURE:
                  </span>
                  <div className="space-y-1.5">
                    {mod.lectures.map((lec) => (
                      <button
                        key={lec.id}
                        onClick={() => handleLaunchModule(mod.id, lec.id)}
                        className="w-full text-left p-2 bg-yellow-100 hover:bg-black hover:text-yellow-300 border-2 border-black font-black text-xs uppercase transition-all duration-150 transform hover:-translate-y-0.5 flex items-center justify-between group gap-2"
                      >
                        <span className="truncate min-w-0 flex-1">
                          {lec.title}
                        </span>
                        <span className="bg-rose-400 text-black group-hover:bg-yellow-400 group-hover:text-black text-[9px] px-1.5 py-0.5 border border-black shrink-0 flex items-center gap-1">
                          <Play className="w-2.5 h-2.5 fill-current" /> {lec.duration}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Distraction-Free Reading Mode Action Bar */}
              <div className="mt-4 pt-3 border-t-3 border-black space-y-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    onClick={() => handleLaunchModule(mod.id, undefined, "dark")}
                    className="flex-1 px-3 py-2 bg-pink-500 hover:bg-black text-white font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-1.5"
                    title="Launch directly in Fullscreen Dark Focus Reading Mode"
                  >
                    <Maximize2 className="w-3.5 h-3.5 stroke-[3]" />
                    <span>FULLSCREEN READING MODE</span>
                  </button>

                  <button
                    onClick={() => handleLaunchModule(mod.id)}
                    className="px-3 py-2 bg-black text-yellow-300 hover:bg-yellow-400 hover:text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(236,72,153,1)] transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-1"
                    title="Launch Split Video & PDF Module View"
                  >
                    <span>SPLIT VIEW</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-600 px-1">
                  <span>PRESETS:</span>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleLaunchModule(mod.id, undefined, "dark")} className="hover:text-pink-600 underline">DARK THEME</button>
                    <span>•</span>
                    <button onClick={() => handleLaunchModule(mod.id, undefined, "sepia")} className="hover:text-amber-700 underline">WARM SEPIA</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
