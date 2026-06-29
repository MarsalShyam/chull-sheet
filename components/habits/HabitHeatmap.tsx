"use client";

import React, { useMemo } from "react";
import { HabitEntries } from "@/lib/repositories/interfaces";

interface HabitHeatmapProps {
  entries: HabitEntries;
}

// Constants
const DAYS_TO_SHOW = 364; // 52 weeks exactly — clean grid, no year overlap
const CELL_SIZE = 10; // px (w-2.5 = 10px)
const CELL_GAP = 3; // px
const COLUMN_WIDTH = CELL_SIZE + CELL_GAP; // 13px per week column

export default function HabitHeatmap({ entries }: HabitHeatmapProps) {
  // Generate dates aligned to weeks (Sunday-Saturday)
  const weeks = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Start from (DAYS_TO_SHOW - 1) days ago
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (DAYS_TO_SHOW - 1));

    // Align start date to the nearest previous Sunday
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);

    // Align end date (today) to the next Saturday for a complete final week
    const endDate = new Date(today);
    const endDay = endDate.getDay();
    endDate.setDate(endDate.getDate() + (6 - endDay));

    // Generate all dates between aligned start and end
    const dates: Date[] = [];
    const tempDate = new Date(startDate);
    while (tempDate <= endDate) {
      dates.push(new Date(tempDate));
      tempDate.setDate(tempDate.getDate() + 1);
    }

    // Group into weeks of 7 days
    const result: Date[][] = [];
    for (let i = 0; i < dates.length; i += 7) {
      result.push(dates.slice(i, i + 7));
    }
    return result;
  }, []);

  // Format Date → "YYYY-MM-DD" in local time
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

  // Month labels — GitHub style:
  // A label appears at the first week where a new month begins,
  // but ONLY if that month occupies enough of the column to "claim" it.
  const monthLabels = useMemo(() => {
    const labels: { text: string; index: number }[] = [];
    let lastMonthKey = "";

    weeks.forEach((week, weekIndex) => {
      // Use the first day of the week to identify "which month" this column belongs to
      const firstDay = week[0];
      const monthKey = `${firstDay.getFullYear()}-${firstDay.getMonth()}`;

      if (monthKey !== lastMonthKey) {
        // Count how many days of this week belong to the new month
        const daysInNewMonth = week.filter(
          (d) =>
            d.getMonth() === firstDay.getMonth() &&
            d.getFullYear() === firstDay.getFullYear()
        ).length;

        // Only label if at least 4 days of the month are visible in this column
        // This prevents tiny edge slivers from being labeled (avoids the "Jun Jul" duplicate)
        if (daysInNewMonth >= 4) {
          labels.push({
            text: firstDay.toLocaleString("default", { month: "short" }),
            index: weekIndex,
          });
          lastMonthKey = monthKey;
        }
      }
    });

    return labels;
  }, [weeks]);

  // Total grid width for the inner scrollable container
  const gridWidth = weeks.length * COLUMN_WIDTH + 40;

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

      <div className="flex flex-col overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent pb-2 md:justify-center md:items-center">
        {/* Month labels at the top */}
        <div
          className="flex text-[9px] text-slate-500 h-4 mb-1 select-none relative"
          style={{ minWidth: `${gridWidth}px` }}
        >
          {monthLabels.map((label, i) => (
            <div
              key={i}
              className="absolute"
              style={{ left: `${32 + label.index * COLUMN_WIDTH}px` }}
            >
              {label.text}
            </div>
          ))}
        </div>

        {/* Heatmap Grid */}
        <div className="flex" style={{ minWidth: `${gridWidth}px` }}>
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
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const isFuture = day > today;

                  const formattedDate = day.toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <div
                      key={dateStr}
                      title={
                        isFuture
                          ? `${formattedDate} (upcoming)`
                          : `${completions} habit${completions === 1 ? "" : "s"} completed on ${formattedDate}`
                      }
                      className={`w-2.5 h-2.5 rounded-[2px] border transition-all duration-200 cursor-pointer ${isFuture
                        ? "bg-slate-950 border-slate-900/50 opacity-40"
                        : getColorClass(completions)
                        }`}
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