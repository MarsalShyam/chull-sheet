"use client";

import React from "react";
import { motion } from "framer-motion";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-900">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                    Get Started Today
                </h2>
                <p className="text-zinc-400 max-w-lg mx-auto text-base sm:text-lg mb-8">
                    Join thousands of developers who organize their entire workflow with
                    ChullSheet — completely free.
                </p>
                <SignUpButton mode="modal">
                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-lg font-semibold text-white shadow-xl shadow-indigo-600/20 hover:shadow-indigo-500/30 active:scale-98 transition-all duration-200 cursor-pointer">
                        Start Building Free <ArrowRight className="w-5 h-5" />
                    </button>
                </SignUpButton>
            </motion.div>
        </section>
    );
}