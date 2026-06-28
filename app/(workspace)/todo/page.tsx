"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useTodos } from "@/lib/hooks/useTodos";
import PersonalTodoView from "@/components/todo/PersonalTodoView";
import TeamTodoView from "@/components/todo/TeamTodoView";
import { 
  CheckSquare, 
  User, 
  Users2, 
  Loader2, 
  Bell, 
  BellOff
} from "lucide-react";

export default function TodoPage() {
  const { user, isLoaded: isUserLoaded } = useUser();
  const {
    personalTodos,
    personalLoading,
    teams,
    teamsLoading,
    selectedTeamId,
    setSelectedTeamId,
    teamTodos,
    notifications,
    
    // Actions
    addPersonalTodo,
    updatePersonalTodo,
    deletePersonalTodo,
    createTeam,
    inviteMember,
    removeMember,
    addTeamTodo,
    updateTeamTodo,
    deleteTeamTodo,
    markNotificationRead,
  } = useTodos(user?.id, user?.primaryEmailAddress?.emailAddress);

  // Todo View selection tab: "personal" or "team"
  const [activeTab, setActiveTab] = useState<"personal" | "team">("personal");
  
  // Show notifications dropdown state
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadNotifications = React.useMemo(() => {
    return notifications.filter((n) => !n.read);
  }, [notifications]);

  const handleNotificationClick = async (id: string) => {
    await markNotificationRead(id);
  };

  if (!isUserLoaded || personalLoading || teamsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
          <p className="text-slate-400 text-xs">Loading Todo Workspace...</p>
        </div>
      </div>
    );
  }

  const currentUserName = user?.fullName || user?.firstName || "Anonymous";

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-600" />
            Task Management Dashboard
          </h1>
          <p className="text-slate-500 text-xs mt-1">
            Organize personal tasks, or create collaborative team spaces with activity feeds and real-time syncing.
          </p>
        </div>

        {/* Notifications Icon Bell */}
        <div className="relative self-end md:self-auto">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5 text-slate-600" />
            {unreadNotifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border border-white animate-pulse" />
            )}
          </button>

          {/* Notifications Dropdown Panel Popover */}
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
              <div className="flex items-center justify-between border-b border-slate-850 pb-2 mb-3">
                <span className="text-[10px] uppercase font-bold text-slate-400">Activity Alerts</span>
                <span className="text-[9px] bg-indigo-600/20 text-indigo-400 font-bold px-2 py-0.5 rounded-full">
                  {unreadNotifications.length} New
                </span>
              </div>
              
              <div className="space-y-2.5 max-h-[250px] overflow-y-auto pr-1">
                {notifications.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-xs flex flex-col items-center gap-1.5">
                    <BellOff className="w-6 h-6 text-slate-600" />
                    <span>No notifications yet.</span>
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleNotificationClick(n.id)}
                      className={`p-2.5 rounded-lg text-xs transition-colors border cursor-pointer ${
                        n.read
                          ? "bg-slate-950/40 border-slate-900 text-slate-500"
                          : "bg-slate-950 border-slate-850 text-slate-200 hover:border-slate-800"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-bold">{n.title}</span>
                        {!n.read && (
                          <span className="w-2 h-2 bg-indigo-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 leading-tight">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Tabs Toggles */}
      <div className="flex bg-slate-100 border border-slate-250 p-1 rounded-lg max-w-sm">
        <button
          onClick={() => setActiveTab("personal")}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all ${
            activeTab === "personal"
              ? "bg-white text-indigo-650 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <User className="w-3.5 h-3.5" /> Personal Todos
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all ${
            activeTab === "team"
              ? "bg-white text-indigo-650 shadow-sm"
              : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Users2 className="w-3.5 h-3.5" /> Team Collaboration
        </button>
      </div>

      {/* View Switcher content */}
      <div className="mt-4">
        {activeTab === "personal" ? (
          <PersonalTodoView
            todos={personalTodos}
            onAddTodo={addPersonalTodo}
            onUpdateTodo={updatePersonalTodo}
            onDeleteTodo={deletePersonalTodo}
          />
        ) : (
          <TeamTodoView
            teams={teams}
            selectedTeamId={selectedTeamId}
            setSelectedTeamId={setSelectedTeamId}
            teamTodos={teamTodos}
            onCreateTeam={createTeam}
            onInviteMember={inviteMember}
            onRemoveMember={removeMember}
            onAddTeamTodo={addTeamTodo}
            onUpdateTeamTodo={updateTeamTodo}
            onDeleteTeamTodo={deleteTeamTodo}
            currentUserEmail={user?.primaryEmailAddress?.emailAddress}
            currentUserName={currentUserName}
            currentUserId={user?.id || ""}
          />
        )}
      </div>
    </div>
  );
}
