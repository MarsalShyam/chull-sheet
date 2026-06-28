import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { ArrowRight, Menu, Sparkles } from "lucide-react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* SaaS Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2.5 hover:opacity-90 transition-opacity">
              <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="ChullSheet Logo"
                  width={32}
                  height={32}
                  className="object-contain p-1"
                />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-200 via-slate-100 to-indigo-100 bg-clip-text text-transparent tracking-tight">
                ChullSheet
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-400">
              {/* Products Dropdown */}
              <div className="relative group">
                <button className="hover:text-slate-200 transition-colors flex items-center gap-1 py-5 cursor-pointer">
                  Products
                  <span className="text-[10px] opacity-60 transition-transform group-hover:rotate-180">▼</span>
                </button>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[520px] rounded-2xl bg-slate-900/95 border border-slate-800 p-4 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 backdrop-blur-md grid grid-cols-2 gap-3 z-50">
                  <Link href="/products/docs" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-slate-800/80 group/item transition-colors">
                    <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      📝 Docs
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Simple and powerful documents
                    </span>
                  </Link>
                  <Link href="/products/job-application-tracker" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-slate-800/80 group/item transition-colors">
                    <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      💼 Job Application Tracker
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Track your career journey
                    </span>
                  </Link>
                  <Link href="/products/habit-tracker" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-slate-800/80 group/item transition-colors">
                    <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      📅 Habit Tracker
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Build better routines
                    </span>
                  </Link>
                  <Link href="/products/todo-list" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-slate-800/80 group/item transition-colors">
                    <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      ✓ Todo List
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Your tasks, our priority
                    </span>
                  </Link>
                  <Link href="/products/calendar" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-slate-800/80 group/item transition-colors">
                    <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      ⏰ ChullSheet Calendar
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-normal">
                      It's time
                    </span>
                  </Link>
                  <Link href="/products/security" className="flex flex-col p-2.5 rounded-xl text-left hover:bg-slate-800/80 group/item transition-colors">
                    <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5 group-hover/item:text-indigo-400 transition-colors">
                      🔒 Security
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1 leading-normal">
                      Safe and scalable
                    </span>
                  </Link>
                </div>
              </div>

              {/* Solutions Dropdown */}
              <div className="relative group">
                <button className="hover:text-slate-200 transition-colors flex items-center gap-1 py-5 cursor-pointer">
                  Solutions
                  <span className="text-[10px] opacity-60 transition-transform group-hover:rotate-180">▼</span>
                </button>
                <div className="absolute top-full left-0 mt-0 w-48 rounded-xl bg-slate-900/95 border border-slate-800 p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 backdrop-blur-md z-50">
                  <Link href="/solutions/education" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors">
                    🎓 Education
                  </Link>
                  <Link href="/solutions/personal" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors">
                    👤 Personal
                  </Link>
                  <Link href="/solutions/collaboration" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors">
                    👥 Collaboration
                  </Link>
                  <Link href="/solutions/professional" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors">
                    💼 Professional
                  </Link>
                </div>
              </div>

              {/* Resources Dropdown */}
              <div className="relative group">
                <button className="hover:text-slate-200 transition-colors flex items-center gap-1 py-5 cursor-pointer">
                  Resources
                  <span className="text-[10px] opacity-60 transition-transform group-hover:rotate-180">▼</span>
                </button>
                <div className="absolute top-full left-0 mt-0 w-48 rounded-xl bg-slate-900/95 border border-slate-800 p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 backdrop-blur-md z-50">
                  <Link href="/resources/whats-new" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors">
                    🚀 What's New
                  </Link>
                  <Link href="/resources/customer-stories" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors">
                    💬 Customer Stories
                  </Link>
                  <Link href="/resources/blog" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors">
                    ✍️ Blog
                  </Link>
                  <Link href="/resources/webinars" className="block px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-xs transition-colors">
                    🎥 Webinars
                  </Link>
                </div>
              </div>

              <Link href="/developers" className="hover:text-slate-200 transition-colors py-5">
                Developers
              </Link>
            </nav>
          </div>

          {/* Clerk Auth Integration & CTA */}
          <div className="flex items-center space-x-4">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer">
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-sm font-semibold text-slate-200 hover:text-white transition-all"
              >
                Workspace <Sparkles className="w-4 h-4 text-indigo-400" />
              </Link>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-lg border border-slate-800",
                  },
                }}
              />
            </Show>

            {/* Mobile menu trigger */}
            <button className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* SaaS Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-12 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-6 h-6 rounded bg-indigo-600/20 flex items-center justify-center border border-indigo-500/30">
                <Image
                  src="/logo.png"
                  alt="ChullSheet"
                  width={24}
                  height={24}
                  className="object-contain p-0.5"
                />
              </div>
              <span className="font-bold text-slate-200 tracking-tight">ChullSheet</span>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transforming productivity and collaboration for students and developers. Track habits, manage jobs, write notes, and finish todos with AI.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-slate-300 mb-3">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/products/docs" className="hover:text-slate-300 transition-colors">Docs</Link></li>
              <li><Link href="/products/job-application-tracker" className="hover:text-slate-300 transition-colors">Job Application Tracker</Link></li>
              <li><Link href="/products/habit-tracker" className="hover:text-slate-300 transition-colors">Habit Tracker</Link></li>
              <li><Link href="/products/todo-list" className="hover:text-slate-300 transition-colors">Todo List</Link></li>
              <li><Link href="/products/calendar" className="hover:text-slate-300 transition-colors">ChullSheet Calendar</Link></li>
              <li><Link href="/products/security" className="hover:text-slate-300 transition-colors">Security</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-300 mb-3">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/solutions/education" className="hover:text-slate-300 transition-colors">Education</Link></li>
              <li><Link href="/solutions/personal" className="hover:text-slate-300 transition-colors">Personal</Link></li>
              <li><Link href="/solutions/collaboration" className="hover:text-slate-300 transition-colors">Collaboration</Link></li>
              <li><Link href="/solutions/professional" className="hover:text-slate-300 transition-colors">Professional</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-300 mb-3">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/resources/whats-new" className="hover:text-slate-300 transition-colors">What's New</Link></li>
              <li><Link href="/resources/customer-stories" className="hover:text-slate-300 transition-colors">Customer Stories</Link></li>
              <li><Link href="/resources/blog" className="hover:text-slate-300 transition-colors">Blog</Link></li>
              <li><Link href="/resources/webinars" className="hover:text-slate-300 transition-colors">Webinars</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600">
          <p>© {new Date().getFullYear()} ChullSheet. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
