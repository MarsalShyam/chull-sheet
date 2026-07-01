import React from "react";
import { Terminal, Shield, Key, Cpu, ArrowRight } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function DevelopersApiPage() {
  return (
    <div className="bg-black text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" /> */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <Terminal className="w-3.5 h-3.5" />
            <span>Developer API Docs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Integrate ChullSheet programmatically
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Use the ChullSheet API to trigger habits completion status, push custom tasks, retrieve board metrics, or synch data into external platforms.
          </p>
        </div>

        {/* Code Block Presentation */}
        <div className="rounded-xl border border-slate-800 bg-zinc-950 p-5 mb-16 font-mono text-xs overflow-x-auto text-slate-300">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-slate-500">
            <span>GET /api/v1/habits</span>
            <span className="text-indigo-400">cURL</span>
          </div>
          <pre>{`curl -X GET "https://api.chullsheet.com/v1/habits" \\
  -H "Authorization: Bearer cl_sk_live_..." \\
  -H "Content-Type: application/json"`}</pre>
          <div className="mt-4 pt-4 border-t border-slate-800 text-slate-500">Response</div>
          <pre className="mt-2 text-indigo-300">{`{
  "success": true,
  "data": [
    { "id": "hb_09827", "name": "LeetCode Daily", "color": "emerald", "streak": 18 },
    { "id": "hb_87239", "name": "System Design Prep", "color": "indigo", "streak": 5 }
  ]
}`}</pre>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="p-6 rounded-xl border border-slate-900 bg-zinc-950">
            <Shield className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold text-slate-200 text-base mb-1.5">OAuth & API Keys</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Secure integrations using Clerk credentials and custom scopes for read/write access controls.</p>
          </div>
          <div className="p-6 rounded-xl border border-slate-900 bg-zinc-950">
            <Key className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold text-slate-200 text-base mb-1.5">Webhooks Support</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Get notified in real-time when team tasks are completed, or when habits streaks are updated.</p>
          </div>
          <div className="p-6 rounded-xl border border-slate-900 bg-zinc-950">
            <Cpu className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="font-bold text-slate-200 text-base mb-1.5">SDK Libraries</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Official packages for Javascript, Python, and Go are available for faster integration.</p>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border  bg-zinc-950 p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Build with ChullSheet</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">Access extensive API tutorials and sandbox environments for testing your integrations.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-300 text-base font-medium text-black cursor-pointer">
              Generate API Key <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
