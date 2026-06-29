"use client";

import React, { useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useJobTracker } from "@/lib/hooks/useJobTracker";
import StageBoard from "@/components/job-tracker/StageBoard";
import ApplicationTable from "@/components/job-tracker/ApplicationTable";
import { JobStage, QAItem } from "@/lib/repositories/interfaces";
import {
  Briefcase,
  Plus,
  Kanban,
  List,
  TrendingUp,
  CalendarRange,
  Award,
  Loader2,
  X,
  CircleDot
} from "lucide-react";

export default function JobTrackerPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const {
    applications,
    loading,
    addApplication,
    deleteApplication,
    moveApplicationStage,
  } = useJobTracker(user?.id);

  // Tabs state
  const [activeTab, setActiveTab] = useState<"board" | "list">("board");

  // Dialog State
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form Fields State
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [link, setLink] = useState("");
  const [stage, setStage] = useState<JobStage>("To Apply");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [recruiterName, setRecruiterName] = useState("");
  const [recruiterEmail, setRecruiterEmail] = useState("");
  const [dateApplied, setDateApplied] = useState("");

  // Dynamic QA Field State
  const [questions, setQuestions] = useState<QAItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");

  const handleAddQuestion = () => {
    if (currentQuestion.trim() && currentAnswer.trim()) {
      setQuestions((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          question: currentQuestion.trim(),
          answer: currentAnswer.trim(),
        },
      ]);
      setCurrentQuestion("");
      setCurrentAnswer("");
    }
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName.trim() && position.trim()) {
      await addApplication({
        companyName: companyName.trim(),
        position: position.trim(),
        link: link.trim(),
        stage,
        location: location.trim(),
        salary: salary.trim(),
        recruiterName: recruiterName.trim(),
        recruiterEmail: recruiterEmail.trim(),
        dateApplied: dateApplied || new Date().toISOString().split("T")[0],
        questions,
      });

      // Reset Form
      setCompanyName("");
      setPosition("");
      setLink("");
      setStage("To Apply");
      setLocation("");
      setSalary("");
      setRecruiterName("");
      setRecruiterEmail("");
      setDateApplied("");
      setQuestions([]);
      setIsAddOpen(false);
    }
  };

  // Metrics summary
  const metrics = useMemo(() => {
    const total = applications.length;
    const interviews = applications.filter((app) => app.stage === "Interview Call").length;
    const offers = applications.filter((app) => app.stage === "Offer").length;

    return { total, interviews, offers };
  }, [applications]);

  const STAGES: JobStage[] = ["To Apply", "Applied", "Interview Call", "No Answer", "Offer", "Rejected"];

  if (!isUserLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-slate-400 text-xs">Loading Job board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            {/* <Briefcase className="w-6 h-6 text-indigo-600" /> */}
            Job Application Tracker
          </h1>
          <p className="text-gray-500 text-xs md:text-sm mt-1 flex flex-col md:flex-row items-center justify-center">
            Stay structured in your job hunt<span className="hidden md:inline">, manage timelines, and build company-specific preparation guides.</span>
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-gray-300 text-xs font-semibold text-black shadow-md active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Application
        </button>
      </div>

      {/* Add Application Overlay Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-black border border-zinc-800 rounded-xl max-w-lg w-full p-6 shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsAddOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-gray-100 mb-4">Track Job Application</h3>

            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google, Vercel"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-300 mb-1">
                    Position *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Frontend Engineer"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-300 mb-1">
                    Job Listing Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-300 mb-1">
                    Stage
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value as JobStage)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500 cursor-pointer"
                  >
                    {STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Patna (Hybrid)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-300 mb-1">
                    Expected Salary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹15LPA"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-300 mb-1">
                    Recruiter Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Shyam Kumar"
                    value={recruiterName}
                    onChange={(e) => setRecruiterName(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-300 mb-1">
                    Recruiter Email
                  </label>
                  <input
                    type="email"
                    placeholder="recruiter@company.com"
                    value={recruiterEmail}
                    onChange={(e) => setRecruiterEmail(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-300 mb-1">
                  Date Applied
                </label>
                <input
                  type="date"
                  value={dateApplied}
                  onChange={(e) => setDateApplied(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500 [color-scheme:dark]"
                />
              </div>

              {/* QA List section */}
              <div className="border-t border-zinc-800 pt-4 space-y-3">
                <h4 className="text-xs font-bold text-zinc-300">Preparation Q&A Questions</h4>

                {questions.length > 0 && (
                  <div className="space-y-2 bg-black p-3 rounded-lg border border-zinc-800">
                    {questions.map((q) => (
                      <div key={q.id} className="flex justify-between items-start text-[11px] border-b border-zinc-800 pb-1.5 last:border-0 last:pb-0">
                        <div>
                          <p className="font-bold text-zinc-300">Q: {q.question}</p>
                          <p className="text-zinc-400 mt-0.5">A: {q.answer}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveQuestion(q.id)}
                          className="text-rose-400 hover:text-rose-300 p-0.5 shrink-0 cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Add target question..."
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500"
                  />
                  <textarea
                    placeholder="Add target answer or notes..."
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none focus:border-zinc-500 h-16 resize-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="px-3 py-2 flex justify-center gap-2 items-center rounded-lg bg-black border border-zinc-800 hover:bg-zinc-900/60 text-xs font-semibold text-zinc-400 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add QA
                  </button>
                </div>
              </div>              <div className="flex justify-end gap-2.5 pt-4 border-t border-zinc-800/60">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-lg bg-black border border-zinc-800 hover:bg-zinc-900/60 text-xs font-semibold text-zinc-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-white hover:bg-zinc-300 text-xs font-semibold text-black cursor-pointer"
                >
                  Create Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Toggles & Content Container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800/40 pb-3">
          {/* Toggles */}
          <div className="flex bg-zinc-900/65 border border-zinc-800/80 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("board")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${activeTab === "board"
                ? "bg-zinc-850 text-zinc-100 shadow-md border border-zinc-750/30"
                : "text-zinc-400 hover:text-zinc-250 hover:bg-zinc-900/30"
                }`}
            >
              <Kanban className="w-3.5 h-3.5" /> Stage Board
            </button>
            <button
              onClick={() => setActiveTab("list")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold cursor-pointer transition-all ${activeTab === "list"
                ? "bg-zinc-850 text-zinc-100 shadow-md border border-zinc-750/30"
                : "text-zinc-400 hover:text-zinc-250 hover:bg-zinc-900/30"
                }`}
            >
              <List className="w-3.5 h-3.5" /> All Applications
            </button>
          </div>
          <div className="text-[10px] text-zinc-500 font-semibold flex items-center gap-1">
            <CircleDot className="w-3 h-3 text-green-400 animate-pulse" /> Live Synchronization
          </div>
        </div>

        {/* Dynamic Display */}
        {activeTab === "board" ? (
          <StageBoard
            applications={applications}
            onMoveStage={moveApplicationStage}
          />
        ) : (
          <ApplicationTable
            applications={applications}
            onDelete={deleteApplication}
            onUpdateStage={moveApplicationStage}
          />
        )}
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 bg-card border border-zinc-800/80 rounded-xl shadow-md flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-zinc-500/10 flex items-center justify-center text-zinc-400 border border-zinc-500/20 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Active pipelines</span>
            <h3 className="text-xl font-bold text-zinc-200">{metrics.total} Jobs</h3>
          </div>
        </div>

        <div className="p-5 bg-card border border-zinc-800/80 rounded-xl shadow-md flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-zinc-500/10 flex items-center justify-center text-zinc-400 border border-zinc-500/20 shrink-0">
            <CalendarRange className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Interviews Scheduled</span>
            <h3 className="text-xl font-bold text-zinc-200">{metrics.interviews} Active</h3>
          </div>
        </div>

        <div className="p-5 bg-card border border-zinc-800/80 rounded-xl shadow-md flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-zinc-500/10 flex items-center justify-center text-zinc-400 border border-zinc-500/20 shrink-0">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Offers Received</span>
            <h3 className="text-xl font-bold text-zinc-200">{metrics.offers} Secured</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
