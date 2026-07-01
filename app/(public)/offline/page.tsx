"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WifiOff, Wifi, RefreshCw, Home } from "lucide-react";
import Image from "next/image";

export default function OfflinePage() {
  const router = useRouter();
  const [isOnline, setIsOnline] = useState(true);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => {
      setIsOnline(true);
    };
    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = async () => {
    setIsChecking(true);
    // Simulate checking connection
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const online = navigator.onLine;
    setIsOnline(online);
    setIsChecking(false);

    if (online) {
      router.refresh();
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#030303] text-zinc-100 flex flex-col items-center justify-center overflow-hidden px-4 select-none">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,rgba(239,68,68,0.06),transparent)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_800px,rgba(99,102,241,0.06),transparent)] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        {/* Brand Logo floating */}
        <motion.div
          className="mb-8"
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src="/logow3.png" alt="ChullSheet Logo" width={48} height={48} className="object-contain" />
        </motion.div>

        {/* Large Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full bg-zinc-950/40 border border-zinc-800/40 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Reconnecting Shimmer Bar */}
          <AnimatePresence>
            {isChecking && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute top-0 left-0 right-0 h-1 bg-zinc-900 overflow-hidden"
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-red-500 via-indigo-500 to-emerald-500"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  style={{ width: "50%" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Connection Icon */}
          <div className="relative flex items-center justify-center w-24 h-24 mx-auto mb-6">
            <AnimatePresence mode="wait">
              {isOnline ? (
                <motion.div
                  key="online"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/5"
                >
                  <Wifi className="w-10 h-10" />
                </motion.div>
              ) : (
                <motion.div
                  key="offline"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="relative w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center shadow-lg shadow-red-500/5"
                >
                  <motion.div
                    className="absolute -inset-2 rounded-full border border-red-500/10"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <WifiOff className="w-10 h-10" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-zinc-100 mb-3">
            {isOnline ? "Back Online!" : "Connection Lost"}
          </h2>

          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            {isOnline
              ? "Your internet connection is restored. You're ready to reconnect to the workspace."
              : "Please check your internet connection and try again. ChullSheet is waiting to reconnect."}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleRetry}
              disabled={isChecking}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-300 text-base font-medium text-black transition-all shadow-lg shadow-zinc-600/10 hover:shadow-zinc-500/20 cursor-pointer disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98]"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`} />
              {isChecking ? "Checking..." : isOnline ? "Reconnect" : "Retry Connection"}
            </button>

            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 hover:text-white text-sm font-semibold text-zinc-300 transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
          </div>
        </motion.div>

        {/* Automatic detection notice */}
        <p className="text-xs text-zinc-550 mt-8 flex items-center justify-center gap-1.5 text-zinc-500">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
          Auto-detecting network changes in background
        </p>
      </div>
    </div>
  );
}
