import React from "react";
import { Code, Terminal, Zap, GitBranch, ArrowRight } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function DevelopersSolutionPage() {
  return (
    <div className="bg-black text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" /> */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <Code className="w-3.5 h-3.5" />
            <span>Developer solutions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Built for High-Velocity Developers
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Keep your engineering goals, code design notes, job search pipelines, and daily algorithm streaks in one unified place.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900/20">
            <Terminal className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold text-slate-200 text-base mb-1.5">LeetCode & Habits</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Log coding practices and system design review habits every day using our responsive grids.</p>
          </div>
          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900/20">
            <GitBranch className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold text-slate-200 text-base mb-1.5">Sprint Kanban Board</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Map out side project development roadmaps, milestones, and daily tasks in personal or team todo groups.</p>
          </div>
          <div className="p-6 rounded-xl border border-slate-900 bg-slate-900/20">
            <Zap className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold text-slate-200 text-base mb-1.5">Markdown Docs</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Draft architecture decisions, technical RFCs, or API documentations using rich blocks.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border bg-zinc-950 p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Upgrade your productivity system</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">ChullSheet integrates all essential dev tracking utilities in a single, high-fidelity tab.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-300 text-base font-medium text-black cursor-pointer">
              Get Started for Free <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
