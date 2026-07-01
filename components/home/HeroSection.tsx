"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SignUpButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Sparkles,
    Calendar,
    Briefcase,
    CheckSquare,
} from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-6 animate-pulse"
            >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Introducing ChullSheet 2.0</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none mb-6 text-white"
            >
                The ultimate productivity sheet
                <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300 bg-clip-text text-transparent">
                    built for builders.
                </span>
            </motion.h1>

            {/* Description */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 font-medium leading-relaxed mb-10"
            >
                ChullSheet is a collaborative, AI-integrated workspace to organize
                notes, track habits, manage job applications, and coordinate team todos.
                Completely real-time.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
                <SignUpButton mode="modal">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-base font-semibold text-white shadow-xl shadow-indigo-600/20 hover:shadow-indigo-500/30 active:scale-98 transition-all duration-200 cursor-pointer">
                        Get Started for Free <ArrowRight className="w-4 h-4" />
                    </button>
                </SignUpButton>
                <Link
                    href="/products/docs"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-base font-semibold text-zinc-300 hover:text-white transition-all duration-200"
                >
                    Explore Features
                </Link>
            </motion.div>

            {/* Mockup Box */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-16 md:mt-24 max-w-5xl mx-auto rounded-2xl border border-zinc-800 bg-zinc-900/40 p-2 md:p-3 shadow-2xl backdrop-blur-sm"
            >
                <div className="rounded-xl border border-zinc-800 bg-black overflow-hidden relative aspect-[16/9] flex items-center justify-center">
                    {/* Mockup overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                    <div className="absolute top-4 left-4 flex space-x-1.5 z-20">
                        <span className="w-3 h-3 rounded-full bg-rose-500/70" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/70" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/70" />
                    </div>

                    {/* Dashboard Mockup Content */}
                    <div className="w-full h-full p-8 md:p-12 flex flex-col justify-between text-left select-none">
                        <div className="flex justify-between items-center border-b border-zinc-900 pb-4 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                                    <Image src="/logob1.png" alt="Logo" width={18} height={18} />
                                </div>
                                <span className="font-bold text-sm text-zinc-300">
                                    ChullSheet Workspace
                                </span>
                            </div>
                            <div className="flex items-center gap-1 bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-[10px] text-zinc-400">
                                <Sparkles className="w-3 h-3 text-indigo-400" /> AI Autopilot
                                Enabled
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 flex-1">
                            {/* Habit Tracker Column */}
                            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-2">
                                        <Calendar className="w-3.5 h-3.5" /> HABITS
                                    </div>
                                    <h3 className="font-bold text-sm text-zinc-200 mb-1">
                                        LeetCode Daily
                                    </h3>
                                    <p className="text-[10px] text-zinc-500 leading-tight">
                                        Streak: 18 Days. Complete 1 algorithm daily.
                                    </p>
                                </div>
                                <div className="grid grid-cols-7 gap-1 mt-3">
                                    {Array.from({ length: 28 }).map((_, i) => (
                                        <span
                                            key={i}
                                            className={`aspect-square rounded-[3px] border border-zinc-800/80 ${i % 5 === 0
                                                    ? "bg-zinc-900"
                                                    : i % 3 === 0
                                                        ? "bg-emerald-500/30 border-emerald-500/50"
                                                        : "bg-emerald-500/80 border-emerald-400/80"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Job Tracker Column */}
                            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-2">
                                        <Briefcase className="w-3.5 h-3.5" /> CAREER
                                    </div>
                                    <h3 className="font-bold text-sm text-zinc-200 mb-1">
                                        Google Application
                                    </h3>
                                    <p className="text-[10px] text-zinc-500 leading-tight">
                                        Stage: Interview Call. Scheduled for July 12th.
                                    </p>
                                </div>
                                <div className="space-y-1.5 mt-3">
                                    <div className="flex justify-between items-center bg-black border border-zinc-900 rounded p-1.5 text-[9px]">
                                        <span className="text-zinc-300 font-medium">
                                            System Design Prep
                                        </span>
                                        <span className="text-indigo-400 font-bold uppercase tracking-wider">
                                            High
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center bg-black border border-zinc-900 rounded p-1.5 text-[9px]">
                                        <span className="text-zinc-300 font-medium">
                                            Behavioral Prep
                                        </span>
                                        <span className="text-emerald-400 font-bold uppercase tracking-wider">
                                            Done
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Todo List Column */}
                            <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-1.5 text-xs text-indigo-400 font-bold mb-2">
                                        <CheckSquare className="w-3.5 h-3.5" /> PROJECTS
                                    </div>
                                    <h3 className="font-bold text-sm text-zinc-200 mb-1">
                                        Team Launch Checklist
                                    </h3>
                                    <p className="text-[10px] text-zinc-500 leading-tight">
                                        Completed: 3/5 Tasks. Assigned: 4 members.
                                    </p>
                                </div>
                                <div className="space-y-1.5 mt-3">
                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                                        <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-[7px] text-white">
                                            ✓
                                        </span>
                                        <span className="line-through opacity-50">
                                            Database migration
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[10px] text-zinc-300">
                                        <span className="w-3 h-3 rounded border border-zinc-700 flex items-center justify-center text-[7px]" />
                                        <span>Setup Clerk Authentication</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}