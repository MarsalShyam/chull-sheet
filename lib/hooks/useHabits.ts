"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { habitRepository } from "@/lib/repositories";
import { Habit, HabitEntryStatus, HabitEntries } from "@/lib/repositories/interfaces";
import { toast } from "sonner";

export function useHabits(userId: string | null | undefined) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [entries, setEntries] = useState<HabitEntries>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        setHabits([]);
        setEntries({});
        setLoading(false);
      }, 0);
      return;
    }

    setTimeout(() => {
      setLoading(true);
    }, 0);

    // Subscribe to Habits
    const habitsCol = collection(db, "users", userId, "habits");
    const habitsQuery = query(habitsCol, orderBy("order", "asc"));
    const unsubscribeHabits = onSnapshot(
      habitsQuery,
      (snapshot) => {
        const habitsList: Habit[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            color: data.color || "indigo",
            createdAt: data.createdAt?.toDate() || new Date(),
            order: typeof data.order === "number" ? data.order : 0,
          };
        });
        setHabits(habitsList);
        setLoading(false);
      },
      (err) => {
        console.error("Error subscribing to habits:", err);
        setError(err);
        setLoading(false);
      }
    );

    // Subscribe to Habit Entries
    const entriesCol = collection(db, "users", userId, "habitEntries");
    const unsubscribeEntries = onSnapshot(
      entriesCol,
      (snapshot) => {
        const entriesMap: HabitEntries = {};
        snapshot.docs.forEach((doc) => {
          entriesMap[doc.id] = doc.data() as Record<string, HabitEntryStatus>;
        });
        setEntries(entriesMap);
      },
      (err) => {
        console.error("Error subscribing to habit entries:", err);
      }
    );

    return () => {
      unsubscribeHabits();
      unsubscribeEntries();
    };
  }, [userId]);

  const addHabit = async (name: string, color: string) => {
    if (!userId) return;
    try {
      const nextOrder = habits.length > 0 ? Math.max(...habits.map((h) => h.order)) + 1 : 0;
      await habitRepository.createHabit(userId, name, color, nextOrder);
      toast.success("Habit created successfully!");
    } catch (err) {
      console.error("Failed to add habit:", err);
      toast.error("Failed to create habit.");
    }
  };

  const updateHabit = async (habitId: string, name: string, color: string) => {
    if (!userId) return;
    try {
      await habitRepository.updateHabit(userId, habitId, { name, color });
      toast.success("Habit updated!");
    } catch (err) {
      console.error("Failed to update habit:", err);
      toast.error("Failed to update habit.");
    }
  };

  const deleteHabit = async (habitId: string) => {
    if (!userId) return;
    try {
      await habitRepository.deleteHabit(userId, habitId);
      toast.success("Habit deleted!");
    } catch (err) {
      console.error("Failed to delete habit:", err);
      toast.error("Failed to delete habit.");
    }
  };

  // Optimistic Toggle Habit Entry
  const toggleHabitEntry = async (dateStr: string, habitId: string, currentStatus: HabitEntryStatus | null) => {
    if (!userId) return;

    // Determine the next status in the cycle: null -> completed -> skipped -> missed -> null
    let nextStatus: HabitEntryStatus | null = null;
    if (currentStatus === null) {
      nextStatus = "completed";
    } else if (currentStatus === "completed") {
      nextStatus = "skipped";
    } else if (currentStatus === "skipped") {
      nextStatus = "missed";
    } else {
      nextStatus = null;
    }

    // Save old state in case we need to roll back
    const previousEntries = { ...entries };

    // Update state optimistically
    setEntries((prev) => {
      const updated = { ...prev };
      if (!updated[dateStr]) {
        updated[dateStr] = {};
      }
      if (nextStatus === null) {
        delete updated[dateStr][habitId];
        if (Object.keys(updated[dateStr]).length === 0) {
          delete updated[dateStr];
        }
      } else {
        updated[dateStr][habitId] = nextStatus;
      }
      return updated;
    });

    try {
      await habitRepository.setHabitEntry(userId, dateStr, habitId, nextStatus);
    } catch (err) {
      console.error("Failed to set habit entry:", err);
      toast.error("Failed to save habit entry.");
      // Rollback
      setEntries(previousEntries);
    }
  };

  const reorderHabits = async (newOrderedHabits: Habit[]) => {
    if (!userId) return;
    
    // Save old state in case we need to roll back
    const previousHabits = [...habits];

    // Optimistically update local UI state
    const updatedHabits = newOrderedHabits.map((h, index) => ({ ...h, order: index }));
    setHabits(updatedHabits);

    try {
      // Perform batch update on Firestore
      for (const h of updatedHabits) {
        await habitRepository.updateHabit(userId, h.id, { order: h.order });
      }
    } catch (err) {
      console.error("Failed to reorder habits:", err);
      toast.error("Failed to save habit ordering.");
      // Rollback
      setHabits(previousHabits);
    }
  };

  return {
    habits,
    entries,
    loading,
    error,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitEntry,
    reorderHabits,
  };
}
