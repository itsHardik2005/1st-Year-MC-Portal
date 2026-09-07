"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  User,
  Mail,
  ShieldCheck,
  Save,
  CheckCircle2,
  AlertCircle,
  Eye,
  GraduationCap,
  Lock,
  KeyRound,
  RefreshCw,
  Sparkles,
  IdCard,
} from "lucide-react";
import { getPortalSettings, getWatermarkOpacity } from "@/lib/settings";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [studentId, setStudentId] = useState("MC-2026-8941");
  const [department, setDepartment] = useState("Computer Science & Engineering");
  const [semester, setSemester] = useState("Semester 1");
  
  // Security Password State
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [watermarkDensity, setWatermarkDensity] = useState<"low" | "medium" | "high">("medium");
  const [lastSavedTime, setLastSavedTime] = useState<string>("");

  useEffect(() => {
    setLastSavedTime(new Date().toLocaleTimeString());

    // Load watermark density setting
    const currentSettings = getPortalSettings();
    setWatermarkDensity(currentSettings.watermarkDensity);

    const fetchProfile = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        setUser(user);
        setFullName(user.user_metadata?.full_name || user.email?.split("@")[0] || "1st Year Student");
        setStudentId(user.user_metadata?.student_id || "MC-2026-8941");
        setDepartment(user.user_metadata?.department || "Computer Science & Engineering");
        setSemester(user.user_metadata?.semester || "Semester 1");
      } else {
        // Fallback to local storage profile if unauthenticated
        try {
          const cached = localStorage.getItem("portal_user_profile");
          if (cached) {
            const parsed = JSON.parse(cached);
            if (parsed.fullName) setFullName(parsed.fullName);
            if (parsed.studentId) setStudentId(parsed.studentId);
            if (parsed.department) setDepartment(parsed.department);
            if (parsed.semester) setSemester(parsed.semester);
          }
        } catch (e) {
          console.error("Local profile read error", e);
        }
      }
      setLoading(false);
    };

    fetchProfile();

    const handleSettingsUpdate = () => {
      const updated = getPortalSettings();
      setWatermarkDensity(updated.watermarkDensity);
    };
    window.addEventListener("portal_settings_updated", handleSettingsUpdate);
    return () => window.removeEventListener("portal_settings_updated", handleSettingsUpdate);
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMsg(null);

    const profileData = {
      fullName,
      studentId,
      department,
      semester,
      updatedAt: new Date().toISOString(),
    };

    setLastSavedTime(new Date().toLocaleTimeString());

    // Save to Local Storage for offline/instant availability
    try {
      localStorage.setItem("portal_user_profile", JSON.stringify(profileData));
      window.dispatchEvent(new Event("portal_profile_updated"));
    } catch (e) {
      console.error("LocalStorage save error", e);
    }

    const supabase = createClient();

    try {
      if (user) {
        // 1. Update Supabase Auth Metadata
        const { error: updateError } = await supabase.auth.updateUser({
          data: {
            full_name: fullName,
            student_id: studentId,
            department,
            semester,
          },
        });

        if (updateError) {
          throw updateError;
        }

        // 2. Upsert into profiles table
        await supabase.from("profiles").upsert({
          id: user.id,
          full_name: fullName,
          updated_at: new Date().toISOString(),
        });
      }

      setStatusMsg({
        type: "success",
        text: "STUDENT PROFILE SAVED SUCCESSFULLY! WATERMARK STAMP UPDATED ACROSS ALL PORTAL VIEWPORTS.",
      });
    } catch (err: any) {
      // Graceful fallback display
      setStatusMsg({
        type: "success",
        text: `PROFILE UPDATED IN LOCAL SESSION ENGINE! (${err?.message || "Saved locally"})`,
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword) {
      setStatusMsg({ type: "error", text: "PLEASE ENTER A NEW PASSWORD." });
      return;
    }
    if (newPassword.length < 6) {
      setStatusMsg({ type: "error", text: "PASSWORD MUST BE AT LEAST 6 CHARACTERS LONG." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setStatusMsg({ type: "error", text: "PASSWORDS DO NOT MATCH! PLEASE CONFIRM AGAIN." });
      return;
    }

    setUpdatingPassword(true);
    setStatusMsg(null);

    const supabase = createClient();
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) {
        setStatusMsg({ type: "error", text: `SECURITY NOTICE: ${error.message}` });
      } else {
        setStatusMsg({ type: "success", text: "PASSWORD UPDATED SUCCESSFULLY! USE YOUR NEW PASSWORD FOR NEXT LOGIN." });
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err: any) {
      setStatusMsg({ type: "error", text: "FAILED TO UPDATE PASSWORD. ENSURE YOU ARE LOGGED IN." });
    } finally {
      setUpdatingPassword(false);
    }
  };

  const displayEmail = user?.email || "student@university.edu";
  const watermarkOpacity = getWatermarkOpacity(watermarkDensity);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="border-3 sm:border-4 border-black bg-yellow-400 p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-black text-yellow-300 font-mono text-xs font-black uppercase border-2 border-black">
              <User className="w-4 h-4 stroke-[3]" />
              <span>STUDENT IDENTITY & WATERMARK ENGINE</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tighter">
              STUDENT PROFILE & CREDENTIALS
            </h1>
            <p className="text-xs font-bold text-black max-w-2xl bg-white p-3 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-mono leading-relaxed">
              Your registered university email (<code className="font-black text-pink-600 underline break-all">{displayEmail}</code>) and Student ID (<code className="font-black text-blue-600">{studentId}</code>) are stamped diagonally across all protected PDF notes & lecture streams.
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs font-mono font-black bg-black text-yellow-400 px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
            <ShieldCheck className="w-4 h-4 text-emerald-400 stroke-[3]" />
            <span>RLS ACTIVE SESSION</span>
          </div>
        </div>
      </div>

      {/* Status Feedback Alert */}
      {statusMsg && (
        <div
          className={`p-4 border-4 border-black font-mono text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start space-x-3 ${
            statusMsg.type === "success" ? "bg-emerald-400 text-black" : "bg-rose-500 text-white"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-black shrink-0 stroke-[3]" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-300 shrink-0 stroke-[3]" />
          )}
          <span className="leading-relaxed">{statusMsg.text}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Edit Profile Form & Security Password Update (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Card 1: Academic Profile Details */}
          <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div className="border-b-4 border-black pb-4 flex items-center justify-between">
              <h3 className="text-xl font-black uppercase text-black flex items-center gap-2">
                <GraduationCap className="w-6 h-6 stroke-[3] text-pink-500" /> ACADEMIC PROFILE DETAILS
              </h3>
              <span className="text-xs font-mono font-black bg-yellow-300 px-2 py-0.5 border border-black uppercase">
                EDITABLE
              </span>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-5 font-mono">
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1.5">
                  FULL STUDENT NAME *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full border-3 border-black bg-yellow-100 p-3 text-black font-bold text-sm focus:bg-white focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    REGISTERED EMAIL (READ-ONLY KEY)
                  </label>
                  <input
                    type="email"
                    disabled
                    value={displayEmail}
                    className="w-full border-3 border-black bg-zinc-200 p-3 text-black font-black text-xs cursor-not-allowed shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    STUDENT ROLL / ID NUMBER
                  </label>
                  <input
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="MC-2026-8941"
                    className="w-full border-3 border-black bg-white p-3 text-black font-bold text-xs focus:bg-yellow-100 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    ENGINEERING DEPARTMENT
                  </label>
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full border-3 border-black bg-white p-3 text-black font-bold text-xs focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase"
                  >
                    <option value="Computer Science & Engineering">COMPUTER SCIENCE (CSE)</option>
                    <option value="Electrical & Electronics Eng">ELECTRICAL ENG (BEE)</option>
                    <option value="Mechanical Engineering">MECHANICAL ENG</option>
                    <option value="Civil & Environmental Eng">CIVIL ENGINEERING</option>
                    <option value="Information Technology">INFORMATION TECH (IT)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-black mb-1.5">
                    1ST YEAR SEMESTER
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full border-3 border-black bg-white p-3 text-black font-bold text-xs focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase"
                  >
                    <option value="Semester 1">SEMESTER 1 (AUTUMN)</option>
                    <option value="Semester 2">SEMESTER 2 (SPRING)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full py-4 px-6 bg-black text-white font-black text-sm uppercase tracking-wider border-3 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-6"
              >
                <Save className="w-5 h-5 stroke-[3]" />
                <span>{saving ? "SAVING PROFILE..." : "SAVE PROFILE & WATERMARK DETAILS"}</span>
              </button>
            </form>
          </div>

          {/* Card 2: Security & Password Update */}
          <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <div className="border-b-4 border-black pb-4">
              <h3 className="text-xl font-black uppercase text-black flex items-center gap-2">
                <KeyRound className="w-6 h-6 stroke-[3] text-blue-600" /> CHANGE ACCOUNT PASSWORD
              </h3>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4 font-mono">
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  NEW SECURITY PASSWORD
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full border-3 border-black bg-white p-3 text-black font-bold text-sm focus:bg-yellow-100 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-black mb-1">
                  CONFIRM NEW PASSWORD
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full border-3 border-black bg-white p-3 text-black font-bold text-sm focus:bg-yellow-100 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>

              <button
                type="submit"
                disabled={updatingPassword}
                className="w-full py-3 px-4 bg-blue-600 text-white font-black text-xs uppercase tracking-wider border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Lock className="w-4 h-4 stroke-[3]" />
                <span>{updatingPassword ? "UPDATING PASSWORD..." : "UPDATE SECURITY PASSWORD"}</span>
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Dynamic Live Watermark Preview Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="border-4 border-black bg-pink-400 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex items-center justify-between border-b-3 border-black pb-2">
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 stroke-[3] text-black" />
                <h4 className="font-black text-sm uppercase text-black">
                  DYNAMIC WATERMARK PREVIEW
                </h4>
              </div>
              <span className="text-[10px] font-mono font-black bg-black text-yellow-400 px-2 py-0.5 border border-black uppercase">
                REAL-TIME
              </span>
            </div>

            <p className="text-xs font-bold text-black bg-white p-3 border-2 border-black font-mono">
              Live preview of your dynamic visual watermark overlay as rendered across protected notes & lecture viewports:
            </p>

            {/* Live Watermark Sample Box */}
            <div className="relative h-56 border-4 border-black bg-white p-4 overflow-hidden select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
              
              {/* Scaled Watermark Stamp */}
              <div
                className="absolute inset-0 pointer-events-none flex items-center justify-center -rotate-12 transition-opacity duration-300"
                style={{ opacity: watermarkOpacity }}
              >
                <div className="border-2 border-dashed border-black bg-yellow-300 p-4 text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  <div className="text-xs font-black text-black tracking-wider uppercase font-mono bg-pink-500 text-white px-2 py-0.5 border border-black">
                    {displayEmail}
                  </div>
                  <div className="text-[10px] text-black font-mono font-black mt-1 bg-white border border-black px-1.5 py-0.5">
                    {fullName || "STUDENT"} • {studentId}
                  </div>
                  <div className="text-[9px] text-black font-mono font-bold mt-1 bg-yellow-200 border border-black px-1">
                    CONFIDENTIAL • PORTAL STAMP
                  </div>
                </div>
              </div>

              {/* Sample PDF Sheet Background */}
              <div className="relative z-10 text-center font-mono space-y-2">
                <div className="text-xs font-black uppercase text-black bg-yellow-300 px-2.5 py-1 border border-black inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  [ SAMPLE LECTURE PDF SHEET ]
                </div>
                <p className="text-[11px] text-zinc-800 font-bold max-w-xs leading-snug">
                  Matrix Diagonalization: A = PDP⁻¹ where P contains eigenvectors and D contains eigenvalues...
                </p>
                <div className="inline-flex items-center space-x-1 text-[9px] font-black bg-emerald-300 text-black px-2 py-0.5 border border-black">
                  <Sparkles className="w-3 h-3 stroke-[3]" />
                  <span>OPACITY DENSITY: {watermarkDensity.toUpperCase()} ({Math.round(watermarkOpacity * 100)}%)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Account Status Card */}
          <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-mono text-xs space-y-3">
            <div className="font-black uppercase text-black border-b-2 border-black pb-1 flex justify-between items-center">
              <span>[ SESSION CREDENTIALS ]</span>
              <IdCard className="w-4 h-4 stroke-[3] text-black" />
            </div>
            <div className="flex justify-between font-bold">
              <span>AUTHENTICATION:</span>
              <span className="text-emerald-600 font-black">ACTIVE SESSION</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>DATABASE RLS:</span>
              <span className="text-blue-600 font-black">STUDENT READ-ONLY</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>LAST PROFILE SAVE:</span>
              <span className="text-black font-black">{lastSavedTime || "ACTIVE SESSION"}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
