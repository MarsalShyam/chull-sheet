"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { ArrowRight, Menu, Sparkles, X, ChevronDown } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* SaaS Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/40 bg-[#030303]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Image
                  src="/logob3.png"
                  alt="ChullSheet Logo"
                  width={32}
                  height={32}
                  className="object-contain p-1"
                />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-200 via-zinc-100 to-indigo-100 bg-clip-text text-transparent tracking-tight">
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[520px] rounded-2xl bg-zinc-950/95 border border-zinc-800/80 p-4 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 backdrop-blur-md grid grid-cols-2 gap-3 z-50">
                  <Link href="/products/docs" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-zinc-900/60 group/item transition-colors">
                    <span className="font-bold text-zinc-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      📝 Docs
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1 leading-normal">
                      Simple and powerful documents
                    </span>
                  </Link>
                  <Link href="/products/job-application-tracker" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-zinc-900/60 group/item transition-colors">
                    <span className="font-bold text-zinc-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      💼 Job Application Tracker
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1 leading-normal">
                      Track your career journey
                    </span>
                  </Link>
                  <Link href="/products/habit-tracker" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-zinc-900/60 group/item transition-colors">
                    <span className="font-bold text-zinc-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      📅 Habit Tracker
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1 leading-normal">
                      Build better routines
                    </span>
                  </Link>
                  <Link href="/products/todo-list" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-zinc-900/60 group/item transition-colors">
                    <span className="font-bold text-zinc-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      ✓ Todo List
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1 leading-normal">
                      Your tasks, our priority
                    </span>
                  </Link>
                  <Link href="/products/calendar" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-zinc-900/60 group/item transition-colors">
                    <span className="font-bold text-zinc-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      ⏰ ChullSheet Calendar
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1 leading-normal">
                      It's time
                    </span>
                  </Link>
                  <Link href="/products/security" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-zinc-900/60 group/item transition-colors">
                    <span className="font-bold text-zinc-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      🔒 Security
                    </span>
                    <span className="text-[10px] text-zinc-500 mt-1 leading-normal">
                      Safe and scalable
                    </span>
                  </Link>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group">
                <button className="hover:text-zinc-200 transition-colors flex items-center gap-1 py-5 cursor-pointer">
                  Solutions
                  <span className="text-[10px] opacity-60 transition-transform group-hover:rotate-180">▼</span>
                </button>
                <div className="absolute top-full left-0 mt-0 w-48 rounded-xl bg-zinc-950/95 border border-zinc-800/80 p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 backdrop-blur-md z-50">
                  <Link href="/solutions/education" className="block px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900/60 text-xs transition-colors">
                    🎓 Education
                  </Link>
                  <Link href="/solutions/personal" className="block px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900/60 text-xs transition-colors">
                    👤 Personal
                  </Link>
                  <Link href="/solutions/collaboration" className="block px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900/60 text-xs transition-colors">
                    👥 Collaboration
                  </Link>
                  <Link href="/solutions/professional" className="block px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900/60 text-xs transition-colors">
                    💼 Professional
                  </Link>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="hover:text-zinc-200 transition-colors flex items-center gap-1 py-5 cursor-pointer">
                  Resources
                  <span className="text-[10px] opacity-60 transition-transform group-hover:rotate-180">▼</span>
                </button>
                <div className="absolute top-full left-0 mt-0 w-48 rounded-xl bg-zinc-950/95 border border-zinc-800/80 p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 backdrop-blur-md z-50">
                  <Link href="/resources/whats-new" className="block px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900/60 text-xs transition-colors">
                    🚀 What's New
                  </Link>
                  <Link href="/resources/customer-stories" className="block px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900/60 text-xs transition-colors">
                    💬 Customer Stories
                  </Link>
                  <Link href="/resources/blog" className="block px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900/60 text-xs transition-colors">
                    ✍️ Blog
                  </Link>
                  <Link href="/resources/webinars" className="block px-3 py-2 rounded-lg text-zinc-300 hover:text-white hover:bg-zinc-900/60 text-xs transition-colors">
                    🎥 Webinars
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
                <button className="text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white shadow-md shadow-indigo-600/10 hover:shadow-indigo-500/20 active:scale-95 transition-all cursor-pointer">
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
          <div className="relative flex flex-col w-[280px] h-full bg-[#09090b]/95 border-l border-zinc-800/80 p-6 shadow-2xl overflow-y-auto ml-auto transition-transform duration-300 ease-out animate-in slide-in-from-right duration-250 backdrop-blur-md">
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-zinc-800/60 mb-6">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                  <Image src="/logob3.png" alt="Logo" width={20} height={20} />
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
                  className="flex items-center justify-between w-full py-2 text-sm font-semibold text-zinc-200 hover:text-zinc-100 border-b border-zinc-900"
                >
                  <span>Products</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedSection === "products" ? "rotate-180" : ""}`} />
                </button>
                {expandedSection === "products" && (
                  <div className="pl-4 py-2 space-y-3 mt-1 border-l border-zinc-800/40">
                    <Link href="/products/docs" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">📝 Docs</Link>
                    <Link href="/products/job-application-tracker" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">💼 Job Application Tracker</Link>
                    <Link href="/products/habit-tracker" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">📅 Habit Tracker</Link>
                    <Link href="/products/todo-list" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">✓ Todo List</Link>
                    <Link href="/products/calendar" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">⏰ ChullSheet Calendar</Link>
                    <Link href="/products/security" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">🔒 Security</Link>
                  </div>
                )}
              </div>

              {/* Solutions Accordion */}
              <div>
                <button
                  onClick={() => setExpandedSection(expandedSection === "solutions" ? null : "solutions")}
                  className="flex items-center justify-between w-full py-2 text-sm font-semibold text-zinc-200 hover:text-zinc-100 border-b border-zinc-900"
                >
                  <span>Solutions</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedSection === "solutions" ? "rotate-180" : ""}`} />
                </button>
                {expandedSection === "solutions" && (
                  <div className="pl-4 py-2 space-y-3 mt-1 border-l border-zinc-800/40">
                    <Link href="/solutions/education" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">🎓 Education</Link>
                    <Link href="/solutions/personal" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">👤 Personal</Link>
                    <Link href="/solutions/collaboration" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">👥 Collaboration</Link>
                    <Link href="/solutions/professional" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">💼 Professional</Link>
                  </div>
                )}
              </div>

              {/* Resources Accordion */}
              <div>
                <button
                  onClick={() => setExpandedSection(expandedSection === "resources" ? null : "resources")}
                  className="flex items-center justify-between w-full py-2 text-sm font-semibold text-zinc-200 hover:text-zinc-100 border-b border-zinc-900"
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${expandedSection === "resources" ? "rotate-180" : ""}`} />
                </button>
                {expandedSection === "resources" && (
                  <div className="pl-4 py-2 space-y-3 mt-1 border-l border-zinc-800/40">
                    <Link href="/resources/whats-new" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">🚀 What's New</Link>
                    <Link href="/resources/customer-stories" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">💬 Customer Stories</Link>
                    <Link href="/resources/blog" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">✍️ Blog</Link>
                    <Link href="/resources/webinars" onClick={() => setIsMobileMenuOpen(false)} className="block text-xs text-zinc-400 hover:text-zinc-200">🎥 Webinars</Link>
                  </div>
                )}
              </div>

              {/* Developers Link */}
              <div>
                <Link
                  href="/developers"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-sm font-semibold text-zinc-200 hover:text-zinc-150 border-b border-zinc-900"
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
                    className="w-full py-2 rounded-lg border border-zinc-800 bg-zinc-900/60 text-zinc-200 hover:bg-zinc-800 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors cursor-pointer"
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
                  Workspace <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
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
