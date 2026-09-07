"use client";

import React, { useState, useEffect } from "react";
import { getTemporarySignedUrl } from "@/lib/supabase/signed-url";
import SecureDocumentViewer from "@/components/SecureDocumentViewer";
import { Clock, RefreshCw, AlertTriangle, KeyRound, Lock, Zap } from "lucide-react";

interface TempPdfViewerProps {
  userEmail?: string | null;
  materialTitle: string;
  storagePath: string;
  bucketName?: string;
  durationSeconds?: number;
}

export default function TempPdfViewer({
  userEmail = "student@portal.edu",
  materialTitle,
  storagePath,
  bucketName = "temp-vault",
  durationSeconds = 60,
}: TempPdfViewerProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(durationSeconds);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSignedUrl = async () => {
    setIsLoading(true);
    setError(null);
    setIsExpired(false);
    setTimeLeft(durationSeconds);

    const res = await getTemporarySignedUrl(bucketName, storagePath, durationSeconds);

    if (res.error) {
      setError(res.error);
      setIsLoading(false);
    } else if (res.signedUrl) {
      setSignedUrl(res.signedUrl);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSignedUrl();
  }, [storagePath]);

  // Countdown timer interval
  useEffect(() => {
    if (isLoading || isExpired || !signedUrl) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsExpired(true);
          setSignedUrl(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, isExpired, signedUrl]);

  return (
    <div className="space-y-6">
      
      {/* High-Anxiety Temporary Access Control Banner */}
      <div className="border-3 sm:border-4 border-black bg-orange-400 p-4 sm:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3 sm:space-x-4 max-w-full">
            <div className="p-2 sm:p-3 bg-black text-yellow-400 border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] sm:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] shrink-0">
              <KeyRound className="w-6 h-6 sm:w-8 sm:h-8 stroke-[3]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-2">
                <span className="bg-black text-white font-mono text-[10px] sm:text-xs font-black px-2 py-0.5 border border-black uppercase truncate">
                  TIME-LIMITED SIGNED TOKEN VAULT
                </span>
              </div>
              <h3 className="text-lg sm:text-2xl font-black uppercase text-black mt-1 truncate">{materialTitle}</h3>
              <p className="text-[11px] sm:text-xs font-bold text-black mt-0.5 bg-white px-2 py-0.5 border border-black inline-block">
                Supabase API: <code className="font-mono bg-yellow-300 px-1 border border-black">createSignedUrl()</code>
              </p>
            </div>
          </div>

          {/* MASSIVE TICKING MONOSPACE COUNTDOWN TIMER */}
          <div className="flex flex-wrap items-center gap-3 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
            {!isExpired && signedUrl && (
              <div className="bg-black text-white border-2 sm:border-3 border-black p-2.5 sm:p-3 text-center shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] font-mono flex-1 sm:flex-none">
                <div className="text-[9px] sm:text-[10px] text-yellow-400 font-black uppercase tracking-wider">
                  SECURITY LIFESPAN
                </div>
                <div className={`text-xl sm:text-2xl font-black tracking-tight ${timeLeft <= 10 ? "text-pink-500 animate-bounce" : "text-yellow-300"}`}>
                  EXPIRES IN: {timeLeft}s
                </div>
              </div>
            )}

            <button
              onClick={fetchSignedUrl}
              disabled={isLoading}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-black text-white font-black text-xs uppercase tracking-wider border-3 border-black shadow-[3px_3px_0px_0px_rgba(236,72,153,1)] sm:shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>{isExpired ? "RE-ISSUE TOKEN" : "REFRESH TOKEN"}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Content State Handling */}
      {isLoading && (
        <div className="border-4 border-black bg-white p-12 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <RefreshCw className="w-10 h-10 animate-spin mx-auto text-black mb-3 stroke-[3]" />
          <p className="text-sm font-black uppercase text-black font-mono">
            REQUESTING TEMPORARY SIGNED ACCESS URL FROM SUPABASE STORAGE...
          </p>
        </div>
      )}

      {isExpired && (
        <div className="border-4 border-black bg-rose-500 p-8 text-center text-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 font-mono">
          <div className="p-4 bg-black text-rose-400 border-2 border-white w-20 h-20 mx-auto flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 stroke-[3]" />
          </div>
          <div>
            <h4 className="text-2xl font-black uppercase text-yellow-300">ACCESS TOKEN EXPIRED (00:00)</h4>
            <p className="text-xs font-bold text-white max-w-md mx-auto mt-2 bg-black p-3 border-2 border-white">
              The temporary signed URL lifespan ({durationSeconds} seconds) has elapsed. Supabase access has automatically locked.
            </p>
          </div>
          <button
            onClick={fetchSignedUrl}
            className="px-6 py-3 bg-yellow-400 text-black font-black text-xs uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-200 transform hover:-translate-y-0.5 inline-flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4 stroke-[3]" />
            <span>GENERATE NEW TEMPORARY TOKEN</span>
          </button>
        </div>
      )}

      {!isLoading && !isExpired && signedUrl && (
        <SecureDocumentViewer
          userEmail={userEmail}
          documentTitle={materialTitle}
          pdfUrl={signedUrl}
          category="TIME-LIMITED TEMP PDF"
          description="Confidential exam solution sheet. Secured with Supabase Storage signed URLs & live user email watermark."
        />
      )}
    </div>
  );
}
