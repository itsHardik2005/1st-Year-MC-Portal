"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  BookOpen,
  Layers,
  FileClock,
  Mail,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
  Hash,
  ShieldAlert,
  HelpCircle,
  Settings,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const getInitialUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoading(false);
    };

    getInitialUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/login");
  };

  const navLinks = [
    { name: "CORE SUBJECTS", href: "/core", icon: BookOpen, color: "bg-black text-white shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]" },
    { name: "NON-CORE SUBJECTS", href: "/non-core", icon: Layers, color: "bg-purple-300 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" },
    { name: "TEMP VAULT", href: "/temp-pdfs", icon: FileClock, color: "bg-orange-300 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" },
    { name: "ADMIN HUB", href: "/admin", icon: ShieldAlert, color: "bg-rose-400 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-yellow-400 shadow-[0_4px_0_0_#000]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 h-20 gap-2 sm:gap-4">
        
        {/* Left Side: Brand Logo with Hashtag Icon & 1ST YEAR MC PORTAL Slogan */}
        <Link href="/" className="flex items-center space-x-2.5 sm:space-x-3 group shrink-0">
          {/* White square logo block with bold black Hashtag (Inverts to Black bg / White icon on hover) */}
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white text-black border-2 sm:border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-200 shrink-0">
            <Hash className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3.5]" />
          </div>

          {/* Single Slogan Name: 1ST YEAR MC PORTAL */}
          <div className="flex flex-col">
            <span className="font-black text-base sm:text-xl tracking-tighter uppercase text-black leading-none">
              1ST YEAR MC PORTAL
            </span>
            <span className="text-[8px] sm:text-[9.5px] font-mono font-black tracking-wider sm:tracking-widest uppercase text-black bg-white border border-black px-1.5 py-0.5 mt-1 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] truncate max-w-[170px] sm:max-w-none">
              ACADEMIC STUDY PORTAL
            </span>
          </div>
        </Link>

        {/* Right Side Navigation Blocks */}
        <nav className="hidden lg:flex items-center space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center space-x-1.5 px-3 py-2 border-2 border-black font-black text-xs uppercase tracking-tight transition-all duration-200 transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                  isActive
                    ? "bg-black text-yellow-400 shadow-[3px_3px_0px_0px_rgba(236,72,153,1)]"
                    : `${link.color} hover:bg-black hover:text-white`
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 stroke-[2.5]" />
                <span>{link.name}</span>
              </Link>
            );
          })}

          {/* User Profile & Settings Links */}
          <Link
            href="/profile"
            className={`flex items-center space-x-1 px-3 py-2 border-2 border-black font-black text-xs uppercase tracking-tight transition-all duration-200 transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
              pathname === "/profile"
                ? "bg-black text-yellow-400 shadow-[3px_3px_0px_0px_rgba(236,72,153,1)]"
                : "bg-cyan-300 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white"
            }`}
          >
            <User className="w-4 h-4 shrink-0 stroke-[2.5]" />
            <span>PROFILE</span>
          </Link>

          <Link
            href="/settings"
            className={`flex items-center space-x-1 px-3 py-2 border-2 border-black font-black text-xs uppercase tracking-tight transition-all duration-200 transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
              pathname === "/settings"
                ? "bg-black text-yellow-400 shadow-[3px_3px_0px_0px_rgba(236,72,153,1)]"
                : "bg-emerald-300 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white"
            }`}
          >
            <Settings className="w-4 h-4 shrink-0 stroke-[2.5]" />
            <span>SETTINGS</span>
          </Link>

          {/* HELP Button - Magenta bg with mailto link */}
          <a
            href="mailto:support@studyportal.edu?subject=1st%20Year%20Study%20Portal%20Help"
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-pink-500 text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200 transform hover:-translate-y-0.5"
            title="Contact Customer Support"
          >
            <HelpCircle className="w-4 h-4 stroke-[3]" />
            <span>HELP</span>
          </a>

          {/* Auth status button */}
          {!isLoading && user ? (
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-1 px-3 py-2 bg-rose-500 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs font-black uppercase hover:bg-black active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <LogOut className="w-3.5 h-3.5 stroke-[3]" />
              <span>EXIT</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center space-x-1.5 px-3 py-2 bg-blue-500 text-white font-black text-xs uppercase tracking-wider border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <LogIn className="w-4 h-4 stroke-[3]" />
              <span>LOGIN</span>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center space-x-2 shrink-0">
          <a
            href="mailto:support@studyportal.edu?subject=1st%20Year%20Study%20Portal%20Help"
            className="px-2.5 py-1.5 bg-pink-500 text-white font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            HELP
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6 stroke-[3]" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t-4 border-black bg-yellow-300 p-4 space-y-3 shadow-[0_6px_0_0_#000]">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 border-2 border-black font-black text-sm uppercase tracking-tight ${
                    isActive
                      ? "bg-black text-yellow-400 shadow-[4px_4px_0px_0px_rgba(236,72,153,1)]"
                      : `${link.color}`
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.5]" />
                  <span>{link.name}</span>
                </Link>
              );
            })}

            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 border-2 border-black bg-cyan-300 font-black text-sm uppercase"
            >
              <User className="w-5 h-5 stroke-[2.5]" />
              <span>PROFILE</span>
            </Link>

            <Link
              href="/settings"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-3 px-4 py-3 border-2 border-black bg-emerald-300 font-black text-sm uppercase"
            >
              <Settings className="w-5 h-5 stroke-[2.5]" />
              <span>SETTINGS</span>
            </Link>
          </nav>

          <div className="pt-2 border-t-2 border-black space-y-2 font-mono">
            <a
              href="mailto:support@studyportal.edu?subject=1st%20Year%20Study%20Portal%20Help"
              className="flex items-center justify-center space-x-2 px-3 py-3 bg-pink-500 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-xs sm:text-sm uppercase text-center break-all"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] shrink-0" />
              <span>SUPPORT: SUPPORT@STUDYPORTAL.EDU</span>
            </a>

            {user ? (
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-rose-500 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-sm uppercase"
              >
                <LogOut className="w-5 h-5" />
                <span>SIGN OUT SESSION</span>
              </button>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-black text-sm uppercase"
              >
                <LogIn className="w-5 h-5" />
                <span>STUDENT LOGIN</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
