import React from "react";
import { MessageSquare, Quote, ArrowRight } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function CustomerStoriesPage() {
  return (
    <div className="bg-black text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* Background radial effects */}
      {/* <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" /> */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Customer Stories</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Loved by Developers & Builders
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Read how high performers, students, and engineers organize their daily goals, habits, and application pipelines using ChullSheet.
          </p>
        </div>

        {/* Stories list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 flex flex-col justify-between">
            <div>
              <Quote className="w-8 h-8 text-indigo-500/40 mb-4" />
              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                "ChullSheet consolidated my study group's documentation. We write project guides collectively on the block editor and track coursework todos in the team boards. It is unbelievably fast."
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-xs">Aria Chen</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Computer Science Major, Stanford</p>
            </div>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 flex flex-col justify-between">
            <div>
              <Quote className="w-8 h-8 text-indigo-500/40 mb-4" />
              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                "The Job Tracker is essentially a mini ATS. I managed my entire recruitment pipeline, stored custom preparation answers, and tracked streaks for LeetCode all in one dark-themed hub."
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-200 text-xs">James Miller</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Software Engineer, Austin</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border-2 bg-zinc-950 p-8 text-center relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" /> */}
          <h3 className="text-xl font-bold mb-2">Build your success story.</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">Track habits, collaborate, and land offers securely.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-300 text-base font-medium text-black cursor-pointer">
              Launch ChullSheet <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
