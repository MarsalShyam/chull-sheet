"use client";

import React from "react";
import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";

interface FeatureShowcaseProps {
    title: string;
    description: string;
    imageSlot?: React.ReactNode; // To pass actual image component
    reverse?: boolean; // image on right (default) or left
}

export default function FeatureShowcaseSection({
    title,
    description,
    imageSlot,
    reverse = false,
}: FeatureShowcaseProps) {
    return (
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-zinc-900">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                    } items-center gap-12`}
            >
                {/* Text Side */}
                <div className="flex-1 text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                        {title}
                    </h2>
                    <p className="text-zinc-400 text-lg leading-relaxed max-w-xl">
                        {description}
                    </p>
                </div>

                {/* Image Side */}
                <div className="flex-1 w-full max-w-xl">
                    {imageSlot ? (
                        imageSlot
                    ) : (
                        <div className="relative rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/30 p-12 flex flex-col items-center justify-center text-zinc-500 hover:border-indigo-500/30 transition-colors group">
                            <ImageIcon className="w-10 h-10 mb-3 group-hover:text-indigo-400" />
                            <span className="text-sm font-medium">
                                Screenshot placeholder
                            </span>
                            <span className="text-xs text-zinc-600 mt-1">
                                Replace with your image
                            </span>
                        </div>
                    )}
                </div>
            </motion.div>
        </section>
    );
}