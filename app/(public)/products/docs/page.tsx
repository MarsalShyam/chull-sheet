import React from "react";
import { FileText, Share2, Bot, ArrowRight, CheckCircle2 } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function DocsProductPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* Background radial effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <FileText className="w-3.5 h-3.5" />
            <span>Product features</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Collaborative AI Documents
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Experience writing like never before. Block-based rich text editor enhanced by deep AI integrations and live multiplayer presence.
          </p>
        </div>

        {/* Highlight details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <Bot className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">AI Copilot</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Auto-generate summaries, write draft paragraphs, brainstorm topics, and translate content right within your document block editor.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <Share2 className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">Real-Time Multiplayer</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Edit synchronously with your team. Live cursors, document state sync, and multiplayer block locks powered by Liveblocks.
            </p>
          </div>
        </div>

        {/* Feature Checkpoints */}
        <div className="border-t border-slate-900 pt-16 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">What makes ChullSheet Docs unique?</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Notion-Style Block Interface</h4>
                <p className="text-xs text-slate-400 mt-0.5">Simply type `/` to insert headers, bullet lists, code blocks, images, and embeds.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Autosave to Cloud</h4>
                <p className="text-xs text-slate-400 mt-0.5">Never lose a single character. All changes are streamed in real time to secure Firebase servers.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Markdown Support</h4>
                <p className="text-xs text-slate-400 mt-0.5">Easily import or export documents to raw Markdown file format.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border-2 border-indigo-600/30 bg-slate-900/20 p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" />
          <h3 className="text-xl font-bold mb-2">Ready to transform your notes?</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">Create beautiful documents, share with friends, and write with artificial intelligence.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white cursor-pointer">
              Create First Doc <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
