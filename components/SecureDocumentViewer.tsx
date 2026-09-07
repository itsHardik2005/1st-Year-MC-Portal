"use client";

import React, { useState, useEffect } from "react";
import { ShieldAlert, ZoomIn, ZoomOut, Lock, Eye, CheckCircle2, Sun, Moon, Coffee, Sparkles } from "lucide-react";
import { getPortalSettings, getWatermarkOpacity } from "@/lib/settings";

interface SecureDocumentViewerProps {
  userEmail?: string | null;
  documentTitle: string;
  pdfUrl?: string;
  description?: string;
  category?: string;
  initialReadingMode?: "light" | "dark" | "sepia" | "midnight";
  onReadingModeChange?: (mode: "light" | "dark" | "sepia" | "midnight") => void;
}

export default function SecureDocumentViewer({
  userEmail = "student@portal.edu",
  documentTitle,
  pdfUrl = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  description,
  category,
  initialReadingMode,
  onReadingModeChange,
}: SecureDocumentViewerProps) {
  const [zoom, setZoom] = useState<number>(100);
  const [watermarkTimestamp, setWatermarkTimestamp] = useState<string>("");
  const [opacity, setOpacity] = useState<number>(0.35);
  const [readingMode, setReadingMode] = useState<"light" | "dark" | "sepia" | "midnight">(
    initialReadingMode || "dark"
  );
  const displayEmail = userEmail || "student@portal.edu";

  useEffect(() => {
    const settings = getPortalSettings();
    setOpacity(getWatermarkOpacity(settings.watermarkDensity));
    if (!initialReadingMode && settings.defaultReadingMode) {
      setReadingMode(settings.defaultReadingMode);
    }

    setWatermarkTimestamp(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setWatermarkTimestamp(new Date().toLocaleTimeString());
    }, 30000);

    const handleSettingsUpdate = () => {
      const updated = getPortalSettings();
      setOpacity(getWatermarkOpacity(updated.watermarkDensity));
      if (!initialReadingMode && updated.defaultReadingMode) {
        setReadingMode(updated.defaultReadingMode);
      }
    };
    window.addEventListener("portal_settings_updated", handleSettingsUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("portal_settings_updated", handleSettingsUpdate);
    };
  }, [initialReadingMode]);

  const changeReadingMode = (mode: "light" | "dark" | "sepia" | "midnight") => {
    setReadingMode(mode);
    onReadingModeChange?.(mode);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 25, 50));

  // Dynamic Theme Style Classes
  const getContainerStyle = () => {
    switch (readingMode) {
      case "dark":
        return "bg-zinc-950 text-zinc-100 border-2 border-zinc-800";
      case "sepia":
        return "bg-[#fbf0d9] text-[#2b261f] border-2 border-[#3d3223]";
      case "midnight":
        return "bg-slate-950 text-slate-100 border-2 border-slate-800";
      default:
        return "bg-white text-black border-2 border-black";
    }
  };

  const getToolbarStyle = () => {
    switch (readingMode) {
      case "dark":
        return "border-b border-zinc-800 bg-zinc-900/90 text-yellow-300";
      case "sepia":
        return "border-b border-[#3d3223]/30 bg-[#f4e4c1] text-[#2b261f]";
      case "midnight":
        return "border-b border-slate-800 bg-slate-900/90 text-cyan-300";
      default:
        return "border-b-2 border-black bg-yellow-400 text-black";
    }
  };

  const getViewportBg = () => {
    switch (readingMode) {
      case "dark":
        return "bg-zinc-950";
      case "sepia":
        return "bg-[#f5e8cd]";
      case "midnight":
        return "bg-slate-950";
      default:
        return "bg-slate-100";
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
    <div className={`w-full h-full flex flex-col font-mono select-none overflow-hidden transition-colors duration-200 ${getContainerStyle()}`}>
      
      {/* ULTRA-MINIMAL TOOLBAR */}
      <div className={`flex flex-wrap items-center justify-between gap-2 px-3 py-2 text-xs font-mono transition-colors duration-200 ${getToolbarStyle()}`}>
        
        {/* Document Title */}
        <div className="flex items-center space-x-2 min-w-0 max-w-[60%] sm:max-w-md">
          <Lock className="w-3.5 h-3.5 stroke-[3] shrink-0 text-pink-500" />
          <h4 className="font-black text-xs uppercase tracking-tight truncate">
            {documentTitle}
          </h4>
        </div>

        {/* Minimal Theme Switches & Zoom */}
        <div className="flex items-center space-x-2 shrink-0">
          
          {/* Minimal Icon Theme Switcher */}
          <div className="flex items-center space-x-0.5 bg-black/20 p-0.5 border border-current text-[10px]">
            <button
              onClick={() => changeReadingMode("dark")}
              className={`p-1 font-black transition-all duration-150 transform hover:-translate-y-0.5 ${
                readingMode === "dark" ? "bg-black text-yellow-300 border border-white" : "opacity-70 hover:opacity-100"
              }`}
              title="Dark Focus Mode (Zero Glare)"
            >
              <Moon className="w-3 h-3 stroke-[3]" />
            </button>

            <button
              onClick={() => changeReadingMode("sepia")}
              className={`p-1 font-black transition-all duration-150 transform hover:-translate-y-0.5 ${
                readingMode === "sepia" ? "bg-[#2b261f] text-[#f4e4c1] border border-white" : "opacity-70 hover:opacity-100"
              }`}
              title="Warm Sepia Parchment Mode"
            >
              <Coffee className="w-3 h-3 stroke-[3]" />
            </button>

            <button
              onClick={() => changeReadingMode("midnight")}
              className={`p-1 font-black transition-all duration-150 transform hover:-translate-y-0.5 ${
                readingMode === "midnight" ? "bg-slate-950 text-cyan-300 border border-white" : "opacity-70 hover:opacity-100"
              }`}
              title="Midnight OLED Night Vision Mode"
            >
              <Sparkles className="w-3 h-3 stroke-[3]" />
            </button>

            <button
              onClick={() => changeReadingMode("light")}
              className={`p-1 font-black transition-all duration-150 transform hover:-translate-y-0.5 ${
                readingMode === "light" ? "bg-white text-black border border-black" : "opacity-70 hover:opacity-100"
              }`}
              title="Standard Light Mode"
            >
              <Sun className="w-3 h-3 stroke-[3]" />
            </button>
          </div>

          {/* Minimal Zoom Controls */}
          <div className="flex items-center space-x-1 bg-white text-black border border-black px-1.5 py-0.5 text-[11px] shadow-sm transition-all duration-150 transform hover:-translate-y-0.5">
            <button onClick={handleZoomOut} className="hover:text-pink-600 font-black p-0.5 hover:-translate-y-0.5 transition-transform">-</button>
            <span className="font-bold w-8 text-center">{zoom}%</span>
            <button onClick={handleZoomIn} className="hover:text-pink-600 font-black p-0.5 hover:-translate-y-0.5 transition-transform">+</button>
          </div>

        </div>
      </div>

      {/* MAIN PDF CANVAS */}
      <div className={`relative flex-1 w-full min-h-[480px] sm:min-h-[620px] flex flex-col items-center justify-start overflow-hidden p-2 select-none transition-colors duration-200 ${getViewportBg()}`}>
        
        {/* Dynamic Security Watermark Overlay Layer */}
        <div
          className="pointer-events-none absolute inset-0 z-20 overflow-hidden select-none transition-opacity duration-300"
          style={{ opacity: readingMode !== "light" ? Math.min(opacity, 0.18) : opacity }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 p-4 w-[150%] -translate-x-[15%] -rotate-12">
            {Array.from({ length: 24 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-3 border border-dashed border-black/40 bg-yellow-300/30 text-center shadow-sm"
              >
                <div className="text-[11px] font-black text-black tracking-wider uppercase font-mono bg-pink-500 text-white px-1.5 py-0.5 border border-black truncate max-w-full">
                  {displayEmail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scaled PDF Viewer Frame */}
        <div
          className="w-full h-full max-w-4xl transition-all duration-200 overflow-auto"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
            className="w-full h-full min-h-[480px] sm:min-h-[620px] border border-black/50 bg-white shadow-md transition-all duration-300"
            style={{ filter: getPdfFilter() }}
            title={documentTitle}
          />
        </div>
      </div>

    </div>
  );
}

