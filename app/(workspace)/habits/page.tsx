"use client";

import React, { useState, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useHabits } from "@/lib/hooks/useHabits";
import HabitCalendar from "@/components/habits/HabitCalendar";
import HabitHeatmap from "@/components/habits/HabitHeatmap";
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Flame, 
  CheckCircle, 
  Activity, 
  Loader2 
} from "lucide-react";

export default function HabitTrackerPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const {
    habits,
    entries,
    loading: habitsLoading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitEntry,
    reorderHabits,
  } = useHabits(user?.id);

  // Date selection states
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Dialog state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitColor, setNewHabitColor] = useState("indigo");

  const monthYearStr = useMemo(() => {
    return currentDate.toLocaleString("default", { month: "long", year: "numeric" });
  }, [currentDate]);

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days: Date[] = [];
    
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    
    return days;
  }, [currentDate]);

  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() - 1);
      return copy;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() + 1);
      return copy;
    });
  };

  const handleCreateHabit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newHabitName.trim()) {
      await addHabit(newHabitName.trim(), newHabitColor);
      setNewHabitName("");
      setIsAddOpen(false);
    }
  };

  // Metrics calculation
  const stats = useMemo(() => {
    let monthlyCompletions = 0;
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    Object.keys(entries).forEach((dateStr) => {
      const [y, m] = dateStr.split("-").map(Number);
      if (y === year && m - 1 === month) {
        monthlyCompletions += Object.values(entries[dateStr]).filter(
          (status) => status === "completed"
        ).length;
      }
    });

    // Calculate maximum current streak among all habits
    let maxCurrentStreak = 0;
    habits.forEach((habit) => {
      const completedDates: Date[] = [];
      Object.keys(entries).forEach((dateStr) => {
        if (entries[dateStr][habit.id] === "completed") {
          const [y, m, d] = dateStr.split("-").map(Number);
          completedDates.push(new Date(y, m - 1, d));
        }
      });

      if (completedDates.length > 0) {
        completedDates.sort((a, b) => a.getTime() - b.getTime());
        let runningStreak = 0;
        let lastDate: Date | null = null;

        completedDates.forEach((date) => {
          if (lastDate === null) {
            runningStreak = 1;
          } else {
            const diffDays = Math.round(
              (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            if (diffDays === 1) {
              runningStreak += 1;
            } else if (diffDays > 1) {
              runningStreak = 1;
            }
          }
          lastDate = date;
        });

        // Verify if active
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const lastDateObj = lastDate as Date | null;
        if (lastDateObj) {
          lastDateObj.setHours(0, 0, 0, 0);
          const gap = Math.round((today.getTime() - lastDateObj.getTime()) / (1000 * 60 * 60 * 24));
          if (gap <= 1) {
            maxCurrentStreak = Math.max(maxCurrentStreak, runningStreak);
          }
        }
      }
    });

    return {
      totalHabits: habits.length,
      monthlyCompletions,
      maxCurrentStreak,
    };
  }, [habits, entries, currentDate]);

  const colorOptions = ["indigo", "blue", "emerald", "rose", "amber", "purple", "orange", "cyan"];

  if (!isUserLoaded || habitsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-slate-400 text-xs">Loading Habit board...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-zinc-100 tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-450 animate-pulse" />
            Habit Consistency Tracker
          </h1>
          <p className="text-zinc-400 text-xs mt-1">
            Build discipline with visual tracking and streaks.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-600/10 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Habit
        </button>
      </div>

      {/* Add Habit Overlay Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-[#030303]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-zinc-150 mb-4">Create New Habit</h3>
            
            <form onSubmit={handleCreateHabit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5">
                  Habit Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Study 1 Hour, Leetcode..."
                  value={newHabitName}
                  onChange={(e) => setNewHabitName(e.target.value)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-650 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1.5">
                  Visual Color Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {colorOptions.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setNewHabitColor(c)}
                      className={`h-8 rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all ${
                        newHabitColor === c
                          ? "border-indigo-500 scale-105"
                          : "border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      <span className={`w-3.5 h-3.5 rounded-full bg-${c}-500`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 rounded-lg bg-[#0c0c0e] border border-zinc-800 hover:bg-zinc-900/60 text-xs font-semibold text-zinc-400 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-all cursor-pointer"
                >
                  Save Habit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 bg-card border border-zinc-800/80 rounded-xl shadow-md flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Total Tracked</span>
            <h3 className="text-xl font-bold text-zinc-200">{stats.totalHabits} Habits</h3>
          </div>
        </div>

        <div className="p-5 bg-card border border-zinc-800/80 rounded-xl shadow-md flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shrink-0">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Monthly Total</span>
            <h3 className="text-xl font-bold text-zinc-200">{stats.monthlyCompletions} Completed</h3>
          </div>
        </div>

        <div className="p-5 bg-card border border-zinc-800/80 rounded-xl shadow-md flex items-center space-x-4">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20 shrink-0">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Highest Active Streak</span>
            <h3 className="text-xl font-bold text-zinc-200">{stats.maxCurrentStreak} Days</h3>
          </div>
        </div>
      </div>

      {/* GitHub-style Contribution Heatmap */}
      <HabitHeatmap entries={entries} />

      {/* Month Navigation & Main Spreadsheet Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between bg-[#09090b] border border-zinc-800/80 rounded-lg px-4 py-2">
          <h2 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
            Viewing: {monthYearStr}
          </h2>
          <div className="flex items-center space-x-1.5">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-zinc-950 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <HabitCalendar
          habits={habits}
          daysInMonth={daysInMonth}
          entries={entries}
          onToggleCell={toggleHabitEntry}
          onDeleteHabit={deleteHabit}
          onUpdateHabit={updateHabit}
          onReorderHabits={reorderHabits}
        />
      </div>
    </div>
  );
}
