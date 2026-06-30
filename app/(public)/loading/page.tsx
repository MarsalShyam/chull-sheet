"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";

export default function LoadingPage() {
  const [tipIndex, setTipIndex] = useState(0);
  const tips = [
    "Tip: Use the AI Translate tool to translate your documents in real-time.",
    "Tip: Double-click cells in the Habit Tracker grid to toggle status.",
    "Tip: Keep your jobs board organized by moving cards between columns.",
    "Tip: Real-time document editing makes teamwork seamless and fast.",
    "Tip: Use Clerk's secure workspace to share docs with trusted editors."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-zinc-100 flex flex-col items-center justify-center overflow-hidden px-4">
      {/* Background radial gradients for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(99,102,241,0.12),transparent)] pointer-events-none" />
      
      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center space-y-8">
        
        {/* Main Logo Loader */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Glowing background halo */}
          <motion.div
            className="absolute inset-0 bg-indigo-500/15 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Pulse outer loading ring */}
          <motion.div
            className="absolute -inset-2 rounded-full border border-indigo-500/30 border-t-indigo-500"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Inner ring */}
          <motion.div
            className="absolute inset-2 rounded-full border border-zinc-800/80 border-b-indigo-400/50"
            animate={{ rotate: -360 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Floating Logo */}
          <motion.div
            className="relative z-10 w-14 h-14"
            animate={{
              y: [-6, 6, -6],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/logow3.png"
              alt="ChullSheet Logo"
              width={56}
              height={56}
              className="object-contain filter drop-shadow-[0_0_12px_rgba(99,102,241,0.4)]"
            />
          </motion.div>
        </div>

        {/* Loading text and tips glass card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full bg-zinc-950/45 border border-zinc-800/50 rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col items-center space-y-4"
        >
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-zinc-100 tracking-wider">Optimizing Workspace</h2>
            <p className="text-xs text-zinc-500">Detecting slow network, configuring assets...</p>
          </div>

          {/* Progress bar */}
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 bottom-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 rounded-full"
              initial={{ width: "0%", left: "0%" }}
              animate={{
                width: ["20%", "60%", "20%"],
                left: ["0%", "40%", "0%"],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Tips Carousel */}
          <div className="h-12 flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={tipIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
                className="text-xs text-zinc-400 font-medium leading-relaxed italic"
              >
                {tips[tipIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-xs font-semibold text-zinc-300 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            Return Home
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
