import React from "react";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function BlogPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            <span>ChullSheet Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Insights, Guides & Productivity Hacks
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Deep dives into workflow engineering, building habits that stick, and landing developer roles.
          </p>
        </div>

        {/* Blog list */}
        <div className="space-y-12 mb-16">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5" /> June 24, 2026
            </span>
            <h3 className="font-bold text-slate-200 text-lg mb-2">How to build a bulletproof habit loop</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Explore the psychological cues, routine definitions, and visual rewards that establish consistent streaks. Learn how a 365-day heatmap triggers dopamine loops that maintain daily disciplines.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5" /> June 10, 2026
            </span>
            <h3 className="font-bold text-slate-200 text-lg mb-2">Mastering the career search funnel</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Stop tracking jobs in messy spreadsheets. Organize applications on custom Kanban boards, track salary expectation metrics, and build interview preparation templates that land multiple offers.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border-2 border-indigo-600/30 bg-slate-900/20 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
          <h3 className="text-xl font-bold mb-2">Start your productivity journey.</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">Track habits, collaborate, and write docs securely for free.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white cursor-pointer">
              Launch ChullSheet <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
