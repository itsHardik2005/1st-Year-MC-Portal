"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Coffee,
  Sparkles,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  RotateCcw,
  BookOpen,
  FileText,
  Video,
  Columns,
  Eye,
  Lock,
  Clock,
} from "lucide-react";
import VideoPlayer from "@/components/VideoPlayer";
import { getWatermarkOpacity, getPortalSettings } from "@/lib/settings";

interface ImmersiveReadingModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentTitle: string;
  pdfUrl?: string;
  userEmail?: string | null;
  category?: string;
  description?: string;
  videoId?: string;
  videoTitle?: string;
  videoInstructor?: string;
  videoDuration?: string;
}

export default function ImmersiveReadingModal({
  isOpen,
  onClose,
  documentTitle,
  pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  userEmail = "student@portal.edu",
  category = "CORE MODULE",
  description,
  videoId,
  videoTitle,
  videoInstructor,
  videoDuration,
}: ImmersiveReadingModalProps) {
  const [readingMode, setReadingMode] = useState<"dark" | "sepia" | "midnight" | "light">("dark");
  const [viewLayout, setViewLayout] = useState<"notes" | "split" | "video">(
    videoId ? "split" : "notes"
  );
  const [zoom, setZoom] = useState<number>(100);
  const [opacity, setOpacity] = useState<number>(0.25);
  const [watermarkTimestamp, setWatermarkTimestamp] = useState<string>("");

  // Pomodoro Focus Timer State (25 mins)
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const displayEmail = userEmail || "student@portal.edu";

  // Lock Body Scroll and set ESC key handler
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const settings = getPortalSettings();
    setOpacity(getWatermarkOpacity(settings.watermarkDensity));
    if (settings.defaultReadingMode) {
      setReadingMode(settings.defaultReadingMode);
    }

    setWatermarkTimestamp(new Date().toLocaleTimeString());

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Pomodoro Timer Interval
  useEffect(() => {
    if (!isTimerRunning || !isOpen) return;
    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning, isOpen]);

  if (!isOpen) return null;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 50));

  // Dynamic Theme Configurations
  const getModalContainerStyle = () => {
    switch (readingMode) {
      case "dark":
        return "bg-[#09090b] text-zinc-100";
      case "sepia":
        return "bg-[#fbf0d9] text-[#2b261f]";
      case "midnight":
        return "bg-slate-950 text-slate-100";
      default:
        return "bg-slate-50 text-black";
    }
  };

  const getHeaderStyle = () => {
    switch (readingMode) {
      case "dark":
        return "bg-zinc-900 border-zinc-800 text-yellow-300";
      case "sepia":
        return "bg-[#f4e4c1] border-[#3d3223] text-[#2b261f]";
      case "midnight":
        return "bg-slate-900 border-slate-800 text-cyan-300";
      default:
        return "bg-yellow-400 border-black text-black";
    }
  };

  const getPdfFilter = () => {
    switch (readingMode) {
      case "dark":
        return "invert(92%) hue-rotate(180deg) contrast(110%) brightness(95%)";
      case "sepia":
        return "sepia(35%) contrast(95%) brightness(95%)";
      case "midnight":
        return "invert(90%) hue-rotate(200deg) contrast(115%) brightness(90%)";
      default:
        return "none";
    }
  };

  return (
    <div className={`fixed inset-0 z-[99999] flex flex-col font-sans overflow-hidden animate-in fade-in duration-200 ${getModalContainerStyle()}`}>
      
      {/* IMMERSIVE HEADER TOOLBAR */}
      <header className={`px-4 py-3 border-b-4 flex flex-wrap items-center justify-between gap-3 font-mono shadow-md ${getHeaderStyle()}`}>
        
        {/* Module Title & Category Badge */}
        <div className="flex items-center space-x-3 max-w-full truncate">
          <div className="p-1.5 bg-black text-yellow-400 border border-current shrink-0">
            <BookOpen className="w-5 h-5 stroke-[3]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 bg-black text-yellow-300 border border-current shrink-0">
                ⚡ ZEN FOCUS SANCTUARY
              </span>
              <span className="text-[10px] font-black uppercase px-1.5 py-0.5 bg-pink-500 text-white border border-current shrink-0 hidden sm:inline">
                [{category}]
              </span>
            </div>
            <h2 className="text-sm sm:text-lg font-black uppercase tracking-tight truncate mt-0.5">
              {documentTitle}
            </h2>
          </div>
        </div>

        {/* CONTROLS BAR: Reading Theme, Layout & Pomodoro Study Timer */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
          
          {/* Creative Theme Selector Switches */}
          <div className="flex items-center space-x-1 p-1 bg-black/20 border border-current text-xs">
            <span className="text-[9px] font-black uppercase px-1.5 shrink-0 hidden sm:inline">ATMOSPHERE:</span>
            
            <button
              onClick={() => setReadingMode("dark")}
              className={`px-2.5 py-1 font-black text-xs border flex items-center space-x-1 transition-all duration-150 transform hover:-translate-y-0.5 ${
                readingMode === "dark"
                  ? "bg-black text-yellow-300 border-white shadow-[2px_2px_0px_0px_rgba(236,72,153,1)]"
                  : "hover:bg-black/30 border-transparent"
              }`}
              title="Cyber-Dark Focus Atmosphere (Zero Glare)"
            >
              <Moon className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden md:inline">CYBER-DARK</span>
            </button>

            <button
              onClick={() => setReadingMode("sepia")}
              className={`px-2.5 py-1 font-black text-xs border flex items-center space-x-1 transition-all duration-150 transform hover:-translate-y-0.5 ${
                readingMode === "sepia"
                  ? "bg-[#2b261f] text-[#f4e4c1] border-white shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  : "hover:bg-black/10 border-transparent"
              }`}
              title="Warm Parchment Paper Atmosphere"
            >
              <Coffee className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden md:inline">PARCHMENT</span>
            </button>

            <button
              onClick={() => setReadingMode("midnight")}
              className={`px-2.5 py-1 font-black text-xs border flex items-center space-x-1 transition-all duration-150 transform hover:-translate-y-0.5 ${
                readingMode === "midnight"
                  ? "bg-slate-950 text-cyan-300 border-white shadow-[2px_2px_0px_0px_rgba(56,189,248,1)]"
                  : "hover:bg-black/30 border-transparent"
              }`}
              title="Midnight OLED Night Vision Atmosphere"
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden md:inline">MIDNIGHT VOID</span>
            </button>

            <button
              onClick={() => setReadingMode("light")}
              className={`px-2.5 py-1 font-black text-xs border flex items-center space-x-1 transition-all duration-150 transform hover:-translate-y-0.5 ${
                readingMode === "light"
                  ? "bg-white text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "hover:bg-black/10 border-transparent"
              }`}
              title="Daylight Bright Theme"
            >
              <Sun className="w-3.5 h-3.5 stroke-[3]" />
              <span className="hidden md:inline">DAYLIGHT</span>
            </button>
          </div>

          {/* Viewport Layout Switcher (Notes Only / Split View / Video Only) */}
          {videoId && (
            <div className="flex items-center space-x-1 p-1 bg-black/20 border border-current text-xs">
              <button
                onClick={() => setViewLayout("notes")}
                className={`px-2 py-1 font-black border transition-all duration-150 transform hover:-translate-y-0.5 ${
                  viewLayout === "notes"
                    ? "bg-cyan-300 text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "hover:bg-black/20 border-transparent"
                }`}
                title="Document Vault Notes View"
              >
                <FileText className="w-3.5 h-3.5 stroke-[3] inline mr-1" />
                <span>NOTES VAULT</span>
              </button>
              <button
                onClick={() => setViewLayout("split")}
                className={`px-2 py-1 font-black border transition-all duration-150 transform hover:-translate-y-0.5 ${
                  viewLayout === "split"
                    ? "bg-yellow-400 text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "hover:bg-black/20 border-transparent"
                }`}
                title="Split Sync Dual View (Video + PDF)"
              >
                <Columns className="w-3.5 h-3.5 stroke-[3] inline mr-1" />
                <span>SPLIT SYNC</span>
              </button>
              <button
                onClick={() => setViewLayout("video")}
                className={`px-2 py-1 font-black border transition-all duration-150 transform hover:-translate-y-0.5 ${
                  viewLayout === "video"
                    ? "bg-rose-400 text-black border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    : "hover:bg-black/20 border-transparent"
                }`}
                title="Stream Theatre Video Only"
              >
                <Video className="w-3.5 h-3.5 stroke-[3] inline mr-1" />
                <span>STREAM THEATRE</span>
              </button>
            </div>
          )}

          {/* Pomodoro Focus Timer Widget */}
          <div className="hidden sm:flex items-center space-x-2 bg-black text-yellow-300 px-3 py-1 border-2 border-current text-xs">
            <Clock className="w-4 h-4 text-pink-400 stroke-[3] shrink-0" />
            <span className="font-bold tracking-wider">{formatTimer(timerSeconds)}</span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-0.5 hover:text-white transition-all duration-150 transform hover:-translate-y-0.5"
              title={isTimerRunning ? "Pause Focus Timer" : "Start Focus Timer"}
            >
              {isTimerRunning ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>
            <button
              onClick={() => {
                setIsTimerRunning(false);
                setTimerSeconds(25 * 60);
              }}
              className="p-0.5 hover:text-white transition-all duration-150 transform hover:-translate-y-0.5"
              title="Reset 25min Pomodoro"
            >
              <RotateCcw className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-black text-white px-2 py-1 border border-current text-xs transition-all duration-150 transform hover:-translate-y-0.5">
            <button onClick={handleZoomOut} className="p-1 hover:text-yellow-400">
              <ZoomOut className="w-3.5 h-3.5 stroke-[3]" />
            </button>
            <span className="w-9 text-center font-bold">{zoom}%</span>
            <button onClick={handleZoomIn} className="p-1 hover:text-yellow-400">
              <ZoomIn className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          {/* EXIT FULLSCREEN READER BUTTON */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150 transform hover:-translate-y-0.5 flex items-center space-x-1.5 shrink-0"
            title="Exit Fullscreen Reading Sanctuary (ESC)"
          >
            <X className="w-4 h-4 stroke-[3]" />
            <span>EXIT SANCTUARY</span>
          </button>

        </div>
      </header>

      {/* MAIN IMMERSIVE VIEWPORT CANVAS */}
      <main className="flex-1 w-full h-full relative overflow-hidden flex items-stretch">
        
        {/* Dynamic Watermark Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none transition-opacity duration-300"
          style={{ opacity: readingMode !== "light" ? Math.min(opacity, 0.18) : opacity }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 p-6 w-[150%] -translate-x-[15%] -rotate-12">
            {Array.from({ length: 32 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 border border-dashed border-black/40 bg-yellow-300/30 text-center shadow-sm"
              >
                <div className="text-xs font-black text-black tracking-wider uppercase font-mono bg-pink-500 text-white px-2 py-0.5 border border-black truncate max-w-full">
                  {displayEmail}
                </div>
                <div className="text-[9px] text-black font-mono font-bold mt-0.5 bg-white px-1 border border-black truncate">
                  CONFIDENTIAL • {watermarkTimestamp || "SECURE-SESSION"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Viewport Grid according to viewLayout */}
        <div className={`w-full h-full grid grid-cols-1 ${viewLayout === "split" && videoId ? "lg:grid-cols-2" : "grid-cols-1"} gap-4 p-4 items-stretch overflow-hidden`}>
          
          {/* Left Panel: Video Stream (If Split View or Video Only) */}
          {(viewLayout === "split" || viewLayout === "video") && videoId && (
            <div className="w-full h-full flex flex-col justify-center items-center bg-black/90 p-4 border-2 border-zinc-800 shadow-lg overflow-y-auto">
              <VideoPlayer
                videoId={videoId}
                title={videoTitle || documentTitle}
                description={description}
                duration={videoDuration || "45 mins"}
                instructor={videoInstructor || "Faculty Professor"}
                isUnlisted={true}
                userEmail={displayEmail}
              />
            </div>
          )}

          {/* Right Panel: Clean Spacious PDF Document Canvas */}
          {(viewLayout === "split" || viewLayout === "notes") && (
            <div className="w-full h-full flex flex-col items-center justify-start overflow-auto relative">
              <div
                className="w-full h-full max-w-5xl transition-all duration-200 overflow-auto"
                style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
              >
                <iframe
                  src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  className="w-full h-full min-h-[90vh] border-2 sm:border-4 border-black bg-white shadow-2xl transition-all duration-300"
                  style={{ filter: getPdfFilter() }}
                  title={documentTitle}
                />
              </div>
            </div>
          )}

        </div>

      </main>

      {/* FOOTER IMMERSION STATUS BAR */}
      <footer className="px-4 py-2 border-t-2 border-current bg-black text-white font-mono text-xs flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-yellow-400 stroke-[3]" />
          <span>FULLSCREEN DISTRACTION-FREE STUDY MODE: <strong className="text-yellow-300">{readingMode.toUpperCase()} THEME</strong> ACTIVE</span>
        </div>
        <div className="text-zinc-400 text-[11px]">
          PRESS <kbd className="bg-zinc-800 text-yellow-300 px-1.5 py-0.5 border border-zinc-600 rounded">ESC</kbd> TO RETURN TO NORMAL PORTAL VIEW
        </div>
      </footer>

    </div>
  );
}
