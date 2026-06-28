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
  currentUserEmail: _currentUserEmail,
  currentUserName,
  currentUserId,
}: TeamTodoViewProps) {
  // Dialog Open States
  const [isNewTeamOpen, setIsNewTeamOpen] = useState(false);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  
  // Selected Card for Details Panel Modal
  const [selectedTask, setSelectedTask] = useState<TeamTodo | null>(null);

  // Form Fields
  const [teamName, setTeamName] = useState("");
  const [teamDesc, setTeamDesc] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<TeamMemberRole>("Member");

  // New Team Task Form Fields
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [taskPriority, setTaskPriority] = useState<TodoPriority>("Medium");
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskAssignee, setTaskAssignee] = useState("");

  // Subscriptions for Selected Card (Comments and Activity logs)
  const [comments, setComments] = useState<TodoComment[]>([]);
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [newCommentText, setNewCommentText] = useState("");

  const activeTeam = useMemo(() => {
    return teams.find((t) => t.id === selectedTeamId) || null;
  }, [teams, selectedTeamId]);

  // Group team tasks by Kanban status
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

  // Fetch comments and activities when a task is opened
  useEffect(() => {
    if (!selectedTeamId || !selectedTask) {
      setTimeout(() => {
        setComments([]);
        setActivities([]);
      }, 0);
      return;
    }

    // Subscribe to comments
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

    // Subscribe to activities
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

  // HTML5 Drag and Drop Card handlers
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
          assignedTo: taskAssignee || undefined,
        },
        currentUserName
      );

      // Reset
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
    "Todo": "bg-slate-100 text-slate-700 border-slate-300/80 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30",
    "Review": "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30",
    "Completed": "bg-emerald-50 text-emerald-700 border-emerald-250 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30",
  };

  return (
    <div className="space-y-6">
      {/* Team navigation tabs row */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {teams.length === 0 ? (
            <span className="text-xs text-slate-400 font-medium">No teams created.</span>
          ) : (
            teams.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTeamId(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  selectedTeamId === t.id
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-slate-50 border border-slate-250/80 text-slate-500 hover:text-slate-700 hover:bg-slate-100"
                }`}
              >
                {t.name}
              </button>
            ))
          )}
          <button
            onClick={() => setIsNewTeamOpen(true)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-dashed border-indigo-400 text-xs font-semibold text-indigo-600 hover:bg-indigo-50/50 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Create Team
          </button>
        </div>

        {activeTeam && (
          <div className="flex items-center space-x-2">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Members: {activeTeam.members.length}</span>
            <button
              onClick={() => setIsInviteOpen(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[10px] text-white font-bold cursor-pointer"
            >
              <UserPlus className="w-3 h-3" /> Invite
            </button>
          </div>
        )}
      </div>

      {/* Main Kanban Workspace */}
      {!selectedTeamId ? (
        <div className="text-center py-16 bg-slate-50 border border-slate-200/60 border-dashed rounded-xl text-slate-400 text-xs font-medium">
          Select or create a Team from the tab bar above to load your team task boards.
        </div>
      ) : (
        <div className="space-y-4">
          {/* Active Board Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users2 className="w-4 h-4 text-indigo-600" />
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {activeTeam?.name} Board
              </h3>
            </div>
            <button
              onClick={() => setIsNewTaskOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Team Task
            </button>
          </div>

          {/* Kanban Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start select-none overflow-x-auto pb-4">
            {BOARD_COLUMNS.map((column) => {
              const tasks = groupedTasks[column] || [];
              return (
                <div
                  key={column}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, column)}
                  className="flex flex-col bg-slate-100/50 border border-slate-200/60 rounded-xl p-3 min-h-[400px] shrink-0"
                >
                  {/* Column Header */}
                  <div className={`flex items-center justify-between border px-2.5 py-1.5 rounded-lg text-xs font-bold mb-3 shadow-sm ${columnHeadersColors[column]}`}>
                    <span>{column}</span>
                    <span className="bg-white/90 dark:bg-slate-950/50 px-2 py-0.5 rounded text-[10px]">{tasks.length}</span>
                  </div>

                  {/* Task Cards */}
                  <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[450px]">
                    {tasks.length === 0 ? (
                      <div className="h-full border border-dashed border-slate-200/80 rounded-lg flex items-center justify-center p-6 text-slate-400 text-[10px] text-center">
                        Drag here
                      </div>
                    ) : (
                      tasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, task.id)}
                          onClick={() => setSelectedTask(task)}
                          className="bg-white border border-slate-200 hover:border-indigo-400 p-3 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition-all duration-200 relative overflow-hidden"
                        >
                          <h4 className="font-bold text-xs text-slate-800 truncate mb-1">
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-[10px] text-slate-450 truncate mb-3">{task.description}</p>
                          )}
                          <div className="flex items-center justify-between text-[9px] text-slate-400">
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
      )}

      {/* Modal Dialogs */}
      
      {/* 1. Create New Team Overlay */}
      {isNewTeamOpen && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-100 mb-3">Create Collaborative Team</h3>
            <form onSubmit={handleCreateTeamSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Study Group, Launch Team"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Description</label>
                <textarea
                  placeholder="What is this team working on?"
                  value={teamDesc}
                  onChange={(e) => setTeamDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-855 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 h-16 resize-none"
                />
              </div>
              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewTeamOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-855 text-xs font-semibold text-slate-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white cursor-pointer"
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
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-100 mb-3">Invite Team Member</h3>
            <form onSubmit={handleInviteSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Member Email</label>
                <input
                  type="email"
                  required
                  placeholder="collaborator@domain.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-855 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Role Permissions</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as TeamMemberRole)}
                  className="w-full bg-slate-950 border border-slate-855 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
                >
                  <option value="Member">Member (Read & Edit Tasks)</option>
                  <option value="Admin">Admin (Manage Members & Settings)</option>
                </select>
              </div>
              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-855 text-xs font-semibold text-slate-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white cursor-pointer"
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
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-sm w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-base font-bold text-slate-100 mb-3">Add Team Task</h3>
            <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="Task title..."
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-855 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Description</label>
                <textarea
                  placeholder="Add detailed scope..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-855 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 h-16 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Priority</label>
                  <select
                    value={taskPriority}
                    onChange={(e) => setTaskPriority(e.target.value as TodoPriority)}
                    className="w-full bg-slate-950 border border-slate-855 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskDueDate}
                    onChange={(e) => setTaskDueDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-855 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Assignee</label>
                <select
                  value={taskAssignee}
                  onChange={(e) => setTaskAssignee(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-855 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none cursor-pointer"
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
                  className="px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-855 text-xs font-semibold text-slate-400 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white cursor-pointer"
                >
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Collaborative Detail Panel Drawer (Task comments, activity logs) */}
      {selectedTask && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm flex items-center justify-end z-50">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250">
            {/* Header Drawer */}
            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-100 truncate pr-4">{selectedTask.title}</h3>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="text-slate-400 hover:text-slate-200 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Task Details Info */}
              <div className="space-y-3.5 bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs text-slate-300">
                {selectedTask.description && (
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Description</span>
                    <p className="leading-relaxed">{selectedTask.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-850/60">
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Status</span>
                    <select
                      value={selectedTask.status}
                      onChange={(e) => {
                        if (selectedTeamId) {
                          const next = e.target.value as TeamTodoStatus;
                          onUpdateTeamTodo(selectedTeamId, selectedTask.id, { status: next }, currentUserName, `changed status to: ${next}`);
                          setSelectedTask({ ...selectedTask, status: next });
                        }
                      }}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[10px] font-semibold focus:outline-none cursor-pointer"
                    >
                      {BOARD_COLUMNS.map((col) => (
                        <option key={col} value={col}>{col}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-500 mb-1">Priority</span>
                    <span className={`px-2 py-0.5 rounded-full border ${getPriorityColor(selectedTask.priority)}`}>
                      {selectedTask.priority}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-855">
                  {selectedTask.dueDate && (
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-500 mb-0.5">Due Date</span>
                      <span className="flex items-center gap-1 font-semibold text-slate-400">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" /> {selectedTask.dueDate}
                      </span>
                    </div>
                  )}
                  {selectedTask.assignedTo && (
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-500 mb-0.5">Assignee</span>
                      <span className="flex items-center gap-1 font-semibold text-slate-400">
                        <User className="w-3.5 h-3.5 text-slate-500" /> {selectedTask.assignedTo}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Collaborative Comments Stream */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-indigo-400" /> Comments Thread
                </h4>

                {comments.length === 0 ? (
                  <p className="text-[10px] text-slate-500 italic">No comments written yet. Ask a question or leave notes.</p>
                ) : (
                  <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
                    {comments.map((c) => (
                      <div key={c.id} className="bg-slate-950 border border-slate-850 p-2.5 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between items-center text-[10px]">
                          <span className="font-bold text-indigo-400">{c.userName}</span>
                          <span className="text-slate-600">{c.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        </div>
                        <p className="text-slate-350 leading-relaxed">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Timeline Logs Activity Feed */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-400" /> Activity Timeline
                </h4>
                
                {activities.length === 0 ? (
                  <p className="text-[10px] text-slate-500 italic">No activities logged.</p>
                ) : (
                  <div className="space-y-2 max-h-[150px] overflow-y-auto pr-1">
                    {activities.map((a) => (
                      <div key={a.id} className="text-[10px] text-slate-500 flex justify-between gap-2 border-b border-slate-855 pb-1">
                        <span>
                          <strong className="text-slate-400">{a.userName}</strong> {a.action}
                        </span>
                        <span className="text-slate-600 shrink-0">
                          {a.createdAt.toLocaleDateString([], { month: "short", day: "numeric" })}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom comment composer box */}
            <form onSubmit={handleAddComment} className="pt-4 border-t border-slate-800 mt-4 flex gap-2">
              <input
                type="text"
                required
                placeholder="Write a comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-855 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white cursor-pointer"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
