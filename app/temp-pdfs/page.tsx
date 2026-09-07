"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import TempPdfViewer from "@/components/TempPdfViewer";
import { FileClock, Zap } from "lucide-react";

export default function TempPdfsPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || "student@portal.edu");
    };
    fetchUser();
  }, []);

  const tempMaterials = [
    {
      id: "77777777-7777-7777-7777-777777777777",
      title: "Midterm Exam Solutions Vault (60-Second Temporary Access)",
      storagePath: "temp-vault/midterm-solutions-2026.pdf",
      durationSeconds: 60,
    },
    {
      id: "88888888-8888-8888-8888-888888888889",
      title: "Confidential Research Draft & Grading Rubric (30-Second Token)",
      storagePath: "temp-vault/confidential-rubric-2026.pdf",
      durationSeconds: 30,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Neo-Brutalist Header */}
      <div className="border-3 sm:border-4 border-black bg-orange-400 p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-yellow-300 font-mono text-xs font-black uppercase border-2 border-black">
              <FileClock className="w-4 h-4 stroke-[3]" />
              <span>HIGH-ANXIETY TIME-LIMITED VAULT</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tighter">
              TEMPORARY PDF ACCESS (SIGNED URLs)
            </h1>
            <p className="text-xs font-bold text-black max-w-2xl bg-white p-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              Demonstrating Supabase Storage <code className="font-mono font-black text-rose-600 bg-yellow-300 px-1 border border-black">createSignedUrl()</code> tokens. Access automatically locks when countdown hits zero!
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-black bg-black text-yellow-400 px-4 py-2 border-2 border-black">
            <Zap className="w-4 h-4 text-pink-500 stroke-[3]" />
            <span>AUTO-LOCKING VAULT</span>
          </div>
        </div>
      </div>

      {/* Temp PDF Viewers List */}
      <div className="space-y-12">
        {tempMaterials.map((mat) => (
          <TempPdfViewer
            key={mat.id}
            userEmail={userEmail}
            materialTitle={mat.title}
            storagePath={mat.storagePath}
            bucketName="temp-vault"
            durationSeconds={mat.durationSeconds}
          />
        ))}
      </div>
    </div>
  );
}
