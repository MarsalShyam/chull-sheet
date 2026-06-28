import React from "react";
import { GraduationCap, BookOpen, Clock, Heart, ArrowRight } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function StudentsSolutionPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Student solutions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Succeed in Academics & Internships
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Organize study schedules, track semester revision habits, manage internship application pipelines, and collaborate on group project assignments.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900/20">
            <BookOpen className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold text-slate-200 text-base mb-1.5">Lecture Notes</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Draft lectures, store code snippets, summarize concepts, and review them collaboratively with friends.</p>
          </div>
          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900/20">
            <Clock className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold text-slate-200 text-base mb-1.5">Study Habits</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Ensure daily revision goals, workout routines, and sleep trackers are checked off consistently.</p>
          </div>
          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900/20">
            <Heart className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold text-slate-200 text-base mb-1.5">Internship Funnel</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Log target companies, interview callbacks, assignment dates, and salary figures on the Kanban board.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Study smarter. Track better.</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">ChullSheet provides students with a single, highly integrated dashboard to conquer their schedules.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white cursor-pointer">
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
