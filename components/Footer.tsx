"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Zap, ShieldCheck, Mail, Lock, User, Settings, HelpCircle, ExternalLink } from "lucide-react";
import ContactHelpModal from "@/components/ContactHelpModal";
import { CONTACT_CONFIG } from "@/lib/contactConfig";

// Telegram Paper Airplane SVG icon for footer
function TelegramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .37z" />
    </svg>
  );
}

export default function Footer() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <footer className="w-full border-t-4 border-black bg-black text-white py-12 px-4 sm:px-6 lg:px-8 font-mono">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b-2 border-zinc-800 pb-8">
          
          <div className="md:col-span-5 space-y-4">
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

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-extrabold text-sm uppercase text-pink-500 tracking-wider">
              [ SUPPORT & HELP ]
            </h4>
            <p className="text-xs text-zinc-400">
              Need assistance or missing course notes? Reach our team directly:
            </p>

            {/* Telegram Chatbot Link */}
            <a
              href={CONTACT_CONFIG.telegramBotUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-2 px-3 py-2 bg-[#0088cc] text-white font-extrabold text-xs uppercase border-2 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:bg-yellow-400 hover:text-black transition-colors"
            >
              <div className="flex items-center gap-2">
                <TelegramIcon className="w-4 h-4 shrink-0" />
                <span>TELEGRAM BOT: {CONTACT_CONFIG.telegramBotHandle}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>

            {/* Written Email Link */}
            <a
              href={`mailto:${CONTACT_CONFIG.supportEmail}?subject=${encodeURIComponent(
                CONTACT_CONFIG.emailSubject
              )}`}
              className="flex items-center justify-between gap-2 px-3 py-2 bg-pink-500 text-white font-extrabold text-xs uppercase border-2 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:bg-yellow-400 hover:text-black transition-colors break-all"
            >
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" />
                <span>EMAIL: {CONTACT_CONFIG.supportEmail.toUpperCase()}</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>

            {/* Contact Center Modal Button */}
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-yellow-400 text-black font-black text-xs uppercase border-2 border-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:bg-white transition-colors"
            >
              <HelpCircle className="w-4 h-4 shrink-0 stroke-[2.5]" />
              <span>OPEN HELP & CONTACT CENTER</span>
            </button>
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

      {/* Interactive Contact & Help Modal */}
      <ContactHelpModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </footer>
  );
}
