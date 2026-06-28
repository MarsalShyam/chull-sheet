"use client";

import React, { useState } from "react";
import { JobApplication, JobStage } from "@/lib/repositories/interfaces";
import Link from "next/link";
import { Calendar, MapPin, DollarSign, ExternalLink, ArrowRight } from "lucide-react";

interface StageBoardProps {
  applications: JobApplication[];
  onMoveStage: (appId: string, nextStage: JobStage) => void;
}

const STAGES: JobStage[] = ["To Apply", "Applied", "Interview Call", "No Answer", "Offer", "Rejected"];

export default function StageBoard({ applications, onMoveStage }: StageBoardProps) {
  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);

  // Group applications by stage
  const groupedApps = React.useMemo(() => {
    const groups: Record<JobStage, JobApplication[]> = {
      "To Apply": [],
      "Applied": [],
      "Interview Call": [],
      "No Answer": [],
      "Offer": [],
      "Rejected": [],
    };
    applications.forEach((app) => {
      if (groups[app.stage]) {
        groups[app.stage].push(app);
      }
    });
    return groups;
  }, [applications]);

  const handleDragStart = (e: React.DragEvent, appId: string) => {
    setDraggedAppId(appId);
    e.dataTransfer.setData("text/plain", appId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStage: JobStage) => {
    e.preventDefault();
    const appId = e.dataTransfer.getData("text/plain") || draggedAppId;
    if (appId) {
      onMoveStage(appId, targetStage);
    }
    setDraggedAppId(null);
  };

  // Color mappings for stages headers
  const stageHeaderColors: Record<JobStage, string> = {
    "To Apply": "bg-slate-100 text-slate-700 border-slate-300/80 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800",
    "Applied": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30",
    "Interview Call": "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30",
    "No Answer": "bg-amber-50 text-amber-750 border-amber-250 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/30",
    "Offer": "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
    "Rejected": "bg-rose-50 text-rose-700 border-rose-250 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-900/30",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start select-none overflow-x-auto pb-4">
      {STAGES.map((stage) => {
        const stageApps = groupedApps[stage] || [];
        return (
          <div
            key={stage}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage)}
            className="flex flex-col bg-slate-100/50 border border-slate-200/60 rounded-xl p-3 min-h-[450px] shrink-0"
          >
            {/* Header Column */}
            <div className={`flex items-center justify-between border px-2.5 py-1.5 rounded-lg text-xs font-bold mb-3 shadow-sm ${stageHeaderColors[stage]}`}>
              <span className="truncate">{stage}</span>
              <span className="bg-white/90 dark:bg-slate-950/50 px-2 py-0.5 rounded text-[10px]">
                {stageApps.length}
              </span>
            </div>

            {/* Application Cards */}
            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
              {stageApps.length === 0 ? (
                <div className="h-full border border-dashed border-slate-200/80 rounded-lg flex items-center justify-center p-6 text-slate-400 text-[10px] text-center">
                  Drag here
                </div>
              ) : (
                stageApps.map((app) => (
                  <div
                    key={app.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, app.id)}
                    className="group bg-white border border-slate-200 hover:border-indigo-400 p-3 rounded-lg shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all duration-200 relative overflow-hidden"
                  >
                    {/* Left color bar */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      stage === "Offer" ? "bg-emerald-500" :
                      stage === "Rejected" ? "bg-rose-500" :
                      stage === "Interview Call" ? "bg-indigo-500" :
                      "bg-slate-300"
                    }`} />

                    <div className="pl-1">
                      <div className="flex justify-between items-start mb-1.5">
                        <h4 className="font-bold text-xs text-slate-800 group-hover:text-indigo-600 truncate mr-2">
                          {app.companyName}
                        </h4>
                        {app.link && (
                          <a
                            href={app.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-slate-600 shrink-0 cursor-pointer"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <p className="text-[10px] text-slate-500 font-semibold mb-3 truncate">
                        {app.position}
                      </p>

                      <div className="space-y-1 text-[9px] text-slate-400">
                        {app.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 shrink-0 text-slate-300" />
                            <span className="truncate">{app.location}</span>
                          </div>
                        )}
                        {app.salary && (
                          <div className="flex items-center gap-1.5">
                            <DollarSign className="w-3 h-3 shrink-0 text-slate-300" />
                            <span>{app.salary}</span>
                          </div>
                        )}
                        {app.dateApplied && (
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 shrink-0 text-slate-300" />
                            <span>Applied: {app.dateApplied}</span>
                          </div>
                        )}
                      </div>

                      {/* Detail route navigation link */}
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex justify-end">
                        <Link
                          href={`/job-tracker/${app.id}`}
                          className="inline-flex items-center gap-1 text-[9px] font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                          Prep Notes <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
