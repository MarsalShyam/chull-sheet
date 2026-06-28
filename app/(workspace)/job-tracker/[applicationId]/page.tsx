"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useJobTracker } from "@/lib/hooks/useJobTracker";
import { jobTrackerRepository } from "@/lib/repositories";
import { JobApplication, JobStage, QAItem } from "@/lib/repositories/interfaces";
import { 
  ArrowLeft, 
  Loader2, 
  Plus, 
  Trash2, 
  ExternalLink, 
  CloudLightning,
  User,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

export default function ApplicationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  
  const applicationId = params.applicationId as string;
  
  const { deleteApplication } = useJobTracker(user?.id);
  const [app, setApp] = useState<JobApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch application detail directly
  useEffect(() => {
    async function fetchApp() {
      if (!user?.id || !applicationId) return;
      try {
        setLoading(true);
        const data = await jobTrackerRepository.getApplication(user.id, applicationId);
        if (data) {
          setApp(data);
        } else {
          toast.error("Application not found.");
          router.push("/job-tracker");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load details.");
      } finally {
        setLoading(false);
      }
    }
    fetchApp();
  }, [user?.id, applicationId, router]);

  const handleFieldChange = async <K extends keyof JobApplication>(fieldName: K, value: JobApplication[K]) => {
    if (!user?.id || !app) return;
    
    // Update local state first
    const updatedApp = { ...app, [fieldName]: value, updatedAt: new Date() };
    setApp(updatedApp);

    try {
      setSaving(true);
      await jobTrackerRepository.updateApplication(user.id, app.id, { [fieldName]: value });
    } catch (err) {
      console.error(err);
      toast.error("Failed to auto-save field.");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateQA = async (updatedQuestions: QAItem[]) => {
    if (!user?.id || !app) return;

    setApp((prev) => prev ? { ...prev, questions: updatedQuestions } : null);

    try {
      setSaving(true);
      await jobTrackerRepository.updateApplication(user.id, app.id, { questions: updatedQuestions });
    } catch (err) {
      console.error(err);
      toast.error("Failed to save Q&A item.");
    } finally {
      setSaving(false);
    }
  };

  const handleAddQAItem = () => {
    if (!app) return;
    const newItem: QAItem = {
      id: Math.random().toString(36).substring(2, 9),
      question: "",
      answer: "",
    };
    handleUpdateQA([...app.questions, newItem]);
  };

  const handleQAChange = (index: number, key: "question" | "answer", val: string) => {
    if (!app) return;
    const updated = [...app.questions];
    updated[index] = { ...updated[index], [key]: val };
    
    // Update state locally
    setApp({ ...app, questions: updated });
  };

  // Trigger save on Q&A fields onBlur
  const handleQABlur = () => {
    if (app) {
      handleUpdateQA(app.questions);
    }
  };

  const handleRemoveQAItem = (id: string) => {
    if (!app) return;
    const updated = app.questions.filter((q) => q.id !== id);
    handleUpdateQA(updated);
  };

  const handleDelete = async () => {
    if (!app) return;
    if (confirm("Are you sure you want to delete this job application pipeline?")) {
      await deleteApplication(app.id);
      router.push("/job-tracker");
    }
  };

  const STAGES: JobStage[] = ["To Apply", "Applied", "Interview Call", "No Answer", "Offer", "Rejected"];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-slate-400 text-xs">Loading prep guide...</p>
        </div>
      </div>
    );
  }

  if (!app) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      {/* Top action bar */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <button
          onClick={() => router.push("/job-tracker")}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Tracker
        </button>

        <div className="flex items-center space-x-3">
          <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                <span>Auto-saving...</span>
              </>
            ) : (
              <>
                <CloudLightning className="w-3.5 h-3.5 text-emerald-500" />
                <span>Saved to cloud</span>
              </>
            )}
          </div>
          <button
            onClick={handleDelete}
            className="p-2 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            title="Delete Application"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Notion-style header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <input
              type="text"
              value={app.companyName}
              onChange={(e) => handleFieldChange("companyName", e.target.value)}
              placeholder="Company Name"
              className="text-3xl font-black text-slate-900 tracking-tight bg-transparent w-full border-0 focus:outline-none focus:ring-0 p-0 hover:bg-slate-100/50 rounded px-1 -ml-1"
            />
            <input
              type="text"
              value={app.position}
              onChange={(e) => handleFieldChange("position", e.target.value)}
              placeholder="e.g. Senior Frontend Engineer"
              className="text-slate-500 text-sm font-semibold bg-transparent w-full border-0 focus:outline-none focus:ring-0 p-0 hover:bg-slate-100/50 rounded px-1 -ml-1"
            />
          </div>

          <div className="flex flex-col items-end shrink-0">
            <span className="text-[9px] uppercase font-bold text-slate-400 mb-1.5">Job Stage</span>
            <select
              value={app.stage}
              onChange={(e) => handleFieldChange("stage", e.target.value as JobStage)}
              className="bg-slate-100 border border-slate-200/80 rounded px-3 py-1.5 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Info Grid (Company Links, Recruiting Contacts) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Position Details</h3>
            
            <div className="space-y-3">
              <div className="flex items-center text-xs">
                <span className="w-24 text-slate-400 font-semibold flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" /> Post Link
                </span>
                <input
                  type="url"
                  placeholder="Paste URL..."
                  value={app.link || ""}
                  onChange={(e) => setApp({ ...app, link: e.target.value })}
                  onBlur={() => handleFieldChange("link", app.link)}
                  className="flex-1 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none py-0.5 text-indigo-650"
                />
              </div>

              <div className="flex items-center text-xs">
                <span className="w-24 text-slate-400 font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Location
                </span>
                <input
                  type="text"
                  placeholder="e.g. Remote..."
                  value={app.location || ""}
                  onChange={(e) => setApp({ ...app, location: e.target.value })}
                  onBlur={() => handleFieldChange("location", app.location)}
                  className="flex-1 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none py-0.5 text-slate-700"
                />
              </div>

              <div className="flex items-center text-xs">
                <span className="w-24 text-slate-400 font-semibold flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> Salary
                </span>
                <input
                  type="text"
                  placeholder="e.g. $140,000..."
                  value={app.salary || ""}
                  onChange={(e) => setApp({ ...app, salary: e.target.value })}
                  onBlur={() => handleFieldChange("salary", app.salary)}
                  className="flex-1 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none py-0.5 text-slate-700"
                />
              </div>

              <div className="flex items-center text-xs">
                <span className="w-24 text-slate-400 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Applied
                </span>
                <input
                  type="date"
                  value={app.dateApplied || ""}
                  onChange={(e) => handleFieldChange("dateApplied", e.target.value)}
                  className="flex-1 bg-transparent border-0 focus:outline-none p-0 text-slate-750"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Recruiting Contact</h3>

            <div className="space-y-3">
              <div className="flex items-center text-xs">
                <span className="w-24 text-slate-400 font-semibold flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Contact
                </span>
                <input
                  type="text"
                  placeholder="Recruiter name..."
                  value={app.recruiterName || ""}
                  onChange={(e) => setApp({ ...app, recruiterName: e.target.value })}
                  onBlur={() => handleFieldChange("recruiterName", app.recruiterName)}
                  className="flex-1 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none py-0.5 text-slate-700"
                />
              </div>

              <div className="flex items-center text-xs">
                <span className="w-24 text-slate-400 font-semibold flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email
                </span>
                <input
                  type="email"
                  placeholder="Recruiter email..."
                  value={app.recruiterEmail || ""}
                  onChange={(e) => setApp({ ...app, recruiterEmail: e.target.value })}
                  onBlur={() => handleFieldChange("recruiterEmail", app.recruiterEmail)}
                  className="flex-1 bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-500 focus:outline-none py-0.5 text-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notion-Style interview prep Q&A list */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            Interview Preparation Guide
          </h2>
          <button
            onClick={handleAddQAItem}
            className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-500 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add QA Item
          </button>
        </div>

        {app.questions.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 border border-slate-200/60 border-dashed rounded-xl text-slate-400 text-xs font-semibold">
            No preparation questions added yet. Outline company questions and target answers.
          </div>
        ) : (
          <div className="space-y-4">
            {app.questions.map((q, idx) => (
              <div 
                key={q.id} 
                className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm hover:border-slate-350 transition-all relative group"
              >
                <button
                  onClick={() => handleRemoveQAItem(q.id)}
                  className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>

                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-extrabold text-indigo-500 mt-1 uppercase select-none">Q:</span>
                    <input
                      type="text"
                      placeholder="e.g. Why do you want to join Vercel?"
                      value={q.question}
                      onChange={(e) => handleQAChange(idx, "question", e.target.value)}
                      onBlur={handleQABlur}
                      className="w-full text-xs font-bold text-slate-800 bg-transparent border-0 focus:outline-none p-0 focus:ring-0"
                    />
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-100">
                    <span className="text-[10px] font-extrabold text-indigo-500 mt-1 uppercase select-none">A:</span>
                    <textarea
                      placeholder="Type your structured target answer..."
                      value={q.answer}
                      onChange={(e) => handleQAChange(idx, "answer", e.target.value)}
                      onBlur={handleQABlur}
                      className="w-full text-xs text-slate-655 bg-transparent border-0 focus:outline-none p-0 focus:ring-0 min-h-[50px] resize-y"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
