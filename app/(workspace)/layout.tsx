"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useUser } from "@clerk/nextjs";
import LogoLoader from "@/components/ui/LogoLoader";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // If clerk auth is loading, show a loading screen
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#030303]">
        <LogoLoader />
      </div>
    );
  }

  // Double check client side safety
  if (!isSignedIn) {
    return null;
  }

  const handleMenuClick = () => {
    // If desktop, toggle collapse. If mobile, toggle open.
    if (window.innerWidth >= 768) {
      setIsCollapsed(!isCollapsed);
    } else {
      setIsMobileOpen(!isMobileOpen);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Collapsible Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex flex-col flex-1 min-h-screen overflow-hidden transition-all duration-300 ${
          isCollapsed ? "md:pl-0" : "md:pl-64"
        }`}
      >
        {/* Fixed Header */}
        <Header onMenuClick={handleMenuClick} />

        {/* Scrollable Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-background text-foreground scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
          <div className="max-w-7xl mx-auto w-full h-full min-h-[calc(100vh-6rem)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
