"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Settings,
  Save,
  CheckCircle2,
  ShieldCheck,
  Palette,
  Columns,
  Eye,
  Bell,
  Lock,
  LogOut,
  RotateCcw,
  Sparkles,
  Moon,
  Sun,
  Coffee,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  getPortalSettings,
  savePortalSettings,
  DEFAULT_SETTINGS,
  PortalSettings,
  getWatermarkOpacity,
} from "@/lib/settings";

export default function SettingsPage() {
  const router = useRouter();
  const [themeAccent, setThemeAccent] = useState<PortalSettings["themeAccent"]>("yellow");
  const [viewerPreference, setViewerPreference] = useState<PortalSettings["viewerPreference"]>("split");
  const [watermarkDensity, setWatermarkDensity] = useState<PortalSettings["watermarkDensity"]>("medium");
  const [defaultReadingMode, setDefaultReadingMode] = useState<PortalSettings["defaultReadingMode"]>("dark");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    // Load saved settings
    const current = getPortalSettings();
    setThemeAccent(current.themeAccent);
    setViewerPreference(current.viewerPreference);
    setWatermarkDensity(current.watermarkDensity);
    setDefaultReadingMode(current.defaultReadingMode || "dark");
    setNotificationsEnabled(current.notificationsEnabled);
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const updated = savePortalSettings({
      themeAccent,
      viewerPreference,
      watermarkDensity,
      defaultReadingMode,
      notificationsEnabled,
    });

    // Apply accent to document body attribute for CSS custom properties if needed
    document.body.setAttribute("data-theme-accent", themeAccent);

    setTimeout(() => {
      setSaving(false);
      setStatusMsg({
        type: "success",
        text: `SETTINGS SAVED! ACCENT [${themeAccent.toUpperCase()}], READING MODE [${defaultReadingMode.toUpperCase()}], LAYOUT [${viewerPreference.toUpperCase()}] ACTIVATED.`,
      });
    }, 200);
  };

  const handleResetDefaults = () => {
    const res = savePortalSettings(DEFAULT_SETTINGS);
    setThemeAccent(res.themeAccent);
    setViewerPreference(res.viewerPreference);
    setWatermarkDensity(res.watermarkDensity);
    setDefaultReadingMode(res.defaultReadingMode || "dark");
    setNotificationsEnabled(res.notificationsEnabled);
    setStatusMsg({
      type: "success",
      text: "SETTINGS RESET TO FACTORY NEO-BRUTALIST DEFAULTS!",
    });
  };

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Sign out error", e);
    } finally {
      localStorage.removeItem("portal_user_profile");
      router.push("/login");
    }
  };

  const accentBgColors = {
    yellow: "bg-yellow-400 text-black",
    pink: "bg-pink-500 text-white",
    blue: "bg-blue-500 text-white",
    emerald: "bg-emerald-400 text-black",
    purple: "bg-purple-500 text-white",
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className={`border-3 sm:border-4 border-black p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-colors ${accentBgColors[themeAccent]}`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-white font-mono text-xs font-black uppercase border-2 border-black">
              <Settings className="w-4 h-4 stroke-[3]" />
              <span>PORTAL CONFIGURATION ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tighter">
              PORTAL SETTINGS & PREFERENCES
            </h1>
            <p className="text-xs font-bold text-black max-w-2xl bg-white p-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-mono">
              Customize viewer defaults, watermark stamp opacity density, theme accents, and security session preferences.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-black bg-black text-yellow-400 px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>LIVE LOCAL ENGINE</span>
          </div>
        </div>
      </div>

      {/* Status Feedback Alert */}
      {statusMsg && (
        <div className="p-4 border-4 border-black bg-emerald-400 text-black font-mono text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start space-x-3">
          <CheckCircle2 className="w-5 h-5 text-black shrink-0 stroke-[3]" />
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Settings Form Container */}
      <form onSubmit={handleSaveSettings} className="space-y-8">
        
        {/* Preference Card 1: Theme Accent Color */}
        <div className="border-3 sm:border-4 border-black bg-white p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex flex-wrap items-center justify-between border-b-4 border-black pb-3 gap-2">
            <div className="flex items-center space-x-2">
              <Palette className="w-6 h-6 stroke-[3] text-pink-500 shrink-0" />
              <h3 className="text-lg sm:text-xl font-black uppercase text-black">
                NEO-BRUTALIST THEME ACCENT COLOR
              </h3>
            </div>
            <span className="text-xs font-mono font-black bg-yellow-300 px-2 py-0.5 border border-black uppercase">
              ACTIVE: {themeAccent.toUpperCase()}
            </span>
          </div>

          <p className="text-xs font-bold text-black font-mono">
            Select your preferred primary accent color for top banners, badges, and action buttons:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 pt-2">
            {[
              { id: "yellow", name: "CYBER YELLOW", bg: "bg-yellow-400 text-black" },
              { id: "pink", name: "HOT PINK", bg: "bg-pink-500 text-white" },
              { id: "blue", name: "ELECTRIC BLUE", bg: "bg-blue-500 text-white" },
              { id: "emerald", name: "NEON LIME", bg: "bg-emerald-400 text-black" },
              { id: "purple", name: "BRIGHT PURPLE", bg: "bg-purple-500 text-white" },
            ].map((color) => {
              const isSelected = themeAccent === color.id;
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => setThemeAccent(color.id as any)}
                  className={`p-3 sm:p-4 border-3 border-black font-black text-xs font-mono uppercase transition-all duration-200 transform hover:-translate-y-0.5 ${color.bg} ${
                    isSelected
                      ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ring-4 ring-black translate-x-0.5 -translate-y-0.5"
                      : "opacity-80 hover:opacity-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {color.name} {isSelected ? "✓" : ""}
                </button>
              );
            })}
          </div>
        </div>

        {/* Preference Card 2: Split Viewer Preference */}
        <div className="border-3 sm:border-4 border-black bg-white p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center space-x-2 border-b-4 border-black pb-3">
            <Columns className="w-6 h-6 stroke-[3] text-blue-500 shrink-0" />
            <h3 className="text-lg sm:text-xl font-black uppercase text-black">
              DEFAULT MODULE VIEWER LAYOUT
            </h3>
          </div>

          <p className="text-xs font-bold text-black font-mono">
            Choose your default layout when opening dynamic module pages (`/module/[moduleId]`):
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
            {[
              { id: "split", label: "SPLIT VIEW (50/50)", desc: "Side-by-side Video Lecture & Watermarked PDF Notes" },
              { id: "video", label: "VIDEO FOCUS ONLY", desc: "Maximizes Video Lecture Stream panel width" },
              { id: "notes", label: "NOTES FOCUS ONLY", desc: "Maximizes Watermarked PDF Document Viewer width" },
            ].map((view) => {
              const isSelected = viewerPreference === view.id;
              return (
                <button
                  key={view.id}
                  type="button"
                  onClick={() => setViewerPreference(view.id as any)}
                  className={`p-4 sm:p-5 text-left border-3 border-black transition-all duration-200 transform hover:-translate-y-0.5 ${
                    isSelected
                      ? "bg-black text-yellow-400 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
                      : "bg-yellow-50 text-black hover:bg-yellow-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="font-black text-xs sm:text-sm uppercase">{view.label}</div>
                  <div className={`text-xs mt-1 ${isSelected ? "text-zinc-300" : "text-zinc-700 font-bold"}`}>
                    {view.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preference Card 3: Default Reading Environment Mode */}
        <div className="border-3 sm:border-4 border-black bg-white p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex flex-wrap items-center justify-between border-b-4 border-black pb-3 gap-2 font-mono">
            <div className="flex items-center space-x-2">
              <Moon className="w-6 h-6 stroke-[3] text-yellow-500 shrink-0" />
              <h3 className="text-lg sm:text-xl font-black uppercase text-black">
                DEFAULT LECTURE PDF READING ENVIRONMENT
              </h3>
            </div>
            <span className="text-xs font-black bg-black text-yellow-300 px-2.5 py-1 border border-black uppercase">
              DEFAULT: {defaultReadingMode.toUpperCase()}
            </span>
          </div>

          <p className="text-xs font-bold text-black font-mono">
            Choose your preferred eyecare reading environment for module PDF lecture notes to prevent color irritation and eye strain:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            {[
              { id: "dark", label: "DARK FOCUS MODE", icon: Moon, desc: "Low-strain dark background with inverted high-contrast PDF pages (Zero Glare)", bg: "bg-zinc-950 text-yellow-300 border-zinc-700" },
              { id: "sepia", label: "WARM SEPIA MODE", icon: Coffee, desc: "Soft amber parchment paper background reducing blue light irritation", bg: "bg-[#fbf0d9] text-[#2b261f] border-[#3d3223]" },
              { id: "midnight", label: "MIDNIGHT OLED", icon: Sparkles, desc: "Ultra-deep slate dark environment for late-night study sessions", bg: "bg-slate-950 text-cyan-300 border-slate-700" },
              { id: "light", label: "VIBRANT LIGHT", icon: Sun, desc: "Standard Neo-Brutalist bright theme rendering", bg: "bg-white text-black border-black" },
            ].map((mode) => {
              const isSelected = defaultReadingMode === mode.id;
              const IconComp = mode.icon;
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setDefaultReadingMode(mode.id as any)}
                  className={`p-4 text-left border-3 transition-all duration-200 transform hover:-translate-y-0.5 flex flex-col justify-between ${
                    isSelected
                      ? `${mode.bg} shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] ring-4 ring-black`
                      : "bg-zinc-50 text-black hover:bg-zinc-100 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <IconComp className="w-5 h-5 stroke-[3]" />
                      {isSelected && <span className="text-[10px] font-black uppercase bg-pink-500 text-white px-1.5 py-0.5 border border-black">SELECTED</span>}
                    </div>
                    <div className="font-black text-xs uppercase tracking-tight">{mode.label}</div>
                    <div className="text-[11px] leading-snug opacity-90">{mode.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Preference Card 4: Watermark Density & Security */}
        <div className="border-3 sm:border-4 border-black bg-white p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 font-mono">
          <div className="flex flex-wrap items-center justify-between border-b-4 border-black pb-3 gap-2">
            <div className="flex items-center space-x-2">
              <Eye className="w-6 h-6 stroke-[3] text-purple-600 shrink-0" />
              <h3 className="text-lg sm:text-xl font-black uppercase text-black">
                SECURITY WATERMARK OPACITY DENSITY
              </h3>
            </div>
            <span className="text-xs font-black bg-pink-400 px-2 py-0.5 border border-black text-black">
              OPACITY: {Math.round(getWatermarkOpacity(watermarkDensity) * 100)}%
            </span>
          </div>

          <p className="text-xs font-bold text-black">
            Adjust visual watermark stamp intensity across document viewports:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            {[
              { id: "low", label: "LOW (15%)", desc: "Subtle diagonal overlay" },
              { id: "medium", label: "MEDIUM (35%)", desc: "Standard deterrence (Recommended)" },
              { id: "high", label: "HIGH (55%)", desc: "Maximum anti-screenshot opacity" },
            ].map((den) => {
              const isSelected = watermarkDensity === den.id;
              return (
                <button
                  key={den.id}
                  type="button"
                  onClick={() => setWatermarkDensity(den.id as any)}
                  className={`p-3.5 sm:p-4 border-3 border-black text-center font-black text-xs uppercase transition-all duration-200 transform hover:-translate-y-0.5 ${
                    isSelected
                      ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
                      : "bg-white text-black hover:bg-yellow-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <div>{den.label}</div>
                  <div className={`text-[10px] mt-1 ${isSelected ? "text-yellow-400" : "text-zinc-600 font-bold"}`}>
                    {den.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Bar */}
        <div className="border-3 sm:border-4 border-black bg-yellow-400 p-5 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleResetDefaults}
              className="w-full sm:w-auto px-4 py-3 bg-white text-black font-black text-xs uppercase border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-1.5 font-mono"
            >
              <RotateCcw className="w-4 h-4 stroke-[3]" />
              <span>RESET DEFAULTS</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:space-x-3 font-mono w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full sm:w-auto px-4 py-3 bg-rose-500 text-white font-black text-xs uppercase border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-1.5"
            >
              <LogOut className="w-4 h-4 stroke-[3]" />
              <span>SIGN OUT</span>
            </button>

            <button
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-6 py-3 bg-black text-yellow-400 font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-white transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4 stroke-[3]" />
              <span>{saving ? "SAVING PREFERENCES..." : "SAVE PORTAL PREFERENCES"}</span>
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
