import React from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Mail, Lock, User, Settings } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t-4 border-black bg-black text-white py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b-2 border-zinc-800 pb-8">
          
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-yellow-400 text-black font-black text-xl px-2.5 py-1 border-2 border-white">
                1ST YEAR MC PORTAL
              </span>
              <span className="text-pink-500 font-extrabold text-sm tracking-tight">
                // ACADEMIC PORTAL
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-md leading-relaxed">
              Official academic study portal for first-year B.Tech engineering students. Access MAKAUT syllabus notes, video lecture streams, and semester exam timetables.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="font-extrabold text-sm uppercase text-yellow-400 tracking-wider">
              [ NAVIGATION ]
            </h4>
            <ul className="text-xs space-y-1.5 text-zinc-300">
              <li>
                <Link href="/core" className="hover:text-yellow-400 hover:underline">
                  &gt; CORE SUBJECTS
                </Link>
              </li>
              <li>
                <Link href="/non-core" className="hover:text-purple-400 hover:underline">
                  &gt; NON-CORE ELECTIVES
                </Link>
              </li>
              <li>
                <Link href="/temp-pdfs" className="hover:text-orange-400 hover:underline">
                  &gt; TEMP PDF VAULT
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-cyan-300 hover:underline">
                  &gt; STUDENT PROFILE
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-emerald-400 hover:underline">
                  &gt; PORTAL SETTINGS
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-rose-400 hover:underline">
                  &gt; ADMIN HUB (RLS)
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-2">
            <h4 className="font-extrabold text-sm uppercase text-pink-500 tracking-wider">
              [ SUPPORT & HELP ]
            </h4>
            <p className="text-xs text-zinc-400">
              Need assistance or missing course notes? Contact customer support directly:
            </p>
            <a
              href="mailto:support@studyportal.edu?subject=1st%20Year%20Study%20Portal%20Help"
              className="inline-block mt-2 px-3 py-2 bg-pink-500 text-white font-extrabold text-xs uppercase border-2 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:bg-yellow-400 hover:text-black transition-colors break-all max-w-full"
            >
              MAILTO: SUPPORT@STUDYPORTAL.EDU
            </a>
          </div>

        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; 2026 1st Year MC Portal. Supabase RLS Protected.
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1 text-yellow-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" /> STAMP-WATERMARKED
            </span>
            <span className="flex items-center gap-1 text-pink-400">
              <Lock className="w-3.5 h-3.5 shrink-0" /> SIGNED URLS
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
