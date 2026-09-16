"use client";

import React, { useState, useEffect } from "react";
import { X, Mail, ExternalLink, Copy, Check, MessageSquare, Sparkles } from "lucide-react";
import { CONTACT_CONFIG } from "@/lib/contactConfig";

interface ContactHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Telegram Paper Airplane SVG icon
function TelegramIcon({ className = "w-6 h-6" }: { className?: string }) {
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

export default function ContactHelpModal({ isOpen, onClose }: ContactHelpModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedTelegram, setCopiedTelegram] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_CONFIG.supportEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleCopyTelegram = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_CONFIG.telegramBotUrl);
      setCopiedTelegram(true);
      setTimeout(() => setCopiedTelegram(false), 2000);
    } catch (err) {
      console.error("Failed to copy Telegram link:", err);
    }
  };

  const mailtoHref = `mailto:${CONTACT_CONFIG.supportEmail}?subject=${encodeURIComponent(
    CONTACT_CONFIG.emailSubject
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-yellow-400 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black p-4 sm:p-6 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between border-b-3 border-black pb-3.5 mb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-black text-white px-2 py-0.5 text-[10px] sm:text-xs font-mono font-black tracking-widest uppercase mb-1 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <Sparkles className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span>SUPPORT & HELP CENTER</span>
            </div>
            <h2
              id="contact-modal-title"
              className="text-xl sm:text-2xl font-black uppercase tracking-tight text-black"
            >
              HOW CAN WE HELP YOU?
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-zinc-800 mt-0.5">
              Choose your preferred contact channel below:
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-rose-500 hover:text-white transition-all transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-label="Close Contact Modal"
          >
            <X className="w-5 h-5 stroke-[3]" />
          </button>
        </div>

        {/* Content Area - Scrollable if screen height is constrained */}
        <div className="space-y-4 overflow-y-auto pr-1">

          {/* Option 1: TELEGRAM CHATBOT CARD */}
          <div className="bg-cyan-200 border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between relative group hover:bg-cyan-100 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-[#0088cc] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0">
                  <TelegramIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-block bg-black text-cyan-300 text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 border border-black mb-0.5">
                    INSTANT CHATBOT • 24/7
                  </div>
                  <h3 className="font-black text-base sm:text-lg uppercase tracking-tight text-black leading-tight">
                    TELEGRAM CHATBOT
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-xs font-semibold text-zinc-800 mb-3 leading-relaxed">
              Instant doubt solving, syllabus finder, lecture note queries, and automated portal assistance directly on Telegram.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-black/30">
              <a
                href={CONTACT_CONFIG.telegramBotUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-[#0088cc] hover:bg-[#0077b5] text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <TelegramIcon className="w-4 h-4 shrink-0" />
                <span>OPEN TELEGRAM BOT</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>

              <button
                type="button"
                onClick={handleCopyTelegram}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-100 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
                title="Copy Telegram Link"
              >
                {copiedTelegram ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
                    <span className="text-emerald-700">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>COPY LINK</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Option 2: WRITTEN EMAIL CARD */}
          <div className="bg-pink-300 border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between relative group hover:bg-pink-200 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-pink-600 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="inline-block bg-black text-pink-300 text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 border border-black mb-0.5">
                    WRITTEN SUPPORT • OFFICIAL
                  </div>
                  <h3 className="font-black text-base sm:text-lg uppercase tracking-tight text-black leading-tight">
                    WRITTEN EMAIL
                  </h3>
                </div>
              </div>
            </div>

            <p className="text-xs font-semibold text-zinc-800 mb-3 leading-relaxed">
              Send formal inquiries for portal account access, missing PDF notes, syllabus corrections, or technical bug reports.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2 border-t-2 border-black/30">
              <a
                href={mailtoHref}
                className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 px-3.5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <Mail className="w-4 h-4 stroke-[2.5]" />
                <span>SEND EMAIL</span>
                <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-white text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-100 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none shrink-0"
                title="Copy Support Email"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3] text-emerald-600" />
                    <span className="text-emerald-700">COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Quick Notice Banner */}
          <div className="bg-white border-2 border-black p-3 text-xs font-mono font-bold flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <MessageSquare className="w-4 h-4 text-black shrink-0" />
            <span className="text-zinc-700">
              <strong className="text-black">TIP:</strong> Telegram chatbot replies instantly 24/7. Email replies typically take within 24-48 hours.
            </span>
          </div>

        </div>

        {/* Footer / Close Button */}
        <div className="mt-4 pt-3 border-t-2 border-black flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-zinc-800 uppercase">
            1ST YEAR MC PORTAL HELP DESK
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-black text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-800 transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}
