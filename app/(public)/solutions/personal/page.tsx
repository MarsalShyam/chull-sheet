import React from "react";
import { User, Sparkles, Flame, ArrowRight, CheckCircle2 } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function PersonalSolutionPage() {
  return (
    <div className="bg-black text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* Background radial effects */}
      {/* <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" /> */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <User className="w-3.5 h-3.5" />
            <span>Personal Productivity</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Organize Your Daily Life
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            A premium, clean interface designed to manage your thoughts, track daily habits, coordinate personal todos, and follow up on targets.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <Flame className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">Build Better Habits</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Log daily workouts, hydration, read times, or coding practices using a simple, spreadsheet-like contribution grid.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">Notion-Style Personal Notes</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Create beautiful Markdown-backed document journals, read lists, or dream logs with auto-saving capabilities.
            </p>
          </div>
        </div>

        {/* Details Checklist */}
        <div className="border-t border-slate-900 pt-16 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Your private growth hub</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Flexible Todo Lists</h4>
                <p className="text-xs text-slate-400 mt-0.5">Filter tasks by priority, status, or due date. Toggle between list and board views easily.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Completely Private</h4>
                <p className="text-xs text-slate-400 mt-0.5">Your personal data is tied securely to your Clerk user account. No cross-room leaks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border-2 bg-zinc-950 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
          <h3 className="text-xl font-bold mb-2">Unleash your productivity.</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">Create your own private dashboard and keep your thoughts organized.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-300 text-base font-medium text-black cursor-pointer">
              Start Free Today <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
