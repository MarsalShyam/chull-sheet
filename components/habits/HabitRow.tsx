"use client";

import React, { useState } from "react";
import { Habit, HabitEntries, HabitEntryStatus } from "@/lib/repositories/interfaces";
import HabitCell from "./HabitCell";
import { Trash2, Edit2, Check, X, GripVertical } from "lucide-react";

interface HabitRowProps {
  habit: Habit;
  daysInMonth: Date[];
  entries: HabitEntries;
  onToggleCell: (dateStr: string, habitId: string, currentStatus: HabitEntryStatus | null) => void;
  onDelete: (habitId: string) => void;
  onUpdate: (habitId: string, name: string, color: string) => void;
}

export default function HabitRow({
  habit,
  daysInMonth,
  entries,
  onToggleCell,
  onDelete,
  onUpdate,
}: HabitRowProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(habit.name);
  const [editedColor] = useState(habit.color);

  // Helper: Format Date to YYYY-MM-DD local string
  const formatDateStr = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Streak calculations
  const calculateStreak = () => {
    // Collect all completion dates for this habit across all time
    const completedDates: Date[] = [];
    Object.keys(entries).forEach((dateStr) => {
      if (entries[dateStr][habit.id] === "completed") {
        const [y, m, d] = dateStr.split("-").map(Number);
        // Create local date
        completedDates.push(new Date(y, m - 1, d));
      }
    });

    if (completedDates.length === 0) {
      return { currentStreak: 0, maxStreak: 0, totalCompletions: 0 };
    }

    // Sort chronologically
    completedDates.sort((a, b) => a.getTime() - b.getTime());

    let maxStreak = 0;
    let currentStreak = 0;
    let runningStreak = 0;
    let lastDate: Date | null = null;

    completedDates.forEach((date) => {
      if (lastDate === null) {
        runningStreak = 1;
      } else {
        const diffTime = date.getTime() - lastDate.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          runningStreak += 1;
        } else if (diffDays > 1) {
          if (runningStreak > maxStreak) {
            maxStreak = runningStreak;
          }
          runningStreak = 1;
        }
      }
      lastDate = date;
    });

    if (runningStreak > maxStreak) {
      maxStreak = runningStreak;
    }

    // Check if the current streak is still active
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const lastDateObj = lastDate as Date | null;
    if (lastDateObj) {
      lastDateObj.setHours(0, 0, 0, 0);
      const diffTimeToday = today.getTime() - lastDateObj.getTime();
      const diffDaysToday = Math.round(diffTimeToday / (1000 * 60 * 60 * 24));

      if (diffDaysToday <= 1) {
        currentStreak = runningStreak;
      } else {
        currentStreak = 0;
      }
    }

    return {
      currentStreak,
      maxStreak,
      totalCompletions: completedDates.length,
    };
  };

  const { currentStreak, maxStreak, totalCompletions } = calculateStreak();

  const handleSave = () => {
    if (editedName.trim()) {
      onUpdate(habit.id, editedName.trim(), editedColor);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex items-center min-w-max border-b border-slate-800/40 py-2 hover:bg-slate-900/10 transition-colors">
      {/* Sticky Habit Information Column */}
      <div className="w-64 flex items-center justify-between pr-4 sticky left-0 bg-slate-950 z-10 shrink-0">
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <GripVertical className="w-4 h-4 text-slate-600 shrink-0 cursor-grab active:cursor-grabbing" />

          {isEditing ? (
            <div className="flex items-center space-x-1.5 flex-1 min-w-0 pr-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="bg-slate-900 text-slate-100 text-xs border border-slate-700 rounded px-1.5 py-0.5 w-full focus:outline-none focus:border-indigo-500"
              />
              <button onClick={handleSave} className="text-emerald-400 hover:text-emerald-300 cursor-pointer">
                <Check className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-slate-300 cursor-pointer">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2 truncate">
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 bg-${habit.color}-500`} />
              <span className="font-semibold text-xs text-slate-200 truncate">{habit.name}</span>
            </div>
          )}
        </div>

        {/* Actions Menu */}
        {!isEditing && (
          <div className="flex items-center space-x-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onDelete(habit.id)}
              className="text-slate-500 hover:text-rose-400 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>



      {/* Daily Cells Column Container */}
      <div className="flex items-center space-x-1 px-4">
        {daysInMonth.map((day) => {
          const dateStr = formatDateStr(day);
          const cellStatus = entries[dateStr]?.[habit.id] || null;

          return (
            <div key={dateStr} className="w-8 shrink-0 flex justify-center">
              <HabitCell
                status={cellStatus}
                color={habit.color}
                onClick={() => onToggleCell(dateStr, habit.id, cellStatus)}
              />
            </div>
          );
        })}
      </div>

      {/* Streak and Completion Metrics (Sticky Column 2) */}
      <div className="w-32 flex items-center justify-around text-[10px] text-slate-400 border-r border-slate-800 pr-3 shrink-0">
        <div className="flex flex-col items-center">
          <span className="text-orange-400 font-bold">{currentStreak}d</span>
          <span className="text-[8px] text-slate-600 uppercase">Streak</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-indigo-400 font-bold">{maxStreak}d</span>
          <span className="text-[8px] text-slate-600 uppercase">Max</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-slate-300 font-medium">{totalCompletions}</span>
          <span className="text-[8px] text-slate-600 uppercase">Total</span>
        </div>
      </div>
    </div>
  );
}
