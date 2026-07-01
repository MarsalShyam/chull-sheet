import React from "react";
import { CheckSquare, ListTodo, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";

export default function TodoListProductPage() {
  return (
    <div className="bg-black text-slate-100 min-h-screen relative overflow-hidden py-16 md:py-24">
      {/* Background radial effects */}
      {/* <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" /> */}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Product features</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Personal & Team Todo Lists
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Your tasks, our priority. Track private personal tasks, organize checklists, or coordinate collaboratively with your team in real time.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <ListTodo className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">Personal Tasks Workspace</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Create tasks, organize subtasks (checklists), assign priority levels (Low, Medium, High), and add descriptions with clean date selectors.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30">
            <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4">
              <Users className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-slate-200 mb-2">Team Todo Boards</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Collaborate in real time using Firebase synchronizations. Create shared teams, assign tasks to members, leave comments, and track history.
            </p>
          </div>
        </div>

        {/* Details Checklist */}
        <div className="border-t border-slate-900 pt-16 mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Engineered for focus and collaboration</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Flexible Board, List & Calendar Views</h4>
                <p className="text-xs text-slate-400 mt-0.5">Toggle layouts smoothly. Sort tasks by due date or priority level to optimize your attention span.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Real-time Comments and History</h4>
                <p className="text-xs text-slate-400 mt-0.5">Discuss details directly inside task panels and monitor the activity timeline feed to see what has changed.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-200 text-sm">Drag & Drop Kanban Workspace</h4>
                <p className="text-xs text-slate-400 mt-0.5">Move team tasks seamlessly from Todo to In Progress, Review, and Completed columns.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-2xl border-2 bg-zinc-950 p-8 text-center relative overflow-hidden">
          {/* <div className="absolute inset-0 bg-indigo-500/5 blur-3xl pointer-events-none" /> */}
          <h3 className="text-xl font-bold mb-2">Get organized today.</h3>
          <p className="text-xs text-slate-400 mb-6 max-w-md mx-auto">Build personal systems or invite your colleagues to a shared workspace.</p>
          <SignUpButton mode="modal">
            <button className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white hover:bg-zinc-300 text-base font-medium text-black cursor-pointer">
              Launch Todo Workspace <ArrowRight className="w-4 h-4" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </div>
  );
}
