"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, CheckSquare } from "lucide-react";

const features = [
    {
        icon: Calendar,
        title: "Habit Grid Heatmap",
        description:
            "Track your daily practices in a spreadsheet layout. Celebrate consistency with a GitHub‑style 365‑day contributions grid showing daily completion density.",
    },
    {
        icon: Briefcase,
        title: "Job Application Board",
        description:
            "A Kanban stage board for managing job applications. Attach recruiter emails, links, salary expectations, and write custom preparation Q&As with auto‑save.",
    },
    {
        icon: CheckSquare,
        title: "Personal & Team Todos",
        description:
            "Organize personal goals, or create collaborative team spaces with member roles, task assignments, activity logs, real‑time comment threads, and alerts.",
    },
];

export default function FeaturesSection() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-900">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white">
                    One workspace, infinite workflows
                </h2>
                <p className="text-zinc-400 max-w-xl mx-auto text-sm sm:text-base">
                    Why pay for three different subscriptions? ChullSheet unifies your
                    notes, habit logs, applications, and task boards.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group rounded-2xl border border-zinc-900 bg-zinc-900/20 p-6 hover:border-indigo-500/30 hover:bg-zinc-900/40 transition-all duration-300"
                    >
                        <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <feature.icon className="w-6 h-6 text-indigo-400" />
                        </div>
                        <h3 className="font-bold text-lg text-zinc-200 mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}