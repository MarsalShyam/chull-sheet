"use client";

import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db } from "@/firebase";
import { todoRepository } from "@/lib/repositories";
import { 
  Todo, 
  TeamTodo, 
  Team, 
  UserNotification, 
  TeamMemberRole,
} from "@/lib/repositories/interfaces";
import { toast } from "sonner";

export function useTodos(userId: string | null | undefined, userEmail: string | null | undefined) {
  // Personal Todos state
  const [personalTodos, setPersonalTodos] = useState<Todo[]>([]);
  const [personalLoading, setPersonalLoading] = useState(true);

  // Teams state
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamsLoading, setTeamsLoading] = useState(true);

  // Selected team state
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [teamTodos, setTeamTodos] = useState<TeamTodo[]>([]);
  const [teamTodosLoading, setTeamTodosLoading] = useState(false);

  // Notifications state
  const [notifications, setNotifications] = useState<UserNotification[]>([]);

  // 1. Subscribe to Personal Todos
  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        setPersonalTodos([]);
        setPersonalLoading(false);
      }, 0);
      return;
    }

    setTimeout(() => {
      setPersonalLoading(true);
    }, 0);
    const personalCol = collection(db, "users", userId, "personalTodos");
    const q = query(personalCol, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const list: Todo[] = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            description: data.description || "",
            completed: !!data.completed,
            priority: data.priority || "Medium",
            dueDate: data.dueDate || "",
            labels: data.labels || [],
            checklist: data.checklist || [],
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        });
        setPersonalTodos(list);
        setPersonalLoading(false);
      },
      (err) => {
        console.error("Personal Todos error:", err);
        setPersonalLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // 2. Subscribe to User's Teams
  useEffect(() => {
    if (!userEmail) {
      setTimeout(() => {
        setTeams([]);
        setTeamsLoading(false);
      }, 0);
      return;
    }

    setTimeout(() => {
      setTeamsLoading(true);
    }, 0);
    const teamsCol = collection(db, "teams");
    const q = query(teamsCol, where("members", "array-contains", userEmail), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const list: Team[] = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "",
            description: data.description || "",
            ownerId: data.ownerId || "",
            ownerEmail: data.ownerEmail || "",
            members: data.members || [],
            admins: data.admins || [],
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        });
        setTeams(list);
        setTeamsLoading(false);
      },
      (err) => {
        console.error("Teams subscription error:", err);
        setTeamsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userEmail]);

  // 3. Subscribe to Team Todos on team selection
  useEffect(() => {
    if (!selectedTeamId) {
      setTimeout(() => {
        setTeamTodos([]);
        setTeamTodosLoading(false);
      }, 0);
      return;
    }

    setTimeout(() => {
      setTeamTodosLoading(true);
    }, 0);
    const teamTodosCol = collection(db, "teams", selectedTeamId, "todos");
    const q = query(teamTodosCol, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const list: TeamTodo[] = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            description: data.description || "",
            status: data.status || "Todo",
            priority: data.priority || "Medium",
            dueDate: data.dueDate || "",
            labels: data.labels || [],
            checklist: data.checklist || [],
            assignedTo: data.assignedTo || "",
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        });
        setTeamTodos(list);
        setTeamTodosLoading(false);
      },
      (err) => {
        console.error("Team Todos error:", err);
        setTeamTodosLoading(false);
      }
    );

    return () => unsubscribe();
  }, [selectedTeamId]);

  // 4. Subscribe to Notifications
  useEffect(() => {
    if (!userId) {
      setTimeout(() => {
        setNotifications([]);
      }, 0);
      return;
    }

    const notCol = collection(db, "users", userId, "notifications");
    const q = query(notCol, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        const list: UserNotification[] = snap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            message: data.message || "",
            read: !!data.read,
            link: data.link || "",
            createdAt: data.createdAt?.toDate() || new Date(),
          };
        });
        setNotifications(list);
      },
      (err) => {
        console.error("Notifications error:", err);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // --- Personal Todo Actions ---
  const addPersonalTodo = async (todoData: Omit<Todo, "id" | "createdAt" | "updatedAt">) => {
    if (!userId) return;
    try {
      await todoRepository.createPersonalTodo(userId, todoData);
      toast.success("Task added.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add task.");
    }
  };

  const updatePersonalTodo = async (todoId: string, updates: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>) => {
    if (!userId) return;
    try {
      await todoRepository.updatePersonalTodo(userId, todoId, updates);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update task.");
    }
  };

  const deletePersonalTodo = async (todoId: string) => {
    if (!userId) return;
    try {
      await todoRepository.deletePersonalTodo(userId, todoId);
      toast.success("Task deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete task.");
    }
  };

  // --- Team Actions ---
  const createTeam = async (name: string, description: string) => {
    if (!userId || !userEmail) return;
    try {
      const teamId = await todoRepository.createTeam({
        name,
        description,
        ownerId: userId,
        ownerEmail: userEmail,
        members: [userEmail],
        admins: [userEmail],
      });
      toast.success(`Team "${name}" created successfully!`);
      setSelectedTeamId(teamId);
      return teamId;
    } catch (err) {
      console.error(err);
      toast.error("Failed to create team.");
    }
  };

  const inviteMember = async (teamId: string, email: string, role: TeamMemberRole) => {
    try {
      await todoRepository.inviteMember(teamId, email, role);
      toast.success(`Invited ${email} to team.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to invite member.");
    }
  };

  const removeMember = async (teamId: string, email: string) => {
    try {
      await todoRepository.removeMember(teamId, email);
      toast.success(`Removed ${email} from team.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove member.");
    }
  };

  // --- Team Todo Actions ---
  const addTeamTodo = async (teamId: string, todoData: Omit<TeamTodo, "id" | "createdAt" | "updatedAt">, userName: string) => {
    if (!userId) return;
    try {
      await todoRepository.createTeamTodo(teamId, todoData, userId, userName);
      toast.success("Team task added.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add team task.");
    }
  };

  const updateTeamTodo = async (
    teamId: string,
    todoId: string,
    updates: Partial<Omit<TeamTodo, "id" | "createdAt" | "updatedAt">>,
    userName: string,
    actionMsg?: string
  ) => {
    if (!userId) return;

    // Optimistically update Team Todo status for board drag-and-drop
    const previousTeamTodos = [...teamTodos];
    if (updates.status) {
      setTeamTodos((prev) =>
        prev.map((t) => (t.id === todoId ? { ...t, status: updates.status!, updatedAt: new Date() } : t))
      );
    }

    try {
      await todoRepository.updateTeamTodo(teamId, todoId, updates, userId, userName, actionMsg);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update team task.");
      // Rollback on failure
      setTeamTodos(previousTeamTodos);
    }
  };

  const deleteTeamTodo = async (teamId: string, todoId: string) => {
    try {
      await todoRepository.deleteTeamTodo(teamId, todoId);
      toast.success("Team task deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete team task.");
    }
  };

  // --- Notification Actions ---
  const markNotificationRead = async (notifId: string) => {
    if (!userId) return;
    try {
      await todoRepository.markNotificationAsRead(userId, notifId);
    } catch (err) {
      console.error(err);
    }
  };

  return {
    personalTodos,
    personalLoading,
    teams,
    teamsLoading,
    selectedTeamId,
    setSelectedTeamId,
    teamTodos,
    teamTodosLoading,
    notifications,

    // Personal Actions
    addPersonalTodo,
    updatePersonalTodo,
    deletePersonalTodo,

    // Team Actions
    createTeam,
    inviteMember,
    removeMember,

    // Team Todo Actions
    addTeamTodo,
    updateTeamTodo,
    deleteTeamTodo,

    // Notifications
    markNotificationRead,
  };
}
