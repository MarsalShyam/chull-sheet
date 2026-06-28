"use client";

import React from "react";
import { HabitEntryStatus } from "@/lib/repositories/interfaces";
import { Check, X, Minus } from "lucide-react";

interface HabitCellProps {
  status: HabitEntryStatus | null;
  onClick: () => void;
  color: string;
}

export default function HabitCell({ status, onClick, color }: HabitCellProps) {
  // Map color names to Tailwind colors
  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-600 border-indigo-400 text-white",
    blue: "bg-blue-600 border-blue-400 text-white",
    emerald: "bg-emerald-600 border-emerald-400 text-white",
    rose: "bg-rose-600 border-rose-400 text-white",
    amber: "bg-amber-600 border-amber-400 text-white",
    purple: "bg-purple-600 border-purple-400 text-white",
    orange: "bg-orange-600 border-orange-400 text-white",
    cyan: "bg-cyan-600 border-cyan-400 text-white",
  };

  const selectedBgColor = colorMap[color] || colorMap.indigo;

  let cellStyle = "bg-slate-900 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80";
  let content = null;

  if (status === "completed") {
    cellStyle = selectedBgColor;
    content = <Check className="w-3.5 h-3.5" />;
  } else if (status === "skipped") {
    cellStyle = "bg-amber-500/20 border-amber-500/40 text-amber-400 hover:bg-amber-500/30";
    content = <Minus className="w-3.5 h-3.5" />;
  } else if (status === "missed") {
    cellStyle = "bg-rose-500/20 border-rose-500/40 text-rose-400 hover:bg-rose-500/30";
    content = <X className="w-3.5 h-3.5" />;
  }

  return (
    <button
      onClick={onClick}
      className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 select-none active:scale-90 cursor-pointer ${cellStyle}`}
    >
      {content}
    </button>
  );
}
