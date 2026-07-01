"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

export default function FreeBanner() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-900">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl p-8 sm:p-12"
            >
                {/* Animated background glow */}
                {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-transparent to-violet-600/10 opacity-50 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-zinc-300 blur-[100px] rounded-full animate-pulse pointer-events-none" /> */}

                <div className="relative z-10 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold text-sm mb-4"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>100% Free Forever</span>
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
                        No pricing plans. No credit card.
                    </h2>
                    <p className="text-zinc-400 max-w-xl text-base sm:text-lg">
                        ChullSheet is completely free for individuals and teams. We believe
                        productivity tools should be accessible to everyone.
                    </p>

                    <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left w-full max-w-md">
                        {[
                            "Unlimited documents",
                            "AI‑powered assistant",
                            "Real‑time collaboration",
                            "All features included",
                        ].map((item) => (
                            <li
                                key={item}
                                className="flex items-center gap-2 text-sm text-zinc-300"
                            >
                                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </motion.div>
        </section>
    );
}