"use client";

import React, { useState, useEffect } from "react";
import VideoPlayer from "@/components/VideoPlayer";
import SecureDocumentViewer from "@/components/SecureDocumentViewer";
import ImmersiveReadingModal from "@/components/ImmersiveReadingModal";
import { StudyModule, LectureItem } from "@/lib/modulesData";
import { Columns, Play, FileText, ListVideo, Sparkles, Maximize2 } from "lucide-react";

import { getPortalSettings } from "@/lib/settings";

interface SplitPaneViewerProps {
  moduleData: StudyModule;
  initialLectureId?: string;
  initialReadingMode?: "light" | "dark" | "sepia" | "midnight";
  userEmail?: string | null;
}

export default function SplitPaneViewer({
  moduleData,
  initialLectureId,
  initialReadingMode,
  userEmail,
}: SplitPaneViewerProps) {
  const [activeTab, setActiveTab] = useState<"split" | "video" | "notes">("split");
  const [readingMode, setReadingMode] = useState<"light" | "dark" | "sepia" | "midnight">(
    initialReadingMode || "dark"
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Load saved default layout preference & reading mode from settings on mount
  useEffect(() => {
    const settings = getPortalSettings();
    if (settings.viewerPreference) {
      setActiveTab(settings.viewerPreference);
    }
    if (!initialReadingMode && settings.defaultReadingMode) {
      setReadingMode(settings.defaultReadingMode);
    }
  }, [initialReadingMode]);

  // Determine initial lecture
  const defaultLecture =
    moduleData.lectures.find((l) => l.id === initialLectureId) || moduleData.lectures[0];

  const [activeLecture, setActiveLecture] = useState<LectureItem>(defaultLecture);
  const displayEmail = userEmail || "authenticated-student@portal.edu";

  // Sync active lecture if moduleData or initialLectureId changes
  useEffect(() => {
    const target =
      moduleData.lectures.find((l) => l.id === initialLectureId) || moduleData.lectures[0];
    if (target) {
      setActiveLecture(target);
    }
  }, [moduleData, initialLectureId]);

  // Dynamic panel playlist bar background according to active reading environment
  const getPlaylistBgStyle = () => {
    switch (readingMode) {
      case "dark":
        return "bg-zinc-900 border-b-4 border-zinc-700 text-yellow-300";
      case "sepia":
        return "bg-[#f4e4c1] border-b-4 border-[#3d3223] text-[#2b261f]";
      case "midnight":
        return "bg-slate-900 border-b-4 border-slate-700 text-cyan-300";
      default:
        return "bg-yellow-300 border-b-4 border-black text-black";
    }
  };

  const getPanelContainerBg = () => {
    switch (readingMode) {
      case "dark":
        return "border-4 border-zinc-700 bg-zinc-950 text-white shadow-[8px_8px_0px_0px_rgba(236,72,153,0.3)]";
      case "sepia":
        return "border-4 border-[#3d3223] bg-[#fbf0d9] text-[#2b261f] shadow-[8px_8px_0px_0px_rgba(61,50,35,0.3)]";
      case "midnight":
        return "border-4 border-slate-700 bg-slate-950 text-slate-100 shadow-[8px_8px_0px_0px_rgba(56,189,248,0.3)]";
      default:
        return "border-4 border-black bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
    }
  };

  return (
    <div className="space-y-4 font-sans">
      {/* VS Code Style Header Control Bar */}
      <div className="border-3 sm:border-4 border-black bg-black text-white p-2.5 sm:p-3 font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-3">
        
        {/* Module & Active Lecture Title */}
        <div className="flex items-center space-x-2 sm:space-x-3 max-w-full">
          <span className="bg-yellow-400 text-black px-2 py-0.5 sm:px-2.5 sm:py-1 font-black text-[10px] sm:text-xs uppercase border border-white shrink-0">
            SPLIT-PANE
          </span>
          <h2 className="font-black text-xs sm:text-sm md:text-base text-yellow-300 uppercase tracking-tight truncate max-w-[200px] sm:max-w-md">
            [{moduleData.subject}] {moduleData.moduleLabel}: {activeLecture?.title || moduleData.title}
          </h2>
        </div>

        {/* Panel Mode Switcher Tabs & Fullscreen Reading Mode Button */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full sm:w-auto justify-between sm:justify-end font-mono">
          <button
            onClick={() => setActiveTab("split")}
            className={`px-2.5 sm:px-3 py-1.5 font-black text-xs uppercase border-2 border-white flex items-center space-x-1 sm:space-x-1.5 transition-all ${
              activeTab === "split"
                ? "bg-yellow-400 text-black shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            <Columns className="w-3.5 h-3.5 stroke-[3] shrink-0" />
            <span className="hidden sm:inline">SPLIT VIEW (50/50)</span>
            <span className="sm:hidden">SPLIT</span>
          </button>

          <button
            onClick={() => setActiveTab("video")}
            className={`px-2.5 sm:px-3 py-1.5 font-black text-xs uppercase border-2 border-white flex items-center space-x-1 sm:space-x-1.5 transition-all ${
              activeTab === "video"
                ? "bg-rose-400 text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            <Play className="w-3.5 h-3.5 stroke-[3] shrink-0" />
            <span className="hidden sm:inline">VIDEO ONLY</span>
            <span className="sm:hidden">VIDEO</span>
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            className={`px-2.5 sm:px-3 py-1.5 font-black text-xs uppercase border-2 border-white flex items-center space-x-1 sm:space-x-1.5 transition-all ${
              activeTab === "notes"
                ? "bg-cyan-300 text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                : "bg-zinc-800 text-white hover:bg-zinc-700"
            }`}
          >
            <FileText className="w-3.5 h-3.5 stroke-[3] shrink-0" />
            <span className="hidden sm:inline">NOTES ONLY</span>
            <span className="sm:hidden">NOTES</span>
          </button>

          {/* FULLSCREEN IMMERSION READING MODE CREATIVE BUTTON */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-3 py-1.5 bg-pink-500 hover:bg-yellow-400 hover:text-black text-white font-black text-xs uppercase border-2 border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center space-x-1.5 shrink-0"
            title="Launch Distraction-Free Fullscreen Reading Sanctuary (Zero Glare)"
          >
            <Maximize2 className="w-3.5 h-3.5 stroke-[3]" />
            <span>⚡ ZEN FOCUS SANCTUARY</span>
          </button>
        </div>

      </div>

      {/* VS Code Split Pane Container */}
      <div
        className={`grid grid-cols-1 ${
          activeTab === "split" ? "md:grid-cols-2" : "grid-cols-1"
        } gap-4 relative min-h-[450px] sm:min-h-[700px] items-stretch`}
      >
        {/* Left Panel: Unlisted YouTube Video Lecture + Lecture Playlist Switcher */}
        {(activeTab === "split" || activeTab === "video") && (
          <div className={`relative transition-colors duration-200 ${getPanelContainerBg()} flex flex-col justify-between overflow-hidden`}>
            {/* Panel Header */}
            <div className="bg-black text-white px-4 py-2 font-mono text-xs font-black uppercase flex items-center justify-between border-b-4 border-black">
              <span className="flex items-center gap-2 text-rose-400">
                <Play className="w-4 h-4 fill-current" /> LEFT PANEL // VIDEO LECTURE STREAMS
              </span>
              <span className="bg-rose-500 text-white px-2 py-0.5 border border-white text-[10px]">
                {moduleData.lectures.length} LECTURES AVAILABLE
              </span>
            </div>

            {/* Interactive Lecture Playlist Bar */}
            <div className={`px-3 py-2 font-mono transition-colors duration-200 ${getPlaylistBgStyle()}`}>
              <div className="text-[10px] font-bold uppercase mb-1.5 flex items-center gap-1 opacity-80">
                <ListVideo className="w-3.5 h-3.5 stroke-[3] text-pink-400" /> SELECT LECTURE STREAM IN THIS MODULE:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {moduleData.lectures.map((lec) => {
                  const isSelected = activeLecture?.id === lec.id;
                  return (
                    <button
                      key={lec.id}
                      onClick={() => setActiveLecture(lec)}
                      className={`px-2.5 py-1 text-xs font-mono font-bold uppercase transition-all flex items-center space-x-1.5 border ${
                        isSelected
                          ? "bg-black text-yellow-300 border-white shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]"
                          : "bg-white/10 text-current hover:bg-white/20 border-current/30"
                      }`}
                    >
                      <Play className={`w-3 h-3 ${isSelected ? "fill-current text-yellow-300" : ""}`} />
                      <span>L{lec.lectureNumber}: {lec.title.split(":")[1] || lec.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 w-full h-full overflow-y-auto">
              {activeLecture ? (
                <VideoPlayer
                  key={activeLecture.id}
                  videoId={activeLecture.videoId}
                  title={activeLecture.title}
                  description={activeLecture.description || moduleData.description}
                  duration={activeLecture.duration}
                  instructor={activeLecture.instructor}
                  isUnlisted={true}
                  userEmail={displayEmail}
                />
              ) : (
                <div className="p-8 text-center font-mono font-bold text-zinc-400">
                  NO LECTURE SELECTED
                </div>
              )}
            </div>
          </div>
        )}

        {/* Center Divider Bar (Visible when split view is active on desktop) */}
        {activeTab === "split" && (
          <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-30 pointer-events-none items-center justify-center">
            <div className="w-3 bg-black border-x-2 border-white h-full flex flex-col items-center justify-center gap-2 shadow-[2px_0_0_0_#000]">
              <div className="w-1.5 h-8 bg-yellow-400 border border-black rounded-full" />
            </div>
          </div>
        )}

        {/* Right Panel: PDF Document Viewer with Trace-Watermark */}
        {(activeTab === "split" || activeTab === "notes") && (
          <div className={`relative transition-colors duration-200 ${getPanelContainerBg()} flex flex-col justify-between overflow-hidden`}>
            {/* Panel Tab Title Bar */}
            <div className="bg-black text-white px-4 py-2 font-mono text-xs font-black uppercase flex items-center justify-between border-b-4 border-black">
              <span className="flex items-center gap-2 text-cyan-300">
                <FileText className="w-4 h-4 stroke-[3]" /> RIGHT PANEL // WATERMARKED PDF NOTES
              </span>
              <span className="bg-cyan-300 text-black px-2 py-0.5 border border-white text-[10px] font-mono">
                EMAIL WATERMARK OVERLAY
              </span>
            </div>

            <div className="flex-1 w-full h-full overflow-y-auto">
              <SecureDocumentViewer
                userEmail={displayEmail}
                documentTitle={`${moduleData.moduleLabel}: ${moduleData.title}`}
                pdfUrl={moduleData.pdfUrl}
                description={moduleData.description}
                category={moduleData.subject}
                initialReadingMode={readingMode}
                onReadingModeChange={setReadingMode}
              />
            </div>
          </div>
        )}
      </div>

      {/* FULLSCREEN DISTRACTION-FREE READING THEATRE MODAL */}
      <ImmersiveReadingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        documentTitle={`${moduleData.moduleLabel}: ${activeLecture?.title || moduleData.title}`}
        pdfUrl={moduleData.pdfUrl}
        userEmail={displayEmail}
        category={moduleData.subject}
        description={moduleData.description}
        videoId={activeLecture?.videoId}
        videoTitle={activeLecture?.title}
        videoInstructor={activeLecture?.instructor}
        videoDuration={activeLecture?.duration}
      />

    </div>
  );
}
