"use client";

import { useUser, Show, SignInButton, UserButton } from "@clerk/nextjs";
import Breadcrumbs from "./Breadcrumbs";
import { Menu } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
  onMenuClick: () => void;
  onToggleSidebar?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between px-6 h-16 border-b border-zinc-800/40 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10 shadow-none">
      <div className="flex items-center space-x-4">
        {/* Toggle Button for Desktop / Mobile */}
        <button
          onClick={onMenuClick}
          className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100 transition-colors cursor-pointer"
          title="Toggle Navigation"
          aria-label="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        {/* Logo and branding on Header (especially visible on mobile/when collapsed) */}
        <Link href="/dashboard" className="flex items-center space-x-2 md:hidden">
          <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-sm shadow-indigo-600/20">
            CS
          </div>
          <span className="font-bold text-sm text-zinc-100">ChullSheet</span>
        </Link>

        {/* BreadCrumbs */}
        <div className="hidden sm:block">
          <Breadcrumbs />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <span className="hidden md:inline-block text-sm text-zinc-400 font-medium">
            {user.firstName ? `${user.firstName}'s Space` : "Personal Space"}
          </span>
        )}
        <div className="flex items-center">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-lg border border-zinc-800",
                },
              }}
            />
          </Show>
        </div>
      </div>
    </header>
  );
};

export default Header;
