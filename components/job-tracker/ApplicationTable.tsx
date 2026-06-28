"use client";

import React, { useState, useMemo } from "react";
import { JobApplication, JobStage } from "@/lib/repositories/interfaces";
import Link from "next/link";
import { Search, ArrowRight, Trash2, Calendar, MapPin, DollarSign } from "lucide-react";

interface ApplicationTableProps {
  applications: JobApplication[];
  onDelete: (id: string) => void;
  onUpdateStage: (id: string, stage: JobStage) => void;
}

const STAGES: JobStage[] = ["To Apply", "Applied", "Interview Call", "No Answer", "Offer", "Rejected"];

export default function ApplicationTable({
  applications,
  onDelete,
  onUpdateStage,
}: ApplicationTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<string>("All");

  // Filtering and searching logic
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.position.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStage = selectedStage === "All" || app.stage === selectedStage;

      return matchesSearch && matchesStage;
    });
  }, [applications, searchQuery, selectedStage]);

  return (
    <div className="space-y-4">
      {/* Filtering Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by company or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
          />
        </div>

        <select
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          className="bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-600 focus:outline-none focus:border-indigo-500 cursor-pointer"
        >
          <option value="All">All Stages</option>
          {STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Table grid */}
      <div className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-400 font-bold uppercase tracking-wider">
                <th className="px-5 py-3">Company</th>
                <th className="px-5 py-3">Position</th>
                <th className="px-5 py-3">Stage</th>
                <th className="px-5 py-3">Location</th>
                <th className="px-5 py-3">Salary</th>
                <th className="px-5 py-3">Date Applied</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-slate-400 font-medium">
                    No job applications match your filters.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4 font-bold text-slate-800">
                      {app.companyName}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {app.position}
                    </td>
                    <td className="px-5 py-4">
                      <select
                        value={app.stage}
                        onChange={(e) => onUpdateStage(app.id, e.target.value as JobStage)}
                        className="bg-slate-100 border border-slate-200 rounded px-2 py-1 text-[10px] font-semibold text-slate-600 focus:outline-none cursor-pointer"
                      >
                        {STAGES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-5 py-4 text-slate-500 flex items-center gap-1">
                      {app.location ? (
                        <>
                          <MapPin className="w-3 h-3 text-slate-300 shrink-0" />
                          <span className="truncate max-w-[120px]">{app.location}</span>
                        </>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {app.salary ? (
                        <span className="flex items-center gap-0.5">
                          <DollarSign className="w-3 h-3 text-slate-300 shrink-0" />
                          {app.salary}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-slate-500">
                      {app.dateApplied ? (
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                          {app.dateApplied}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          href={`/job-tracker/${app.id}`}
                          className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 hover:text-indigo-500 transition-colors"
                        >
                          Prep Notes <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => onDelete(app.id)}
                          className="text-slate-400 hover:text-rose-500 p-1 rounded hover:bg-slate-100/50 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
