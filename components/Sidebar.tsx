"use client";

import { useState, useMemo, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useCollection } from "react-firebase-hooks/firestore";
import { collectionGroup, where, query, DocumentData } from "firebase/firestore";
import { db } from "@/firebase";
import SidebarOption from "./SidebarOption";
import NewDocumentButton from "./NewDocumentButton";
import {
  Calendar,
  Briefcase,
  CheckSquare,
  User,
  Users,
  ChevronDown,
  ChevronRight,
  X,
  Compass,
  PlusIcon,
  PlusCircle,
} from "lucide-react";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

interface SidebarProps {
  isCollapsed?: boolean;
  setIsCollapsed?: (val: boolean) => void;
  isMobileOpen?: boolean;
  setIsMobileOpen?: (val: boolean) => void;
}

const Sidebar = ({
  isCollapsed = false,
  isMobileOpen = false,
  setIsMobileOpen,
}: SidebarProps) => {
  const { user } = useUser();
  const pathname = usePathname();

  const [isTodoExpanded, setIsTodoExpanded] = useState(true);
  const [isDocsExpanded, setIsDocsExpanded] = useState(true);
  const [isSharedExpanded, setIsSharedExpanded] = useState(true);

  const [data] = useCollection(
    user &&
    query(
      collectionGroup(db, "rooms"),
      where("userId", "==", user.emailAddresses[0].toString())
    )
  );

  const groupedData = useMemo(() => {
    if (!data) return { owner: [], editor: [] };

    return data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );
  }, [data]);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Compass,
    },
    {
      name: "Habit Tracking",
      href: "/habits",
      icon: Calendar,
    },
    {
      name: "Job Tracker",
      href: "/job-tracker",
      icon: Briefcase,
    },
  ];

  const isActive = (href: string) => {
    if (href === "/dashboard" && pathname === "/dashboard") return true;
    return pathname.startsWith(href) && href !== "/dashboard";
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#09090b] text-zinc-100 border-r border-zinc-800/40">
      {/* Brand / Logo */}
      <div className="flex items-center justify-between p-4 border-b border-zinc-800/40 h-16 bg-[#030303]">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
            CS
          </div>
          <span className="font-bold text-lg tracking-wider text-zinc-100">ChullSheet</span>
        </Link>
        {setIsMobileOpen && (
          <button
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-900 scrollbar-track-transparent">
        {/* Core Nav Section */}
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${active
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100"
                  }`}
              >
                <Icon size={18} className={active ? "text-white" : "text-zinc-400"} />
                <span>{item.name}</span>
              </Link>
            );
          })}

          {/* Collapsible Todo Submenu */}
          <div className="space-y-1">
            <button
              onClick={() => setIsTodoExpanded(!isTodoExpanded)}
              className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:bg-zinc-900/60 hover:text-zinc-100 transition-all duration-150 cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <CheckSquare size={18} />
                <span>Todo Lists</span>
              </div>
              {isTodoExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </button>

            {isTodoExpanded && (
              <div className="pl-9 pr-2 space-y-1 transition-all duration-200">
                <Suspense
                  fallback={
                    <>
                      <div className="flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium text-zinc-500">
                        <User size={14} />
                        <span>Personal Todo</span>
                      </div>
                      <div className="flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium text-zinc-500">
                        <Users size={14} />
                        <span>Team Todo</span>
                      </div>
                    </>
                  }
                >
                  <TodoLinks pathname={pathname} setIsMobileOpen={setIsMobileOpen} />
                </Suspense>
              </div>
            )}
          </div>
        </div>

        <hr className="border-zinc-800/40" />

        {/* Create Document Button Container */}
        <div className="px-2">
          <NewDocumentButton />
        </div>

        {/* Dynamic Documents Sections */}
        <div className="space-y-4">
          {/* My Documents Section */}
          <div className="space-y-1">
            <button
              onClick={() => setIsDocsExpanded(!isDocsExpanded)}
              className="flex items-center justify-between w-full px-2 py-1 text-xs font-bold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <span>My Documents</span>
              {isDocsExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>

            {isDocsExpanded && (
              <div className="space-y-1 mt-1 pl-1">
                {groupedData.owner.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic px-2 py-1">No documents found</p>
                ) : (
                  groupedData.owner.map((doc) => (
                    <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                  ))
                )}
              </div>
            )}
          </div>

          {/* Shared with Me Section */}
          <div className="space-y-1">
            <button
              onClick={() => setIsSharedExpanded(!isSharedExpanded)}
              className="flex items-center justify-between w-full px-2 py-1 text-xs font-bold text-zinc-500 uppercase tracking-wider hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <span>Shared with me</span>
              {isSharedExpanded ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
            </button>

            {isSharedExpanded && (
              <div className="space-y-1 mt-1 pl-1">
                {groupedData.editor.length === 0 ? (
                  <p className="text-xs text-zinc-500 italic px-2 py-1">No shared documents</p>
                ) : (
                  groupedData.editor.map((doc) => (
                    <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User profile footer */}
      {user && (
        <div className="p-4 border-t border-zinc-800/40 bg-[#030303] flex items-center space-x-3 text-sm">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-zinc-800 bg-zinc-800">
            <Image
              src={user.imageUrl}
              alt={user.fullName || "User"}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1 truncate">
            <p className="font-semibold text-zinc-200 truncate">{user.fullName}</p>
            <p className="text-xs text-zinc-500 truncate">
              {user.emailAddresses[0].toString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Left side) */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-20 h-screen transition-all duration-300 ${isCollapsed ? "w-0 overflow-hidden" : "w-64"
          }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar Overlay */}
      {isMobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileOpen?.(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity duration-300"
          />
          {/* Menu Drawer */}
          <div className="relative flex flex-col w-full max-w-[280px] h-full shadow-2xl animate-in slide-in-from-left duration-250 backdrop-blur-md">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};

function TodoLinks({
  pathname,
  setIsMobileOpen,
}: {
  pathname: string;
  setIsMobileOpen?: (val: boolean) => void;
}) {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "personal";

  const isPersonalActive = pathname === "/todo" && type === "personal";
  const isTeamActive = pathname === "/todo" && type === "team";

  return (
    <>
      <Link
        href="/todo?type=personal"
        onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
        className={`flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${isPersonalActive
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200"
          }`}
      >
        <User size={14} className={isPersonalActive ? "text-white" : "text-zinc-400"} />
        <span>Personal Todo</span>
      </Link>
      <Link
        href="/todo?type=team"
        onClick={() => setIsMobileOpen && setIsMobileOpen(false)}
        className={`flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs font-medium transition-colors ${isTeamActive
          ? "bg-zinc-800 text-white"
          : "text-zinc-400 hover:bg-zinc-900/40 hover:text-zinc-200"
          }`}
      >
        <Users size={14} className={isTeamActive ? "text-white" : "text-zinc-400"} />
        <span>Team Todo</span>
      </Link>
    </>
  );
}

export default Sidebar;