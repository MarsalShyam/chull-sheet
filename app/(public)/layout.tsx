"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { ArrowRight, Menu, Sparkles, X, ChevronDown } from "lucide-react";
import {
  FileText,
  Briefcase,
  Target,
  CheckSquare,
  Calendar,
  Shield,
  GraduationCap,
  User,
  Users,
  Building2,
  Rocket,
  MessageSquare,
  PenLine,
  Video,
} from "lucide-react";




export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* SaaS Navbar */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-md transition-all duration-300 ${isScrolled
        ? "bg-black/90 border-b border-zinc-800/80"
        : "bg-black/60 border-b border-transparent"
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-1 hover:opacity-90 transition-opacity">
              <div className="relative w-fit h-fit overflow-hidden flex items-center justify-center">
                <Image
                  src="/logow1.png"
                  alt="ChullSheet Logo"
                  width={32}
                  height={32}
                  className="object-contain p-0.5"
                />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent tracking-tight">
                ChullSheet
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-zinc-400">
              {/* Products Dropdown */}
              <div className="relative group">
                <button className="hover:text-zinc-200 transition-colors flex items-center gap-1 py-5 cursor-pointer">
                  Products
                  <span className="text-[10px] opacity-60 transition-transform group-hover:rotate-180">▼</span>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[640px] rounded-2xl bg-[#0a0a0a] border border-zinc-800/80 p-5 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 backdrop-blur-md z-50">
                  <div className="grid grid-cols-2 gap-x-6">
                    {/* Column 1 */}
                    <div>
                      <p className="text-xs text-zinc-500 font-normal px-3 pb-3">Productivity Tools</p>
                      <div className="flex flex-col gap-0.5">
                        <Link href="/products/docs" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                          <span className="text-xl leading-none mt-0.5">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                              <FileText className="w-5 h-5" strokeWidth={2} />
                            </div>
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                              Docs
                            </span>
                            <span className="text-xs text-zinc-500 mt-1 leading-snug">
                              Simple and powerful documents
                            </span>
                          </div>
                        </Link>
                        <Link href="/products/job-application-tracker" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                          <span className="text-xl leading-none mt-0.5">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                              <Briefcase className="w-5 h-5" strokeWidth={2} />
                            </div>
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                              Job Application Tracker
                            </span>
                            <span className="text-xs text-zinc-500 mt-1 leading-snug">
                              Track your career journey
                            </span>
                          </div>
                        </Link>
                        <Link href="/products/habit-tracker" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                          <span className="text-xl leading-none mt-0.5">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                              <Target className="w-5 h-5" strokeWidth={2} />
                            </div>
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                              Habit Tracker
                            </span>
                            <span className="text-xs text-zinc-500 mt-1 leading-snug">
                              Build better routines
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>

                    {/* Column 2 */}
                    <div>
                      <p className="text-xs text-zinc-500 font-normal px-3 pb-3">Organization</p>
                      <div className="flex flex-col gap-0.5">
                        <Link href="/products/todo-list" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                          <span className="text-xl leading-none mt-0.5">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                              <CheckSquare className="w-5 h-5" strokeWidth={2} />
                            </div>
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-text-zinc-200 transition-colors">
                              Todo List
                            </span>
                            <span className="text-xs text-zinc-500 mt-1 leading-snug">
                              Your tasks, our priority
                            </span>
                          </div>
                        </Link>
                        <Link href="/products/calendar" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                          <span className="text-xl leading-none mt-0.5">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                              <Calendar className="w-5 h-5" strokeWidth={2} />
                            </div>
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                              ChullSheet Calendar
                            </span>
                            <span className="text-xs text-zinc-500 mt-1 leading-snug">
                              It's time
                            </span>
                          </div>
                        </Link>
                        <Link href="/products/security" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                          <span className="text-xl leading-none mt-0.5">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                              <Shield className="w-5 h-5" strokeWidth={2} />
                            </div>
                          </span>
                          <div className="flex flex-col">
                            <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                              Security
                            </span>
                            <span className="text-xs text-zinc-500 mt-1 leading-snug">
                              Safe and scalable
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group">
                <button className="hover:text-zinc-200 transition-colors flex items-center gap-1 py-5 cursor-pointer">
                  Solutions
                  <span className="text-[10px] opacity-60 transition-transform group-hover:rotate-180">▼</span>
                </button>
                <div className="absolute top-full left-0 mt-0 w-[320px] rounded-2xl bg-[#0a0a0a] border border-zinc-800/80 p-3 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 backdrop-blur-md z-50">
                  <Link href="/solutions/education" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                    <span className="text-xl leading-none mt-0.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <GraduationCap className="w-5 h-5" strokeWidth={2} />
                      </div>

                    </span>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                        Education
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 leading-snug">
                        Tools for students and teachers
                      </span>
                    </div>
                  </Link>
                  <Link href="/solutions/personal" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                    <span className="text-xl leading-none mt-0.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <User className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                        Personal
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 leading-snug">
                        Organize your personal life
                      </span>
                    </div>
                  </Link>
                  <Link href="/solutions/collaboration" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                    <span className="text-xl leading-none mt-0.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Users className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                        Collaboration
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 leading-snug">
                        Work together seamlessly
                      </span>
                    </div>
                  </Link>
                  <Link href="/solutions/professional" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                    <span className="text-xl leading-none mt-0.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Building2 className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                        Professional
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 leading-snug">
                        Built for professionals
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="hover:text-zinc-200 transition-colors flex items-center gap-1 py-5 cursor-pointer">
                  Resources
                  <span className="text-[10px] opacity-60 transition-transform group-hover:rotate-180">▼</span>
                </button>
                <div className="absolute top-full left-0 mt-0 w-[320px] rounded-2xl bg-[#0a0a0a] border border-zinc-800/80 p-3 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 backdrop-blur-md z-50">
                  <Link href="/resources/whats-new" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                    <span className="text-xl leading-none mt-0.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg  border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Rocket className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                        What's New
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 leading-snug">
                        Latest updates and features
                      </span>
                    </div>
                  </Link>
                  <Link href="/resources/customer-stories" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                    <span className="text-xl leading-none mt-0.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg  border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <MessageSquare className="w-5 h-5" strokeWidth={2} />
                      </div>

                    </span>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                        Customer Stories
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 leading-snug">
                        See how others use ChullSheet
                      </span>
                    </div>
                  </Link>
                  <Link href="/resources/blog" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                    <span className="text-xl leading-none mt-0.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg  border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <PenLine className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                        Blog
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 leading-snug">
                        Insights, tips and tutorials
                      </span>
                    </div>
                  </Link>
                  <Link href="/resources/webinars" className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                    <span className="text-xl leading-none mt-0.5">
                      <div className="flex items-center justify-center w-9 h-9 rounded-lg  border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Video className="w-5 h-5" strokeWidth={2} />
                      </div>
                    </span>
                    <div className="flex flex-col">
                      <span className="text-[15px] font-semibold text-zinc-100 leading-tight group-hover/item:text-zinc-200 transition-colors">
                        Webinars
                      </span>
                      <span className="text-xs text-zinc-500 mt-1 leading-snug">
                        Live sessions and recordings
                      </span>
                    </div>
                  </Link>
                </div>
              </div>

              <Link href="/developers" className="hover:text-zinc-200 transition-colors py-5">
                Developers
              </Link>
            </nav>
          </div>

          {/* Clerk Auth Integration & CTA */}
          <div className="flex items-center space-x-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="inline-flex items-center justify-center px-3.5 py-2 font-medium rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white text-base font-semibold  transition-all duration-200 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-300 text-base font-medium text-black shadow-md zinc-600/10 hover:shadow-zinc-500/20 active:scale-95 transition-all duration-200 cursor-pointer">
                  Get Started <ArrowRight className="w-4 h-4" />
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800/80 hover:bg-zinc-800 text-sm font-semibold text-zinc-200 hover:text-white transition-all"
              >
                Workspace <Sparkles className="w-4 h-4 text-indigo-400" />
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-lg border border-zinc-800",
                  },
                }}
              />
            </Show>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity duration-300"
          />

          {/* Drawer Panel */}
          <div className="relative flex flex-col w-[300px] h-full bg-[#09090b]/95 border-l border-zinc-800/80 p-6 shadow-2xl overflow-y-auto ml-auto transition-transform duration-300 ease-out animate-in slide-in-from-right duration-250 backdrop-blur-md">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800/60 mb-6">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-1">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Image src="/logow1.png" alt="Logo" width={20} height={20} />
                </div>
                <span className="font-bold text-base text-zinc-100">ChullSheet</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Links */}
            <div className="flex-1 space-y-4">
              {/* Products Accordion */}
              <div>
                <button
                  onClick={() => setExpandedSection(expandedSection === "products" ? null : "products")}
                  className="flex items-center justify-between w-full py-2 text-sm font-semibold text-zinc-200 hover:text-white border-b border-zinc-900"
                >
                  <span>Products</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedSection === "products" ? "rotate-180" : ""}`} />
                </button>
                {expandedSection === "products" && (
                  <div className="pl-2 py-3 space-y-1 mt-1">
                    <Link href="/products/docs" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <FileText className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Docs</span>
                    </Link>
                    <Link href="/products/job-application-tracker" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Briefcase className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Job Application Tracker</span>
                    </Link>
                    <Link href="/products/habit-tracker" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Target className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Habit Tracker</span>
                    </Link>
                    <Link href="/products/todo-list" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <CheckSquare className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Todo List</span>
                    </Link>
                    <Link href="/products/calendar" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">ChullSheet Calendar</span>
                    </Link>
                    <Link href="/products/security" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Shield className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Security</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Solutions Accordion */}
              <div>
                <button
                  onClick={() => setExpandedSection(expandedSection === "solutions" ? null : "solutions")}
                  className="flex items-center justify-between w-full py-2 text-sm font-semibold text-zinc-200 hover:text-white border-b border-zinc-900"
                >
                  <span>Solutions</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedSection === "solutions" ? "rotate-180" : ""}`} />
                </button>
                {expandedSection === "solutions" && (
                  <div className="pl-2 py-3 space-y-1 mt-1">
                    <Link href="/solutions/education" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <GraduationCap className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Education</span>
                    </Link>
                    <Link href="/solutions/personal" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <User className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Personal</span>
                    </Link>
                    <Link href="/solutions/collaboration" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Users className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Collaboration</span>
                    </Link>
                    <Link href="/solutions/professional" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Building2 className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Professional</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Resources Accordion */}
              <div>
                <button
                  onClick={() => setExpandedSection(expandedSection === "resources" ? null : "resources")}
                  className="flex items-center justify-between w-full py-2 text-sm font-semibold text-zinc-200 hover:text-white border-b border-zinc-900"
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedSection === "resources" ? "rotate-180" : ""}`} />
                </button>
                {expandedSection === "resources" && (
                  <div className="pl-2 py-3 space-y-1 mt-1">
                    <Link href="/resources/whats-new" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Rocket className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">What's New</span>
                    </Link>
                    <Link href="/resources/customer-stories" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <MessageSquare className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Customer Stories</span>
                    </Link>
                    <Link href="/resources/blog" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <PenLine className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Blog</span>
                    </Link>
                    <Link href="/resources/webinars" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-900/70 transition-colors group/item">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover/item:bg-zinc-800 group-hover/item:text-white group-hover/item:border-zinc-700 transition-colors shrink-0">
                        <Video className="w-3.5 h-3.5" strokeWidth={2} />
                      </div>
                      <span className="text-xs font-medium text-zinc-300 group-hover/item:text-white transition-colors">Webinars</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* Developers Link */}
              <div>
                <Link
                  href="/developers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-sm font-semibold text-zinc-200 hover:text-white border-b border-zinc-900"
                >
                  Developers
                </Link>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="pt-6 border-t border-zinc-800/60 space-y-2 mt-auto">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-800 hover:text-white text-base font-medium transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2 rounded-lg bg-white hover:bg-zinc-200 text-base font-medium text-black transition-colors cursor-pointer"
                  >
                    Get Started
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Link
                  href="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white transition-colors"
                >
                  Workspace <Sparkles className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
                </Link>
              </Show>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* SaaS Footer */}
      <footer className="border-t border-zinc-900 bg-[#070708] py-12 text-sm text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-6 h-6 rounded bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
                <Image
                  src="/logob3.png"
                  alt="ChullSheet"
                  width={24}
                  height={24}
                  className="object-contain p-0.5"
                />
              </div>
              <span className="font-bold text-zinc-200 tracking-tight">ChullSheet</span>
            </Link>
            <p className="text-xs text-zinc-650 leading-relaxed">
              Transforming productivity and collaboration for students and developers. Track habits, manage jobs, write notes, and finish todos with AI.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-300 mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products/docs" className="hover:text-zinc-350 transition-colors">Docs</Link></li>
              <li><Link href="/products/job-application-tracker" className="hover:text-zinc-350 transition-colors">Job Application Tracker</Link></li>
              <li><Link href="/products/habit-tracker" className="hover:text-zinc-350 transition-colors">Habit Tracker</Link></li>
              <li><Link href="/products/todo-list" className="hover:text-zinc-350 transition-colors">Todo List</Link></li>
              <li><Link href="/products/calendar" className="hover:text-zinc-350 transition-colors">ChullSheet Calendar</Link></li>
              <li><Link href="/products/security" className="hover:text-zinc-350 transition-colors">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-300 mb-3">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/solutions/education" className="hover:text-zinc-350 transition-colors">Education</Link></li>
              <li><Link href="/solutions/personal" className="hover:text-zinc-350 transition-colors">Personal</Link></li>
              <li><Link href="/solutions/collaboration" className="hover:text-zinc-350 transition-colors">Collaboration</Link></li>
              <li><Link href="/solutions/professional" className="hover:text-zinc-350 transition-colors">Professional</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-zinc-300 mb-3">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/resources/whats-new" className="hover:text-zinc-350 transition-colors">What's New</Link></li>
              <li><Link href="/resources/customer-stories" className="hover:text-zinc-350 transition-colors">Customer Stories</Link></li>
              <li><Link href="/resources/blog" className="hover:text-zinc-350 transition-colors">Blog</Link></li>
              <li><Link href="/resources/webinars" className="hover:text-zinc-350 transition-colors">Webinars</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-zinc-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-650">
          <p>© {new Date().getFullYear()} ChullSheet. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-zinc-500 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-500 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
