import React from "react";
import { Calendar, Flame, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function HabitsProductPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <Calendar className="w-3.5 h-3.5" />
            <span>Product features</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Habit Grid & Contribution Heatmap
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Build bulletproof consistency. Track daily streaks in a fast, spreadsheet-like interface and visualize progress using an elegant 365-day contributions map.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <Flame className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">365-Day Contribution Heatmap</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Celebrate your wins. View a GitHub-style grid representing habit completions over the past 365 days, complete with completion density tooltips.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">Spreadsheet Calendar Grid</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Log habits instantly. A smooth keyboard and mouse-friendly grid displaying dates as columns and habits as rows. Toggle completion status with a simple click.
            </p>
          </div>
        </div>

        {/* Details Checklist */}
        <div className="border-t border-slate-900 pt-16 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Track habits smarter</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Four Status Cycler</h4>
                <p className="text-xs text-slate-400 mt-0.5">Cycle through statuses: Not Marked → Completed → Skipped → Missed, giving you a detailed view of your productivity.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Drag & Drop Habits Reordering</h4>
                <p className="text-xs text-slate-400 mt-0.5">Prioritize habits by dragging rows up or down to align with your focus area.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Real-Time Optimistic Updates</h4>
                <p className="text-xs text-slate-400 mt-0.5">Toggle entries instantly on the UI while saving in the background. Smooth, stutter-free performance.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border-2 border-indigo-600/30 bg-slate-900/20 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
          <h3 className="text-xl font-bold mb-2">Build habits that stick.</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">Create daily rituals, track consistency, and unlock your true developer potential.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white cursor-pointer">
              Start Tracking Habits <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
