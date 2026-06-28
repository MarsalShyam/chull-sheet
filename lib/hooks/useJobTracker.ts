"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { jobTrackerRepository } from "@/lib/repositories";
import { JobApplication, JobStage } from "@/lib/repositories/interfaces";
import { toast } from "sonner";

export function useJobTracker(userId: string | null | undefined) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        setApplications([]);
        setLoading(false);
      }, 0);
      return;
    }

    setTimeout(() => {
      setLoading(true);
    }, 0);

    const appsCol = collection(db, "users", userId, "jobApplications");
    const appsQuery = query(appsCol, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      appsQuery,
      (snapshot) => {
        const appsList: JobApplication[] = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            companyName: data.companyName || "",
            position: data.position || "",
            link: data.link || "",
            stage: (data.stage as JobStage) || "To Apply",
            location: data.location || "",
            salary: data.salary || "",
            recruiterName: data.recruiterName || "",
            recruiterEmail: data.recruiterEmail || "",
            dateApplied: data.dateApplied || "",
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
            questions: data.questions || [],
          };
        });
        setApplications(appsList);
        setLoading(false);
      },
      (err) => {
        console.error("Error subscribing to job applications:", err);
        setError(err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  const addApplication = async (appData: Omit<JobApplication, "id" | "createdAt" | "updatedAt">) => {
    if (!userId) return;
    try {
      const newId = await jobTrackerRepository.createApplication(userId, appData);
      toast.success("Application added successfully!");
      return newId;
    } catch (err) {
      console.error("Failed to add application:", err);
      toast.error("Failed to add application.");
    }
  };

  const updateApplication = async (appId: string, updates: Partial<Omit<JobApplication, "id" | "createdAt" | "updatedAt">>) => {
    if (!userId) return;
    try {
      await jobTrackerRepository.updateApplication(userId, appId, updates);
      // Optional: show a silent update or a toast if it's a major change
    } catch (err) {
      console.error("Failed to update application:", err);
      toast.error("Failed to update application details.");
    }
  };

  const deleteApplication = async (appId: string) => {
    if (!userId) return;
    try {
      await jobTrackerRepository.deleteApplication(userId, appId);
      toast.success("Application deleted.");
    } catch (err) {
      console.error("Failed to delete application:", err);
      toast.error("Failed to delete application.");
    }
  };

  // Drag and drop / Stage movement with Optimistic UI updates
  const moveApplicationStage = async (appId: string, nextStage: JobStage) => {
    if (!userId) return;

    const previousApps = [...applications];

    // Optimistically update local state immediately
    setApplications((prev) =>
      prev.map((app) =>
        app.id === appId
          ? { ...app, stage: nextStage, updatedAt: new Date() }
          : app
      )
    );

    try {
      await jobTrackerRepository.updateApplication(userId, appId, { stage: nextStage });
    } catch (err) {
      console.error("Failed to move application stage:", err);
      toast.error("Failed to save stage change.");
      // Rollback to previous state on failure
      setApplications(previousApps);
    }
  };

  return {
    applications,
    loading,
    error,
    addApplication,
    updateApplication,
    deleteApplication,
    moveApplicationStage,
  };
}
