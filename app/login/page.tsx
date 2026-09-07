"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Lock, Mail, KeyRound, User, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const supabase = createClient();

    try {
      if (isSignUp) {
        // Handle Supabase Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg(
            data.session
              ? "ACCOUNT CREATED SUCCESSFULLY! REDIRECTING..."
              : "SIGN UP SUCCESSFUL! PLEASE CHECK YOUR EMAIL TO CONFIRM."
          );
          if (data.session) {
            setTimeout(() => {
              router.push("/core");
              router.refresh();
            }, 1500);
          }
        }
      } else {
        // Handle Supabase Login
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message);
        } else {
          setSuccessMsg("SIGN IN SUCCESSFUL! REDIRECTING TO STUDY PORTAL...");
          setTimeout(() => {
            router.push("/core");
            router.refresh();
          }, 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected authentication error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-6">
        
        {/* Neo-Brutalist Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-black text-yellow-400 border-3 border-black shadow-[4px_4px_0px_0px_rgba(236,72,153,1)] mb-2">
            <Zap className="w-7 h-7 sm:w-8 sm:h-8 fill-current text-pink-500" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-black tracking-tighter uppercase leading-none">
            {isSignUp ? "CREATE STUDENT ACCOUNT" : "STUDENT LOGIN VAULT"}
          </h2>
          <p className="font-mono text-[10px] sm:text-xs font-bold text-black uppercase bg-white p-2 border-2 border-black inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            AUTHENTICATE WITH UNIVERSITY SUPABASE CREDENTIALS
          </p>
        </div>

        {/* Neo-Brutalist Card-Based Auth Form */}
        <div className="border-3 sm:border-4 border-black bg-yellow-400 p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] space-y-6">
          
          {/* Toggle Tab Switcher */}
          <div className="grid grid-cols-2 p-1 bg-black border-2 border-black">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(false);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-2 text-xs font-black uppercase tracking-wider transition-all ${
                !isSignUp
                  ? "bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(true);
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-2 text-xs font-black uppercase tracking-wider transition-all ${
                isSignUp
                  ? "bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  : "text-white hover:text-yellow-300"
              }`}
            >
              SIGN UP
            </button>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="p-4 bg-rose-500 text-white font-mono text-xs font-bold border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-300 shrink-0 stroke-[3]" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-4 bg-emerald-400 text-black font-mono text-xs font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-start space-x-2">
              <CheckCircle2 className="w-5 h-5 text-black shrink-0 stroke-[3]" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form with Required Thick Inputs */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="block text-xs font-black uppercase text-black mb-1.5 font-mono">
                  FULL STUDENT NAME
                </label>
                <input
                  type="text"
                  required={isSignUp}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full border-4 border-black bg-white p-4 text-black font-mono text-sm placeholder:text-zinc-400 focus:bg-yellow-100 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase text-black mb-1.5 font-mono">
                UNIVERSITY EMAIL ADDRESS
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full border-4 border-black bg-white p-4 text-black font-mono text-sm placeholder:text-zinc-400 focus:bg-yellow-100 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-black mb-1.5 font-mono">
                PASSWORD
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full border-4 border-black bg-white p-4 text-black font-mono text-sm placeholder:text-zinc-400 focus:bg-yellow-100 focus:outline-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 bg-black text-white font-black text-sm uppercase tracking-wider border-3 border-black shadow-[5px_5px_0px_0px_rgba(236,72,153,1)] hover:bg-pink-500 hover:text-black active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center space-x-2 disabled:opacity-50 mt-6"
            >
              <span>{loading ? "PROCESSING AUTH..." : isSignUp ? "REGISTER ACCOUNT" : "AUTHENTICATE & ENTER PORTAL"}</span>
              {!loading && <ArrowRight className="w-5 h-5 stroke-[3]" />}
            </button>
          </form>

          {/* Security footnote */}
          <div className="pt-4 border-t-3 border-black text-center font-mono text-[11px] font-bold text-black flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-black stroke-[3]" />
            <span>PROTECTED BY SUPABASE AUTH & RLS JWT SESSIONS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
