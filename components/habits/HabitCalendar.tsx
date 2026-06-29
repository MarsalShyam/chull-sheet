"use client";

import React, { useRef } from "react";
import { Habit, HabitEntries, HabitEntryStatus } from "@/lib/repositories/interfaces";
import HabitRow from "./HabitRow";
import { CalendarRange, ChevronLeft, ChevronRight } from "lucide-react";

interface HabitCalendarProps {
  habits: Habit[];
  daysInMonth: Date[];
  entries: HabitEntries;
  onToggleCell: (dateStr: string, habitId: string, currentStatus: HabitEntryStatus | null) => void;
  onDeleteHabit: (habitId: string) => void;
  onUpdateHabit: (habitId: string, name: string, color: string) => void;
  onReorderHabits: (newOrderedHabits: Habit[]) => void;
}

export default function HabitCalendar({
  habits,
  daysInMonth,
  entries,
  onToggleCell,
  onDeleteHabit,
  onUpdateHabit,
  onReorderHabits,
}: HabitCalendarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const draggedIndexRef = useRef<number | null>(null);



  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // HTML5 Drag and Drop handlers
  const handleDragStart = (index: number) => {
    draggedIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (targetIndex: number) => {
    const draggedIndex = draggedIndexRef.current;
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const reorderedList = [...habits];
    const [draggedItem] = reorderedList.splice(draggedIndex, 1);
    reorderedList.splice(targetIndex, 0, draggedItem);

    onReorderHabits(reorderedList);
    draggedIndexRef.current = null;
  };

  return (
    <div className="w-full bg-slate-950 border border-slate-800/80 rounded-xl overflow-hidden shadow-lg">
      {/* Calendar Grid Header Toolbar */}
      <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-3.5 bg-slate-950">
        <div className="flex items-center space-x-2">
          <CalendarRange className="w-4 h-4 text-indigo-400" />
          <h3 className="text-xs font-bold text-slate-200 tracking-wider uppercase">Habit Spreadsheet</h3>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={() => scroll("left")}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/80 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/80 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Spreadsheet grid */}
      <div className="relative w-full overflow-x-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent" ref={scrollContainerRef}>
        <div className="min-w-max flex flex-col">
          {/* Table Headers */}
          <div className="flex items-center border-b border-slate-800 bg-slate-950/60 py-2.5">
            {/* Header: Habit Details (Sticky) */}
            <div className="w-55 md:w-64 pl-6 pr-4 sticky left-0 bg-slate-950 z-10 shrink-0 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Habits Name
            </div>

            {/* Header: Day Numbers */}
            <div className="flex items-center space-x-1 px-4">
              {daysInMonth.map((day) => {
                const isCurrent = isToday(day);
                const dayNum = day.getDate();
                const dayName = day.toLocaleDateString(undefined, { weekday: "narrow" });

                return (
                  <div
                    key={day.getTime()}
                    className={`w-8 shrink-0 flex flex-col items-center py-1 rounded ${isCurrent ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20" : "text-slate-500"
                      }`}
                  >
                    <span className="text-[10px] font-bold">{dayNum}</span>
                    <span className="text-[8px] uppercase">{dayName}</span>
                  </div>
                );
              })}
            </div>
            {/* Header: Streaks (Sticky) */}
            <div className="w-32 text-center border-r border-slate-850 pr-3 shrink-0 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Streaks
            </div>
          </div>

          {/* Table Rows */}
          {habits.length === 0 ? (
            <div className="flex flex-col pl-5 md:pl-0  md:items-center justify-center py-12 text-slate-500 text-xs">
              <span>No habits created yet. Click &quot;Add Habit&quot; to get started!</span>
            </div>
          ) : (
            <div className="flex flex-col">
              {habits.map((habit, index) => (
                <div
                  key={habit.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className="group cursor-grab active:cursor-grabbing hover:bg-slate-900/10"
                >
                  <HabitRow
                    habit={habit}
                    daysInMonth={daysInMonth}
                    entries={entries}
                    onToggleCell={onToggleCell}
                    onDelete={onDeleteHabit}
                    onUpdate={onUpdateHabit}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
