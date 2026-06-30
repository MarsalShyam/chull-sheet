"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WifiOff, Wifi, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function OfflineDetector() {
  const [isOffline, setIsOffline] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") return;

    setIsOffline(!window.navigator.onLine);

    const handleOnline = () => {
      setIsOffline(false);
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOffline(true);
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
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    const online = window.navigator.onLine;
    setIsChecking(false);
    
    if (online) {
      setIsOffline(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md px-4 select-none"
          >
            {/* Background radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_30%,rgba(239,68,68,0.1),transparent)] pointer-events-none" />

            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="max-w-md w-full bg-zinc-950/80 border border-zinc-800/80 rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden text-center flex flex-col items-center"
            >
              {/* Reconnecting Shimmer Bar */}
              {isChecking && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-900 overflow-hidden">
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
                </div>
              )}

              {/* Float logo */}
              <div className="mb-6">
                <Image
                  src="/logow3.png"
                  alt="ChullSheet"
                  width={36}
                  height={36}
                  className="object-contain opacity-80"
                />
              </div>

              {/* Wifi Off Icon */}
              <div className="relative w-20 h-20 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-red-500/5">
                <motion.div
                  className="absolute -inset-2 rounded-full border border-red-500/10"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
                <WifiOff className="w-9 h-9" />
              </div>

              <h2 className="text-xl font-bold text-zinc-100 mb-2">Connection Lost</h2>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed max-w-xs">
                Please check your internet connection. ChullSheet will automatically reconnect when you are back online.
              </p>

              {/* Action Buttons */}
              <button
                onClick={handleRetry}
                disabled={isChecking}
                className="flex items-center justify-center gap-2 px-6 py-2.5 w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-500/20 cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
              >
                <RefreshCw className={`w-4 h-4 ${isChecking ? "animate-spin" : ""}`} />
                {isChecking ? "Reconnecting..." : "Retry Connection"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast popup when successfully reconnected */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-zinc-950 border border-emerald-500/30 text-zinc-100 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Wifi className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-zinc-100">Connection Restored</p>
              <p className="text-[10px] text-zinc-400">You are back online and synced.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
