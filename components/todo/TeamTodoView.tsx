"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Team,
  TeamTodo,
  TeamTodoStatus,
  TodoPriority,
  TodoComment,
  ActivityLog,
  TeamMemberRole
} from "@/lib/repositories/interfaces";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
import { todoRepository } from "@/lib/repositories";
import {
  Users2,
  Plus,
  UserPlus,
  Clock,
  MessageSquare,
  Calendar,
  User,
  X,
  Settings,
  Trash2,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

interface TeamTodoViewProps {
  teams: Team[];
  selectedTeamId: string | null;
  setSelectedTeamId: (id: string | null) => void;
  teamTodos: TeamTodo[];
  onCreateTeam: (name: string, description: string) => Promise<string | undefined>;
  onInviteMember: (teamId: string, email: string, role: TeamMemberRole) => void;
  onRemoveMember: (teamId: string, email: string) => void;
  onAddTeamTodo: (teamId: string, todo: Omit<TeamTodo, "id" | "createdAt" | "updatedAt">, userName: string) => void;
  onUpdateTeamTodo: (teamId: string, id: string, updates: Partial<Omit<TeamTodo, "id" | "createdAt" | "updatedAt">>, userName: string, actionMsg?: string) => void;
  onDeleteTeamTodo: (teamId: string, id: string) => void;
  currentUserEmail: string | null | undefined;
  currentUserName: string;
  currentUserId: string;
  updateTeam: (teamId: string, updates: Partial<Omit<Team, "id" | "createdAt" | "updatedAt">>) => Promise<void>;
  deleteTeam: (teamId: string) => Promise<void>;
}

const BOARD_COLUMNS: TeamTodoStatus[] = ["Todo", "In Progress", "Review", "Completed"];

export default function TeamTodoView({
  teams,
  selectedTeamId,
  setSelectedTeamId,
  teamTodos,
  onCreateTeam,
  onInviteMember,
  onRemoveMember: _onRemoveMember,
  onAddTeamTodo,
  onUpdateTeamTodo,
  onDeleteTeamTodo: _onDeleteTeamTodo,
  currentUserEmail,
  currentUserName,
  currentUserId,
  updateTeam,
  deleteTeam,
}: TeamTodoViewProps) {
  const [isNewTeamOpen, setIsNewTeamOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<TeamTodo | null>(null);
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMemberRole>("Member");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState<TodoPriority>("Medium");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");
  const [comments, setComments] = useState<TodoComment[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [teamSettingsName, setTeamSettingsName] = useState("");
  const [teamSettingsDesc, setTeamSettingsDesc] = useState("");

  const activeTeam = useMemo(() => {
    return teams.find((t) => t.id === selectedTeamId) || null;
  }, [teams, selectedTeamId]);

  const currentUserRole: TeamMemberRole = useMemo(() => {
    if (!activeTeam || !currentUserEmail) return "Member";
    if (activeTeam.ownerEmail === currentUserEmail) return "Owner";
    if (activeTeam.admins.includes(currentUserEmail)) return "Admin";
    return "Member";
  }, [activeTeam, currentUserEmail]);

  const groupedTasks = useMemo(() => {
    const groups: Record<TeamTodoStatus, TeamTodo[]> = {
      "Todo": [],
      "In Progress": [],
      "Review": [],
      "Completed": [],
    };
    teamTodos.forEach((task) => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });
    return groups;
  }, [teamTodos]);

  useEffect(() => {
    if (!selectedTeamId || !selectedTask) {
      setTimeout(() => {
        setComments([]);
        setActivities([]);
      }, 0);
      return;
    }

    const commentsCol = collection(db, "teams", selectedTeamId, "comments");
    const commentsQuery = query(
      commentsCol,
      where("todoId", "==", selectedTask.id),
      orderBy("createdAt", "asc")
    );
    const unsubscribeComments = onSnapshot(commentsQuery, (snapshot) => {
      const list: TodoComment[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          todoId: data.todoId,
          userId: data.userId,
          userName: data.userName,
          userAvatar: data.userAvatar || "",
          text: data.text || "",
          createdAt: data.createdAt?.toDate() || new Date(),
        };
      });
      setComments(list);
    });

    const activitiesCol = collection(db, "teams", selectedTeamId, "activities");
    const activitiesQuery = query(
      activitiesCol,
      where("todoId", "==", selectedTask.id),
      orderBy("createdAt", "desc")
    );
    const unsubscribeActivities = onSnapshot(activitiesQuery, (snapshot) => {
      const list: ActivityLog[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          todoId: data.todoId,
          userId: data.userId,
          userName: data.userName,
          action: data.action || "",
          createdAt: data.createdAt?.toDate() || new Date(),
        };
      });
      setActivities(list);
    });

    return () => {
      unsubscribeComments();
      unsubscribeActivities();
    };
  }, [selectedTeamId, selectedTask]);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TeamTodoStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId && selectedTeamId) {
      const task = teamTodos.find((t) => t.id === taskId);
      if (task && task.status !== targetStatus) {
        onUpdateTeamTodo(
          selectedTeamId,
          taskId,
          { status: targetStatus },
          currentUserName,
          `moved task to: ${targetStatus}`
        );
      }
    }
  };

  const handleCreateTeamSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (teamName.trim()) {
      await onCreateTeam(teamName.trim(), teamDesc.trim());
      setTeamName("");
      setTeamDesc("");
      setIsNewTeamOpen(false);
    }
  };

  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeamId && inviteEmail.trim()) {
      onInviteMember(selectedTeamId, inviteEmail.trim(), inviteRole);
      setInviteEmail("");
      setIsInviteOpen(false);
    }
  };

  const handleCreateTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeamId && taskTitle.trim()) {
      onAddTeamTodo(
        selectedTeamId,
        {
          title: taskTitle.trim(),
          description: taskDesc.trim(),
          status: "Todo",
          priority: taskPriority,
          dueDate: taskDueDate,
          labels: [],
          checklist: [],
          assignedTo: taskAssignee || "",
        },
        currentUserName
      );
      setTaskTitle("");
      setTaskDesc("");
      setTaskPriority("Medium");
      setTaskDueDate("");
      setTaskAssignee("");
      setIsNewTaskOpen(false);
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTeamId && selectedTask && newCommentText.trim()) {
      try {
        await todoRepository.addComment(selectedTeamId, {
          todoId: selectedTask.id,
          userId: currentUserId,
          userName: currentUserName,
          text: newCommentText.trim(),
        });
        setNewCommentText("");
      } catch (err) {
        console.error(err);
        toast.error("Failed to add comment.");
      }
    }
  };

  const getPriorityColor = (p: TodoPriority) => {
    if (p === "High") return "bg-rose-500/10 text-rose-500 border-rose-500/20";
    if (p === "Medium") return "bg-amber-500/10 text-amber-500 border-amber-500/20";
    return "bg-blue-500/10 text-blue-500 border-blue-500/20";
  };

  const columnHeadersColors: Record<TeamTodoStatus, string> = {
    "Todo": "bg-zinc-900/80 text-zinc-300 border-zinc-850",
    "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
    "Review": "bg-purple-500/10 text-purple-400 border-purple-500/20",
    "Completed": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <div className="space-y-6">
      {/* Team navigation tabs row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/40 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {teams.length === 0 ? (
            <span className="text-xs text-zinc-500 font-medium">No teams created.</span>
          ) : (
            teams.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTeamId(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${selectedTeamId === t.id
                  ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/50"
                  : "bg-[#0c0c0e] border border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                  }`}
              >
                {t.name}
              </button>
            ))
          )}
          <button
            onClick={() => setIsNewTeamOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-dashed border-white-500/50 text-xs font-semibold text-white-400 hover:bg-white-500/10 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Create Team
          </button>
        </div>

        {activeTeam && (
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMembersOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] text-zinc-250 border border-zinc-750 font-bold cursor-pointer"
            >
              <Users2 className="w-3.5 h-3.5" /> Members ({activeTeam.members.length})
            </button>
            {(currentUserRole === "Owner" || currentUserRole === "Admin") && (
              <button
                onClick={() => {
                  setTeamSettingsName(activeTeam.name);
                  setTeamSettingsDesc(activeTeam.description || "");
                  setIsSettingsOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded bg-zinc-800 hover:bg-zinc-700 text-[10px] text-zinc-250 border border-zinc-750 font-bold cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" /> Settings
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Kanban Workspace */}
      {!selectedTeamId ? (
        <div className="text-center py-16 bg-[#09090b]/40 border border-zinc-800/60 border-dashed rounded-xl text-zinc-500 text-xs font-medium">
          Select or create a Team from the tab bar above to load your team task boards.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Active Board Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-zinc-400" />
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
                {activeTeam?.name} Board
              </h3>
            </div>
            <button
              onClick={() => setIsNewTaskOpen(true)}
              className="inline-flex w-fit items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-300 text-xs font-semibold text-black shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Team Task
            </button>
          </div>

          {/* ✅ Kanban Board — horizontal scroll on small screens */}
          <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {/* ✅ Inner flex row — min-w keeps all 4 columns in one row always */}
            <div className="flex gap-4 min-w-[720px]">
              {BOARD_COLUMNS.map((column) => {
                const tasks = groupedTasks[column] || [];
                return (
                  <div
                    key={column}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column)}
                    // ✅ flex-1 so columns share space equally on large screens
                    className="flex flex-col flex-1 bg-[#0c0c0e]/30 border border-zinc-800/80 rounded-xl p-3 min-h-[400px]"
                  >
                    {/* Column Header */}
                    <div
                      className={`flex items-center justify-between border px-2.5 py-1.5 rounded-lg text-xs font-bold mb-3 shadow-sm ${columnHeadersColors[column]}`}
                    >
                      <span>{column}</span>
                      <span className="bg-zinc-900/60 border border-zinc-850 px-2 py-0.5 rounded text-[10px] text-zinc-300 ml-1 shrink-0">
                        {tasks.length}
                      </span>
                    </div>

                    {/* Task Cards */}
                    <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[450px]">
                      {tasks.length === 0 ? (
                        <div className="h-full border border-dashed border-zinc-800/80 rounded-lg flex items-center justify-center p-6 text-zinc-550 text-[10px] text-center">
                          Drag here
                        </div>
                      ) : (
                        tasks.map((task) => (
                          <div
                            key={task.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, task.id)}
                            onClick={() => setSelectedTask(task)}
                            className="bg-card border border-zinc-800/80 hover:border-zinc-300/50 p-3 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 relative overflow-hidden"
                          >
                            <h4 className="font-bold text-xs text-zinc-250 truncate mb-1">
                              {task.title}
                            </h4>
                            {task.description && (
                              <p className="text-[10px] text-zinc-500 truncate mb-3">
                                {task.description}
                              </p>
                            )}
                            <div className="flex items-center justify-between text-[9px] text-zinc-500">
                              <span className={`px-2 py-0.5 rounded-full border ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </span>
                              {task.assignedTo && (
                                <span className="bg-slate-100 border border-slate-200 text-slate-500 px-1.5 py-0.5 rounded flex items-center gap-1 max-w-[100px] truncate">
                                  <User className="w-2.5 h-2.5" /> {task.assignedTo}
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 1. New Team Overlay */}
      {isNewTeamOpen && (
        <div className="fixed inset-0 bg-[#030303]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-zinc-150 mb-3">Create New Team</h3>
            <form onSubmit={handleCreateTeamSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Study Group, Launch Team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-300"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Description</label>
                <textarea
                  placeholder="What is this team working on?"
                  value={teamDesc}
                  onChange={(e) => setTeamDesc(e.target.value)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-300 h-16 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewTeamOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-[#0c0c0e] border border-zinc-800 text-xs font-semibold text-zinc-400 hover:bg-zinc-900/60 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-300 text-xs font-semibold text-black cursor-pointer"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Invite Member Overlay */}
      {isInviteOpen && (
        <div className="fixed inset-0 bg-[#030303]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-955 border border-zinc-800 rounded-xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-zinc-150 mb-3">Invite Team Member</h3>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Member Email</label>
                <input
                  type="email"
                  required
                  placeholder="collaborator@domain.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-300"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Role Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as TeamMemberRole)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none cursor-pointer"
                >
                  <option value="Member">Member (Read & Edit Tasks)</option>
                  <option value="Admin">Admin (Manage Members & Settings)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-[#0c0c0e] border border-zinc-800 text-xs font-semibold text-zinc-400 hover:bg-zinc-900/60 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-300 text-xs font-semibold text-black cursor-pointer"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add Team Task Overlay */}
      {isNewTaskOpen && (
        <div className="fixed inset-0 bg-[#030303]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-zinc-150 mb-3">Add Team Task</h3>
            <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="Task title..."
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-300"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Description</label>
                <textarea
                  placeholder="Add detailed scope..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-300 h-16 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-zinc-500 mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as TodoPriority)}
                    className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-zinc-500 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none [color-scheme:dark]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-500 mb-1">Assignee</label>
                <select
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 focus:outline-none cursor-pointer"
                >
                  <option value="">Unassigned</option>
                  {activeTeam?.members.map((email) => (
                    <option key={email} value={email}>
                      {email}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTaskOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-[#0c0c0e] border border-zinc-800 text-xs font-semibold text-zinc-400 hover:bg-zinc-900/60 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-300 text-xs font-semibold text-black cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Task Detail Drawer */}
      {selectedTask && (
        <div className="fixed inset-0 bg-[#030303]/60 backdrop-blur-sm flex items-center justify-end z-50">
          <div className="bg-zinc-950 border-l border-zinc-800 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                <h3 className="text-base font-bold text-zinc-150 truncate pr-4">{selectedTask.title}</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-zinc-400 hover:text-zinc-200 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3.5 bg-[#0c0c0e]/60 p-4 rounded-xl border border-zinc-800 text-xs text-zinc-300">
                {selectedTask.description && (
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-zinc-500 mb-1">Description</span>
                    <p className="leading-relaxed">{selectedTask.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800/40">
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-zinc-500 mb-1">Status</span>
                    <select
                      value={selectedTask.status}
                      onChange={(e) => {
                        if (selectedTeamId) {
                          const next = e.target.value as TeamTodoStatus;
                          onUpdateTeamTodo(selectedTeamId, selectedTask.id, { status: next }, currentUserName, `changed status to: ${next}`);
                          setSelectedTask({ ...selectedTask, status: next });
                        }
                      }}
                      className="bg-zinc-900 border border-zinc-800 rounded px-2 py-1 text-[10px] font-semibold focus:outline-none cursor-pointer text-zinc-250"
                    >
                      {BOARD_COLUMNS.map((col) => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-zinc-500 mb-1">Priority</span>
                    <span className={`px-2 py-0.5 rounded-full border text-[10px] ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-800/40">
                  {selectedTask.dueDate && (
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-zinc-500 mb-0.5">Due Date</span>
                      <span className="flex items-center gap-1 font-semibold text-zinc-400">
                        <Calendar className="w-3.5 h-3.5 text-zinc-500" /> {selectedTask.dueDate}
                      </span>
                    </div>
                  )}
                  {selectedTask.assignedTo && (
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-zinc-500 mb-0.5">Assignee</span>
                      <span className="flex items-center gap-1 font-semibold text-zinc-400">
                        <User className="w-3.5 h-3.5 text-zinc-500" /> {selectedTask.assignedTo}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-zinc-400" /> Comments Thread
                </h4>
                {comments.length === 0 ? (
                  <p className="text-[10px] text-zinc-500 italic">No comments written yet. Ask a question or leave notes.</p>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {comments.map((c) => (
                      <div key={c.id} className="bg-zinc-900/60 border border-zinc-800/80 p-2.5 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-zinc-200">{c.userName}</span>
                          <span className="text-zinc-500">{c.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-zinc-400" /> Activity Timeline
                </h4>
                {activities.length === 0 ? (
                  <p className="text-[10px] text-zinc-500 italic">No activities logged.</p>
                ) : (
                  <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                    {activities.map((a) => (
                      <div key={a.id} className="text-[10px] text-zinc-500 flex justify-between gap-2 border-b border-zinc-800/40 pb-1">
                        <span>
                          <strong className="text-zinc-400">{a.userName}</strong> {a.action}
                        </span>
                        <span className="text-zinc-650 shrink-0">
                          {a.createdAt.toLocaleDateString([], { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleAddComment} className="pt-4 border-t border-zinc-800 mt-4 flex gap-2">
              <input
                type="text"
                required
                placeholder="Write a comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-300"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-105 text-xs font-semibold text-black cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. Members Panel Drawer */}
      {isMembersOpen && activeTeam && (
        <div className="fixed inset-0 bg-[#030303]/60 backdrop-blur-sm flex items-center justify-end z-50">
          <div className="bg-zinc-950 border-l border-zinc-800 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
            <div className="space-y-6 flex-1 overflow-y-auto pr-1">
              <div className="flex items-center justify-between border-b border-zinc-850 pb-3">
                <h3 className="text-base font-bold text-zinc-150 flex items-center gap-2">
                  <Users2 className="w-5 h-5 text-white-400" />
                  Team Members
                </h3>
                <button
                  onClick={() => setIsMembersOpen(false)}
                  className="text-zinc-400 hover:text-zinc-200 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {(currentUserRole === "Owner" || currentUserRole === "Admin") && (
                <div className="bg-white/5 border border-white-500/20 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-200">Invite new members</h4>
                    <p className="text-[10px] text-zinc-400 mt-0.5">Add collaborators to this team board.</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsInviteOpen(true);
                      setIsMembersOpen(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-105 text-xs font-semibold text-black cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" /> Invite
                  </button>
                </div>
              )}

              <div className="space-y-3">
                <span className="block text-[10px] uppercase font-bold text-zinc-550 tracking-wider">
                  Current Members ({activeTeam.members.length})
                </span>
                <div className="space-y-2">
                  {activeTeam.members.map((email) => {
                    const isOwner = email === activeTeam.ownerEmail;
                    const isAdmin = activeTeam.admins.includes(email);
                    const isSelf = email === currentUserEmail;

                    let roleBadge = (
                      <span className="px-2 py-0.5 rounded-full border border-zinc-700/50 bg-zinc-800 text-zinc-400 text-[9px] font-bold">
                        Member
                      </span>
                    );
                    if (isOwner) {
                      roleBadge = (
                        <span className="px-2 py-0.5 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-500 text-[9px] font-bold flex items-center gap-1">
                          <Shield className="w-2.5 h-2.5" /> Owner
                        </span>
                      );
                    } else if (isAdmin) {
                      roleBadge = (
                        <span className="px-2 py-0.5 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-500 text-[9px] font-bold flex items-center gap-1">
                          <Shield className="w-2.5 h-2.5" /> Admin
                        </span>
                      );
                    }

                    return (
                      <div
                        key={email}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#0c0c0e]/60 border border-zinc-850 hover:border-zinc-800 transition-colors"
                      >
                        <div className="flex flex-col truncate pr-2">
                          <span className="text-xs text-zinc-200 truncate font-semibold">
                            {email} {isSelf && <span className="text-white-400">(You)</span>}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 shrink-0">
                          {roleBadge}
                          {!isOwner && !isSelf && (
                            <>
                              {currentUserRole === "Owner" && (
                                <div className="flex items-center space-x-1.5">
                                  {isAdmin ? (
                                    <button
                                      title="Demote to Member"
                                      onClick={async () => {
                                        const updatedAdmins = activeTeam.admins.filter((a) => a !== email);
                                        await updateTeam(activeTeam.id, { admins: updatedAdmins });
                                      }}
                                      className="text-zinc-500 hover:text-zinc-450 p-1 text-[10px] font-bold cursor-pointer"
                                    >
                                      Demote
                                    </button>
                                  ) : (
                                    <button
                                      title="Promote to Admin"
                                      onClick={async () => {
                                        const updatedAdmins = [...activeTeam.admins, email];
                                        await updateTeam(activeTeam.id, { admins: updatedAdmins });
                                      }}
                                      className="text-white-400 hover:text-white-300 p-1 text-[10px] font-bold cursor-pointer"
                                    >
                                      Make Admin
                                    </button>
                                  )}
                                  <button
                                    title="Remove from Team"
                                    onClick={() => _onRemoveMember(activeTeam.id, email)}
                                    className="text-rose-500 hover:text-rose-455 p-1 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              )}
                              {currentUserRole === "Admin" && !isAdmin && (
                                <button
                                  title="Remove from Team"
                                  onClick={() => _onRemoveMember(activeTeam.id, email)}
                                  className="text-rose-500 hover:text-rose-455 p-1 cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-855 mt-4">
              <button
                onClick={() => setIsMembersOpen(false)}
                className="w-full py-2.5 rounded-lg border border-zinc-800 text-xs font-semibold text-zinc-400 hover:bg-zinc-900/60 cursor-pointer"
              >
                Close Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Team Settings Modal */}
      {isSettingsOpen && activeTeam && (
        <div className="fixed inset-0 bg-[#030303]/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-955 border border-zinc-850 rounded-xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-zinc-855 pb-3 mb-4">
              <h3 className="text-base font-bold text-zinc-150 flex items-center gap-2">
                <Settings className="w-5 h-5 text-zinc-400" />
                Team Settings
              </h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-zinc-400 hover:text-zinc-200 p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (teamSettingsName.trim()) {
                  await updateTeam(activeTeam.id, {
                    name: teamSettingsName.trim(),
                    description: teamSettingsDesc.trim(),
                  });
                  setIsSettingsOpen(false);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-550 mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="Study Group, Launch Team..."
                  value={teamSettingsName}
                  onChange={(e) => setTeamSettingsName(e.target.value)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-white-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-zinc-550 mb-1">Description</label>
                <textarea
                  placeholder="What is this team working on?"
                  value={teamSettingsDesc}
                  onChange={(e) => setTeamSettingsDesc(e.target.value)}
                  className="w-full bg-[#0c0c0e] border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-white-500 h-20 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-[#0c0c0e] border border-zinc-800 text-xs font-semibold text-zinc-400 hover:bg-zinc-900/60 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-zinc-105 text-xs font-semibold text-black cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t border-zinc-850 space-y-3">
              <h4 className="text-xs font-bold text-rose-500 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4" /> Danger Zone
              </h4>
              <p className="text-[10px] text-zinc-400">
                Deleting this team will remove all tasks, comments, activity logs, and memberships permanently. This action cannot be undone.
              </p>
              <button
                onClick={async () => {
                  if (confirm(`Are you absolutely sure you want to delete the team "${activeTeam.name}"? This will delete all shared tasks and records permanently.`)) {
                    await deleteTeam(activeTeam.id);
                    setIsSettingsOpen(false);
                  }
                }}
                className="w-full inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-rose-500/20 bg-rose-500/10 text-rose-450 hover:bg-rose-500 hover:text-white transition-colors text-xs font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}