import { Sparkles, BookOpen, Clock, Lightbulb } from "lucide-react";
import NewDocumentButton from "@/components/NewDocumentButton";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      {/* Visual Header */}
      <div className="w-20 h-20 rounded-2xl bg-indigo-600/10 flex items-center justify-center mb-6 animate-pulse">
        <Sparkles className="w-10 h-10 text-indigo-600" />
      </div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
        Welcome to your ChullSheet Workspace
      </h1>
      
      <p className="text-slate-500 max-w-md text-base md:text-lg mb-8 font-medium">
        Manage your habits, track job applications, outline your personal or team todos, or start writing collaborative AI-powered docs.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        <div className="bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all shadow-md">
          <NewDocumentButton />
        </div>
      </div>

      {/* Feature quick tour / tips cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-sm text-left hover:border-indigo-200 hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
            <Clock className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-1.5">Habit Tracking</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Build consistency with our spreadsheet-style habit grid and track your 365-day streaks.
          </p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-sm text-left hover:border-indigo-200 hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-1.5">Job Tracker Board</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Keep tabs on your career journey with a Kanban-board applicant tracking system.
          </p>
        </div>

        <div className="p-5 bg-white rounded-xl border border-slate-200/80 shadow-sm text-left hover:border-indigo-200 hover:shadow-md transition-all duration-200">
          <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-bold text-slate-800 text-base mb-1.5">Todo Management</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Organize personal tasks or collaborate with team members in real-time.
          </p>
        </div>
      </div>
    </div>
  );
}
