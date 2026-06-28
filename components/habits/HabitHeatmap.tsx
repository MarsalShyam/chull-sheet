"use client";

import React, { useMemo } from "react";
import { HabitEntries } from "@/lib/repositories/interfaces";

interface HabitHeatmapProps {
  entries: HabitEntries;
}

export default function HabitHeatmap({ entries }: HabitHeatmapProps) {
  // Generate past 365 days aligned to weeks (Sunday-Saturday)
  const gridData = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Go back 364 days
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);
    
    // Align start date to Sunday
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);

    const dates: Date[] = [];
    const tempDate = new Date(startDate);
    
    // Generate exactly 53 weeks (371 days) to make a perfect grid
    for (let i = 0; i < 371; i++) {
      dates.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }
    
    return dates;
  }, []);

  // Format Date to YYYY-MM-DD local string
  const formatDateStr = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const getCompletionsCount = (dateStr: string) => {
    const dayEntries = entries[dateStr] || {};
    return Object.values(dayEntries).filter((status) => status === "completed").length;
  };

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-slate-900/60 border-slate-800/80 hover:bg-slate-800";
    if (count === 1) return "bg-emerald-500/20 border-emerald-500/10 hover:bg-emerald-500/30";
    if (count === 2) return "bg-emerald-500/40 border-emerald-500/20 hover:bg-emerald-500/50";
    if (count === 3) return "bg-emerald-500/75 border-emerald-400/40 hover:bg-emerald-500/85";
    return "bg-emerald-500 border-emerald-400 hover:bg-emerald-400";
  };

  // Group dates into weeks (7 days each)
  const weeks = useMemo(() => {
    const result: Date[][] = [];
    for (let i = 0; i < gridData.length; i += 7) {
      result.push(gridData.slice(i, i + 7));
    }
    return result;
  }, [gridData]);

  // Months label calculation
  const monthLabels = useMemo(() => {
    const labels: { text: string; index: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDayOfWeek = week[0];
      const currentMonth = firstDayOfWeek.getMonth();
      if (currentMonth !== lastMonth) {
        labels.push({
          text: firstDayOfWeek.toLocaleString("default", { month: "short" }),
          index: weekIndex,
        });
        lastMonth = currentMonth;
      }
    });

    return labels;
  }, [weeks]);

  return (
    <div className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-5 shadow-lg relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
        <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Habit Contribution Grid
        </h3>
        <div className="flex items-center space-x-1.5 text-[9px] text-slate-500 select-none">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded bg-slate-900 border border-slate-800" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/10" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-500/40 border border-emerald-500/20" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-500/75 border border-emerald-400/40" />
          <div className="w-2.5 h-2.5 rounded bg-emerald-500 border border-emerald-400" />
          <span>More</span>
        </div>
      </div>

      <div className="flex flex-col overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pb-2">
        {/* Month labels at the top */}
        <div className="flex text-[9px] text-slate-500 h-4 pl-8 mb-1 select-none relative min-w-[760px]">
          {monthLabels.map((label, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: `${32 + label.index * 13.8}px` }}
            >
              {label.text}
            </div>
          ))}
        </div>

        {/* Heatmap Grid Row & Columns */}
        <div className="flex min-w-[760px]">
          {/* Day of week labels */}
          <div className="grid grid-rows-7 gap-[3px] text-[8px] text-slate-600 pr-2 pt-[2px] w-6 select-none h-[95px] shrink-0 font-medium">
            <span>Sun</span>
            <span className="opacity-0">Mon</span>
            <span>Tue</span>
            <span className="opacity-0">Wed</span>
            <span>Thu</span>
            <span className="opacity-0">Fri</span>
            <span>Sat</span>
          </div>

          {/* Contribution columns */}
          <div className="flex gap-[3px]">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                {week.map((day) => {
                  const dateStr = formatDateStr(day);
                  const completions = getCompletionsCount(dateStr);
                  const formattedDate = day.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <div
                      key={dateStr}
                      title={`${completions} habit${completions === 1 ? "" : "s"} completed on ${formattedDate}`}
                      className={`w-2.5 h-2.5 rounded-[2px] border transition-all duration-200 cursor-pointer ${getColorClass(
                        completions
                      )}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
