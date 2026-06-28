"use client";

import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { FileText } from "lucide-react";

interface SidebarOptionProps {
  href: string;
  id: string;
}

const SidebarOption = ({ href, id }: SidebarOptionProps) => {
  const [data] = useDocumentData(doc(db, "documents", id));
  const pathname = usePathname();
  const isActive = pathname === href;

  if (!data) return null;

  return (
    <Link
      href={href}
      className={`group flex items-center space-x-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${
        isActive
          ? "bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-500 pl-2"
          : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
      }`}
    >
      <FileText
        size={14}
        className={`flex-shrink-0 transition-colors ${
          isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-400"
        }`}
      />
      <span className="truncate flex-1">{data.title || "Untitled Document"}</span>
    </Link>
  );
};

export default SidebarOption;
