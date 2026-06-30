"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Home } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-zinc-100 flex flex-col items-center justify-center overflow-hidden px-4 select-none">
      {/* Background radial gradients for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(99,102,241,0.15),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_800px,rgba(79,70,229,0.08),transparent)] pointer-events-none" />

      {/* Floating particles background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/30"
            style={{
              width: (Math.random() * 4 + 2).toFixed(1) + "px",
              height: (Math.random() * 4 + 2).toFixed(1) + "px",
              top: (Math.random() * 100).toFixed(1) + "%",
              left: (Math.random() * 100).toFixed(1) + "%",
            }}
            animate={{
              y: [0, -100],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        {/* Brand Logo floating */}
        <motion.div
          className="mb-8"
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/logow3.png" alt="ChullSheet Logo" width={48} height={48} className="object-contain" />
        </motion.div>

        {/* Large Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full bg-zinc-950/40 border border-zinc-800/40 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Subtle glow behind the card */}
          <div className="absolute -inset-px bg-gradient-to-b from-indigo-500/10 to-transparent rounded-3xl pointer-events-none" />

          {/* Large Animated 404 Text */}
          <div className="relative mb-6">
            <motion.h1
              className="text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-indigo-200 via-zinc-100 to-indigo-500/30"
              animate={{
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              404
            </motion.h1>
            {/* Hologram shadow effect */}
            <motion.h1
              className="absolute inset-0 text-8xl md:text-9xl font-black tracking-tighter text-indigo-500/10 -z-10 blur-sm"
              animate={{
                x: [-2, 2, -2],
                y: [1, -1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              404
            </motion.h1>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-3">
            Oops! This page doesn't exist.
          </h2>
          <p className="text-sm text-zinc-405 text-zinc-400 mb-8 leading-relaxed">
            The link you followed might be broken, or the page may have been removed. Let's get you back on track!
          </p>

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white text-sm font-semibold text-zinc-300 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </div>
        </motion.div>

        {/* Footer text */}
        <p className="text-xs text-zinc-500 mt-8">
          Lost in ChullSheet? Let us know if you think this is a bug.
        </p>
      </div>
    </div>
  );
}
