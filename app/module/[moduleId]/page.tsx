"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getModuleById, MODULES_CATALOG } from "@/lib/modulesData";
import SplitPaneViewer from "@/components/SplitPaneViewer";
import { ShieldCheck, ArrowLeft, RefreshCw, Play, ListVideo } from "lucide-react";
import Link from "next/link";

function ModuleContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const moduleId = params?.moduleId as string;
  const initialLectureId = searchParams?.get("lectureId") || undefined;
  const rawReadingMode = searchParams?.get("readingMode");
  const initialReadingMode =
    rawReadingMode === "light" || rawReadingMode === "dark" || rawReadingMode === "sepia" || rawReadingMode === "midnight"
      ? rawReadingMode
      : undefined;

  const [userEmail, setUserEmail] = useState<string | null>(null);

  const moduleData = getModuleById(moduleId) || MODULES_CATALOG[0];

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || "student@portal.edu");
    };
    fetchUser();
  }, []);

  return (
    <div className="space-y-6">
      
      {/* Clean Focused Top Bar */}
      <div className="border-3 sm:border-4 border-black bg-yellow-400 p-4 sm:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          
          {/* Breadcrumb & Module Badges */}
          <div className="space-y-1 max-w-full">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono">
              <button
                onClick={() => router.back()}
                className="px-2.5 py-1 bg-black text-white font-black text-xs uppercase border-2 border-black flex items-center space-x-1 hover:bg-pink-500 hover:text-black transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 stroke-[3]" />
                <span>BACK</span>
              </button>
              <span className="bg-white text-black text-xs font-black px-2 py-1 border-2 border-black uppercase truncate max-w-[150px] sm:max-w-none">
                [{moduleData.subject}]
              </span>
              <span className="bg-black text-yellow-300 text-xs font-black px-2 py-1 border-2 border-black uppercase">
                {moduleData.moduleLabel}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black uppercase text-black tracking-tight mt-1">
              {moduleData.title}
            </h1>
          </div>

          {/* Quick Switch Module & Watermark Stamp Indicator */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono w-full sm:w-auto justify-between sm:justify-end">
            <div className="hidden sm:flex items-center space-x-1.5 text-xs font-black bg-black text-yellow-300 px-3 py-1.5 border-2 border-black">
              <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[3]" />
              <span>WATERMARK PROTECTED</span>
            </div>

            <div className="flex items-center space-x-1.5 w-full sm:w-auto">
              <span className="text-xs font-black uppercase text-black bg-yellow-300 px-2 py-0.5 border border-black shrink-0">
                SWITCH:
              </span>
              <select
                value={moduleData.id}
                onChange={(e) => router.push(`/module/${e.target.value}${initialReadingMode ? `?readingMode=${initialReadingMode}` : ''}`)}
                className="p-1.5 border-2 border-black bg-white text-black font-black text-xs uppercase focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-1 sm:max-w-xs truncate"
              >
                {MODULES_CATALOG.map((m) => (
                  <option key={m.id} value={m.id}>
                    [{m.subject}] {m.moduleLabel}: {m.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* VS Code Style Split Pane Viewer (Video Lectures + Watermarked PDF Notes Only) */}
      <SplitPaneViewer
        moduleData={moduleData}
        initialLectureId={initialLectureId}
        initialReadingMode={initialReadingMode}
        userEmail={userEmail}
      />

    </div>
  );
}

export default function ModuleDynamicPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <Suspense
        fallback={
          <div className="border-4 border-black bg-white p-12 text-center text-black font-mono font-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2 text-black stroke-[3]" />
            LOADING MODULE MEDIA VIEWER...
          </div>
        }
      >
        <ModuleContent />
      </Suspense>
    </div>
  );
}
