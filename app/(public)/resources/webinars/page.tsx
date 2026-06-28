import React from "react";
import { Video, Calendar, PlayCircle, ArrowRight } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function WebinarsPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <Video className="w-3.5 h-3.5" />
            <span>Webinars & Workshops</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Watch live streams & tutorials
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Learn how to use ChullSheet to optimize your workflows, track habits, and collaborate on documents effectively.
          </p>
        </div>

        {/* Webinars list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-indigo-400 flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5" /> July 15, 2026 (Upcoming)
              </span>
              <h3 className="font-bold text-slate-200 text-sm mb-2">Mastering multiplayer documents & AI</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Learn how to leverage Liveblocks and AI tools collaboratively to draft, translate, and review documents securely.
              </p>
            </div>
            <button className="w-full py-2 rounded-lg bg-indigo-650 hover:bg-indigo-600 text-xs font-bold transition-colors">
              Reserve Seat
            </button>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5 mb-2">
                <PlayCircle className="w-3.5 h-3.5" /> On Demand
              </span>
              <h3 className="font-bold text-slate-200 text-sm mb-2">Introduction to Habit trackers & heatmaps</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                A quick 15-minute walkthrough showing how to manage streak habits, reorder rows, and read statistics.
              </p>
            </div>
            <button className="w-full py-2 rounded-lg bg-slate-800 hover:bg-slate-750 text-xs font-bold transition-colors">
              Watch Recording
            </button>
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
