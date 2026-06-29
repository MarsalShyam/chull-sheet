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
      className={`group flex items-center space-x-2 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-150 ${isActive
        ? "bg-zinc-800 text-white border-l-2 border-white pl-2"
        : "text-zinc-400 hover:bg-zinc-900/45 hover:text-zinc-200"
        }`}
    >
      <FileText
        size={14}
        className={`flex-shrink-0 transition-colors ${isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-400"
          }`}
      />
      <span className="truncate flex-1">{data.title || "Untitled Document"}</span>
    </Link>
  );
};

export default SidebarOption;
