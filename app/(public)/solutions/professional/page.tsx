import React from "react";
import { Briefcase, FileText, CheckSquare, ArrowRight, CheckCircle2 } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function ProfessionalSolutionPage() {
  return (
    <div className="bg-black text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* Background radial effects */}
      {/* <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" /> */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Professional Solutions</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Designed for High Performers & Professionals
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Organize career paths, manage complex projects, track recruiter relationships, and leverage AI to build professional systems efficiently.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <CheckSquare className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">Job Application Pipeline</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Log interviews, track salary offers, and prepare custom notes in a Kanban Stage board to master your hiring pipeline.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <FileText className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">AI Document Generator</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Auto-generate drafts, translate content, and write clean meeting summaries with integrated AI capabilities in your rich text editor.
            </p>
          </div>
        </div>

        {/* Details Checklist */}
        <div className="border-t border-slate-900 pt-16 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Optimize your career path</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Professional Team Management</h4>
                <p className="text-xs text-slate-400 mt-0.5">Assign roles (Owner, Admin, Member) to control task editing rights inside collaborative team todos.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Real-time Cloud Backups</h4>
                <p className="text-xs text-slate-400 mt-0.5">Never lose information. Securely backed up on encrypted Firebase databases instantly.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border-2 bg-zinc-950 p-8 text-center relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" /> */}
          <h3 className="text-xl font-bold mb-2">Level up your workflow.</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">Create beautiful documents, coordinate tasks, and tracking goals professionally.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-300 text-base font-medium text-black cursor-pointer">
              Launch Workspace Now <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
