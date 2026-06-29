import React from "react";
import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignUpButton } from "@clerk/nextjs";
import {
  ArrowRight,
  Sparkles,
  Check,
  Calendar,
  Briefcase,
  CheckSquare
} from "lucide-react";

export default async function Home() {
  const { userId } = await auth();

  // If already authenticated, redirect to workspace dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="relative overflow-hidden bg-slate-950 text-slate-100 flex flex-col items-center">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Introducing ChullSheet 2.0</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6">
          The ultimate productivity sheet
          <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
            built for builders.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 font-medium leading-relaxed mb-10">
          ChullSheet is a collaborative, AI-integrated workspace to organize notes, track habits, manage job applications, and coordinate team todos. Completely real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <SignUpButton mode="modal">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-base font-semibold text-white shadow-xl shadow-indigo-600/20 hover:shadow-indigo-500/30 active:scale-98 transition-all duration-200 cursor-pointer">
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
          <Link
            href="/products/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-base font-semibold text-slate-300 hover:text-white transition-all duration-200"
          >
            Explore Features
          </Link>
        </div>

        {/* Feature Mockup Box */}
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto rounded-2xl border border-slate-800 bg-slate-900/40 p-2 md:p-3 shadow-2xl backdrop-blur-sm">
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden relative aspect-[16/9] flex items-center justify-center">
            {/* Mockup screen overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
            <div className="absolute top-4 left-4 flex space-x-1.5 z-20">
              <span className="w-3 h-3 rounded-full bg-rose-500/70" />
              <span className="w-3 h-3 rounded-full bg-amber-500/70" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
            </div>

            {/* Dashboard Mockup Content */}
            <div className="w-full h-full p-8 md:p-12 flex flex-col justify-between text-left select-none">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                    <Image src="/logo.png" alt="Logo" width={18} height={18} />
                  </div>
                  <span className="font-bold text-sm text-slate-300">ChullSheet Workspace</span>
                </div>
                <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-[10px] text-slate-400">
                  <Sparkles className="w-3 h-3 text-indigo-400" /> AI Autopilot Enabled
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 flex-1">
                {/* Habit Tracker Column */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-2">
                      <Calendar className="w-3.5 h-3.5" /> HABITS
                    </div>
                    <h3 className="font-bold text-sm text-slate-200 mb-1">LeetCode Daily</h3>
                    <p className="text-[10px] text-slate-500 leading-tight">Streak: 18 Days. Complete 1 algorithm daily.</p>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mt-3">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <span
                        key={i}
                        className={`aspect-square rounded-[3px] border border-slate-800/80 ${i % 5 === 0
                          ? "bg-slate-900"
                          : i % 3 === 0
                            ? "bg-emerald-500/30 border-emerald-500/50"
                            : "bg-emerald-500/80 border-emerald-400/80"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Job Tracker Column */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-2">
                      <Briefcase className="w-3.5 h-3.5" /> CAREER
                    </div>
                    <h3 className="font-bold text-sm text-slate-200 mb-1">Google Application</h3>
                    <p className="text-[10px] text-slate-500 leading-tight">Stage: Interview Call. Scheduled for July 12th.</p>
                  </div>
                  <div className="space-y-1.5 mt-3">
                    <div className="flex justify-between items-center bg-slate-950 border border-slate-900 rounded p-1.5 text-[9px]">
                      <span className="text-slate-300 font-medium">System Design Prep</span>
                      <span className="text-indigo-400 font-bold uppercase tracking-wider">High</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-950 border border-slate-900 rounded p-1.5 text-[9px]">
                      <span className="text-slate-300 font-medium">Behavioral Prep</span>
                      <span className="text-emerald-400 font-bold uppercase tracking-wider">Done</span>
                    </div>
                  </div>
                </div>

                {/* Todo List Column */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-2">
                      <CheckSquare className="w-3.5 h-3.5" /> PROJECTS
                    </div>
                    <h3 className="font-bold text-sm text-slate-200 mb-1">Team Launch Checklist</h3>
                    <p className="text-[10px] text-slate-500 leading-tight">Completed: 3/5 Tasks. Assigned: 4 members.</p>
                  </div>
                  <div className="space-y-1.5 mt-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-[7px] text-white">✓</span>
                      <span className="line-through opacity-50">Database migration</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-300">
                      <span className="w-3 h-3 rounded border border-slate-700 flex items-center justify-center text-[7px]" />
                      <span>Setup Clerk Authentication</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            One workspace, infinite workflows
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Why pay for three different subscriptions? ChullSheet unifies your notes, habit logs, applications, and task boards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group rounded-2xl border border-slate-900 bg-slate-900/20 p-6 hover:border-indigo-500/30 hover:bg-slate-900/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-bold text-lg text-slate-200 mb-2">Habit Grid Heatmap</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Track your daily practices in a spreadsheet layout. Celebrate consistency with a GitHub-style 365-day contributions grid showing daily completion density.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group rounded-2xl border border-slate-900 bg-slate-900/20 p-6 hover:border-indigo-500/30 hover:bg-slate-900/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-bold text-lg text-slate-200 mb-2">Job Application Board</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A Kanban stage board for managing job applications. Attach recruiter emails, links, salary expectations, and write custom preparation Q&As with auto-save.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group rounded-2xl border border-slate-900 bg-slate-900/20 p-6 hover:border-indigo-500/30 hover:bg-slate-900/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <CheckSquare className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="font-bold text-lg text-slate-200 mb-2">Personal & Team Todos</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Organize personal goals, or create collaborative team spaces with member roles, task assignments, activity logs, real-time comment threads, and alerts.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing / Plan Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Simple, developer-friendly pricing
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Start for free and upgrade when your team scales. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Plan 1 */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-300 mb-1">Developer Starter</h3>
              <p className="text-xs text-slate-500 mb-6">For single developers getting organized.</p>
              <div className="text-3xl font-extrabold text-slate-100 mb-6">
                $0 <span className="text-xs font-normal text-slate-500">/ forever</span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-400 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 5 Documents</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Basic Habit Tracking Grid</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Kanban Job Tracker Board</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Personal Todo List</li>
              </ul>
            </div>
            <SignUpButton mode="modal">
              <button className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all cursor-pointer">
                Get Started Free
              </button>
            </SignUpButton>
          </div>

          {/* Plan 2 */}
          <div className="rounded-2xl border-2 border-indigo-600 bg-slate-900/30 p-8 flex flex-col justify-between relative shadow-xl shadow-indigo-600/5">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-md">
              Most Popular
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-200 mb-1">Pro Builder</h3>
              <p className="text-xs text-slate-500 mb-6">For high performers managing multiple projects.</p>
              <div className="text-3xl font-extrabold text-slate-100 mb-6">
                $8 <span className="text-xs font-normal text-slate-500">/ month</span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited AI Documents</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Habit Grid + 365-day Heatmap</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dynamic Recruiter QA Editor</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Priority Todo Sorting & Boards</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> AI Autopilot assistant (200 reqs/mo)</li>
              </ul>
            </div>
            <SignUpButton mode="modal">
              <button className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-lg shadow-indigo-600/10 transition-all cursor-pointer">
                Go Pro Now
              </button>
            </SignUpButton>
          </div>

          {/* Plan 3 */}
          <div className="rounded-2xl border border-slate-900 bg-slate-900/10 p-8 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-lg text-slate-300 mb-1">Collaborative Team</h3>
              <p className="text-xs text-slate-500 mb-6">For study groups or startup teams.</p>
              <div className="text-3xl font-extrabold text-slate-100 mb-6">
                $19 <span className="text-xs font-normal text-slate-500">/ month</span>
              </div>
              <ul className="space-y-3.5 text-xs text-slate-400 mb-8">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Everything in Pro</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated Team workspaces</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Real-time multiplayer todos</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Collaborative comment threads</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited team members</li>
              </ul>
            </div>
            <SignUpButton mode="modal">
              <button className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 transition-all cursor-pointer">
                Create Team Account
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>
    </div>
  );
}
