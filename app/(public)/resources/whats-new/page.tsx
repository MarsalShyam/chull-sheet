import React from "react";
import { Sparkles, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function WhatsNewPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Product Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            What's New in ChullSheet
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Stay up to date with new features, visual improvements, and core enhancements we ship to elevate your productivity.
          </p>
        </div>

        {/* Updates list */}
        <div className="space-y-12 mb-16">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5" /> June 2026
            </span>
            <h3 className="font-bold text-slate-200 text-lg mb-2">Introducing ChullSheet 2.0</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              We've evolved from a collaborative document editor into a complete Notion-like productivity platform. Track daily habits, manage job application kanban columns, and collaborate on team todos seamlessly.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1.5 mb-2">
              <Calendar className="w-3.5 h-3.5" /> May 2026
            </span>
            <h3 className="font-bold text-slate-200 text-lg mb-2">Real-Time Team Todos & Comments</h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Coordinate team task boards with live Firestore synchronizations, task assignments, activity history feeds, and granular comment threads.
            </p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border-2 border-indigo-600/30 bg-slate-900/20 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
          <h3 className="text-xl font-bold mb-2">Start building consistency today.</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">Register for free and experience the next generation productivity workspace.</p>
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
