import React from "react";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import FreeBanner from "@/components/home/FreeBanner";
import FeatureShowcaseSection from "@/components/home/FeatureShowcaseSection";
import CTASection from "@/components/home/CTASection";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <div className="relative overflow-hidden bg-black text-white flex flex-col items-center">
      {/* 
        One single ultra‑soft ambient glow – placed centrally, 
        very low opacity so it never lightens the background 
      */}
      {/* <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full pointer-events-none" /> */}
      {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[90%] rounded-full bg-indigo-600/3 blur-[200px] pointer-events-none"
        style={{
          // Two background layers:
          // 1. padding-box → transparent interior
          // 2. border-box → gradient border
          background:
            'linear-gradient(transparent, transparent) padding-box, linear-gradient(90deg, #242424ff, #020202ff, #2a2a2cff) border-box',
          border: '3px solid #1414a3ff',
          borderRadius: '9999px', // ensures perfect rounding
          opacity: 0.25,          // adjust to your taste
          // softens the border slightly
        }} /> */}
      <HeroSection />
      <FeaturesSection />
      <FreeBanner />

      <FeatureShowcaseSection
        title="Create Docs & Collaborate with Your Team"
        description="Real‑time collaborative documents where multiple team members can edit simultaneously. Add comments, assign tasks, and watch changes live."
      />
      <FeatureShowcaseSection
        title="Track Your Job Applications Here"
        description="A dedicated Kanban board to follow every application from ‘Saved’ to ‘Offer’. Attach emails, set reminders, and log recruiter conversations."
        reverse
      />
      <FeatureShowcaseSection
        title="Make a Habit That Sticks"
        description="Build powerful routines with a visual habit tracker. See your yearly heatmap, daily streaks, and never break a chain again."
      />
      <FeatureShowcaseSection
        title="Your Personal Todo, Supercharged"
        description="Organize everything from grocery lists to side‑project milestones. Set priorities, due dates, and get AI‑generated subtasks."
        reverse
      />
      <FeatureShowcaseSection
        title="My Team Todo — Align Everyone"
        description="Create shared boards for your startup or study group. Assign members, track progress, and celebrate completed goals together."
      />

      <CTASection />

    </div>
  );
}