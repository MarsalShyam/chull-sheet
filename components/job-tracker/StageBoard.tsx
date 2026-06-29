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

  // Color mappings for stage headers
  const stageHeaderColors: Record<JobStage, string> = {
    "To Apply": "bg-zinc-900/80 text-zinc-300 border-zinc-850",
    "Applied": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Interview Call": "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    "No Answer": "bg-amber-500/10 text-amber-400 border-amber-500/20",
    "Offer": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "Rejected": "bg-rose-500/10 text-rose-400 border-rose-500/20",
  };

  const stageAccentColor: Record<JobStage, string> = {
    "To Apply": "bg-zinc-700",
    "Applied": "bg-blue-500",
    "Interview Call": "bg-indigo-500",
    "No Answer": "bg-amber-500",
    "Offer": "bg-emerald-500",
    "Rejected": "bg-rose-500",
  };

  return (
    // ✅ Outer wrapper: horizontal scroll container — same pattern as ApplicationTable
    <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
      {/* ✅ Inner row: fixed min-width so all 6 columns always stay in one row */}
      <div className="flex gap-4 min-w-[1050px]">
        {STAGES.map((stage) => {
          const stageApps = groupedApps[stage] || [];
          return (
            <div
              key={stage}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
              // ✅ flex-1 so columns share space equally, but never shrink below min-w
              className="flex flex-col flex-1 bg-[#0c0c0e]/30 border border-zinc-800/80 rounded-xl p-3 min-h-[450px]"
            >
              {/* Stage Header */}
              <div
                className={`flex items-center justify-between border px-2.5 py-1.5 rounded-lg text-xs font-bold mb-3 shadow-sm ${stageHeaderColors[stage]}`}
              >
                <span className="truncate">{stage}</span>
                <span className="bg-zinc-900/60 border border-zinc-850 px-2 py-0.5 rounded text-[10px] text-zinc-300 ml-1 shrink-0">
                  {stageApps.length}
                </span>
              </div>

              {/* Application Cards */}
              <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
                {stageApps.length === 0 ? (
                  <div className="h-full border border-dashed border-zinc-800/80 rounded-lg flex items-center justify-center p-6 text-zinc-550 text-[10px] text-center">
                    Drag here
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, app.id)}
                      className="group bg-card border border-zinc-800/80 hover:border-indigo-500/50 p-3 rounded-lg shadow-md hover:shadow-lg cursor-grab active:cursor-grabbing transition-all duration-200 relative overflow-hidden"
                    >
                      {/* Left color accent bar */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-lg ${stageAccentColor[stage]}`}
                      />

                      <div className="pl-1">
                        <div className="flex justify-between items-start mb-1.5">
                          <h4 className="font-bold text-xs text-zinc-200 group-hover:text-indigo-400 truncate mr-2">
                            {app.companyName}
                          </h4>
                          {app.link && (
                            <a
                              href={app.link}
                              target="_blank"
                              rel="noreferrer"
                              className="text-zinc-500 hover:text-zinc-400 shrink-0 cursor-pointer"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <p className="text-[10px] text-zinc-400 font-semibold mb-3 truncate">
                          {app.position}
                        </p>

                        <div className="space-y-1 text-[9px] text-zinc-500">
                          {app.location && (
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-3 h-3 shrink-0 text-zinc-650" />
                              <span className="truncate">{app.location}</span>
                            </div>
                          )}
                          {app.salary && (
                            <div className="flex items-center gap-1.5">
                              <DollarSign className="w-3 h-3 shrink-0 text-zinc-650" />
                              <span>{app.salary}</span>
                            </div>
                          )}
                          {app.dateApplied && (
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3 shrink-0 text-zinc-650" />
                              <span>Applied: {app.dateApplied}</span>
                            </div>
                          )}
                        </div>

                        {/* Prep Notes link */}
                        <div className="mt-3 pt-2.5 border-t border-zinc-800/40 flex justify-end">
                          <Link
                            href={`/job-tracker/${app.id}`}
                            className="inline-flex items-center gap-1 text-[9px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
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
    </div>
  );
}