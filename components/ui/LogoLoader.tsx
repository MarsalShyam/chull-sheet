"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoLoaderProps {
  className?: string;
  showText?: boolean;
}

export default function LogoLoader({ className = "", showText = true }: LogoLoaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center space-y-6 ${className}`}>
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Glowing background halo */}
        <motion.div
          className="absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pulse & Spin loader border */}
        <motion.div
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-indigo-500/60"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Outer subtle rings */}
        <motion.div
          className="absolute -inset-4 rounded-full border border-zinc-800/40"
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Logo */}
        <motion.div
          className="relative z-10 w-14 h-14 flex items-center justify-center"
          animate={{
            y: [-4, 4, -4],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/logow3.png"
            alt="ChullSheet Logo"
            width={56}
            height={56}
            className="object-contain filter drop-shadow-[0_0_8px_rgba(99,102,241,0.35)]"
          />
        </motion.div>
      </div>

      {showText && (
        <div className="flex flex-col items-center space-y-2">
          <motion.p
            className="text-xs font-semibold tracking-widest text-zinc-400 uppercase"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Loading ChullSheet
          </motion.p>
          {/* Shimmer loading bar */}
          <div className="w-28 h-[2px] bg-zinc-900 rounded-full overflow-hidden relative">
            <motion.div
              className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
              initial={{ width: "0%", left: "0%" }}
              animate={{
                width: ["25%", "50%", "25%"],
                left: ["0%", "50%", "100%"],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
