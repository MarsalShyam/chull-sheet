import { db } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  writeBatch,
  deleteField,
  documentId,
  limit,
} from "firebase/firestore";
import {
  IHabitRepository,
  IJobTrackerRepository,
  ITodoRepository,
  Habit,
  HabitEntryStatus,
  JobApplication,
  JobStage,
  Todo,
  TeamTodo,
  Team,
  TodoComment,
  ActivityLog,
  UserNotification,
  TeamMemberRole,
} from "./interfaces";

// Helper to safely convert Firestore timestamps or strings to JS Dates
function toDateTime(value: unknown): Date {
  if (!value) return new Date();
  if (value && typeof value === "object" && "toDate" in value && typeof (value as { toDate: () => Date }).toDate === "function") {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date(value as string | number);
}

// ==========================================
// 1. FIRESTORE HABIT REPOSITORY
// ==========================================

export class FirestoreHabitRepository implements IHabitRepository {
  async getHabits(userId: string): Promise<Habit[]> {
    const habitsCol = collection(db, "users", userId, "habits");
    const q = query(habitsCol, orderBy("order", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name || "",
        color: data.color || "blue",
        createdAt: toDateTime(data.createdAt),
        order: typeof data.order === "number" ? data.order : 0,
      };
    });
  }

  async createHabit(userId: string, name: string, color: string, order: number): Promise<string> {
    const habitsCol = collection(db, "users", userId, "habits");
    const docRef = await addDoc(habitsCol, {
      name,
      color,
      order,
      createdAt: new Date(),
    });
    return docRef.id;
  }

  async updateHabit(userId: string, habitId: string, updates: Partial<Omit<Habit, "id" | "createdAt">>): Promise<void> {
    const habitDoc = doc(db, "users", userId, "habits", habitId);
    await updateDoc(habitDoc, updates);
  }

  async deleteHabit(userId: string, habitId: string): Promise<void> {
    const habitDoc = doc(db, "users", userId, "habits", habitId);
    await deleteDoc(habitDoc);
  }

  async setHabitEntry(userId: string, dateStr: string, habitId: string, status: HabitEntryStatus | null): Promise<void> {
    const entryDoc = doc(db, "users", userId, "habitEntries", dateStr);
    if (status === null) {
      await setDoc(entryDoc, { [habitId]: deleteField() }, { merge: true });
    } else {
      await setDoc(entryDoc, { [habitId]: status }, { merge: true });
    }
  }

  async getHabitEntries(userId: string, startDateStr: string, endDateStr: string): Promise<Record<string, Record<string, HabitEntryStatus>>> {
    const entriesCol = collection(db, "users", userId, "habitEntries");
    // Query entries where the document ID is between startDateStr and endDateStr
    const q = query(
      entriesCol,
      where(documentId(), ">=", startDateStr),
      where(documentId(), "<=", endDateStr)
    );
    const snap = await getDocs(q);
    const result: Record<string, Record<string, HabitEntryStatus>> = {};
    snap.docs.forEach((d) => {
      result[d.id] = d.data() as Record<string, HabitEntryStatus>;
    });
    return result;
  }
}

// ==========================================
// 2. FIRESTORE JOB TRACKER REPOSITORY
// ==========================================

export class FirestoreJobTrackerRepository implements IJobTrackerRepository {
  async getApplications(userId: string): Promise<JobApplication[]> {
    const appsCol = collection(db, "users", userId, "jobApplications");
    const q = query(appsCol, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        companyName: data.companyName || "",
        position: data.position || "",
        link: data.link || "",
        stage: (data.stage as JobStage) || "To Apply",
        location: data.location || "",
        salary: data.salary || "",
        recruiterName: data.recruiterName || "",
        recruiterEmail: data.recruiterEmail || "",
        dateApplied: data.dateApplied || "",
        createdAt: toDateTime(data.createdAt),
        updatedAt: toDateTime(data.updatedAt),
        questions: data.questions || [],
      };
    });
  }

  async createApplication(userId: string, app: Omit<JobApplication, "id" | "createdAt" | "updatedAt">): Promise<string> {
    const appsCol = collection(db, "users", userId, "jobApplications");
    const now = new Date();
    const docRef = await addDoc(appsCol, {
      ...app,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  async updateApplication(userId: string, id: string, updates: Partial<Omit<JobApplication, "id" | "createdAt" | "updatedAt">>): Promise<void> {
    const appDoc = doc(db, "users", userId, "jobApplications", id);
    await updateDoc(appDoc, {
      ...updates,
      updatedAt: new Date(),
    });
  }

  async deleteApplication(userId: string, id: string): Promise<void> {
    const appDoc = doc(db, "users", userId, "jobApplications", id);
    await deleteDoc(appDoc);
  }

  async getApplication(userId: string, id: string): Promise<JobApplication | null> {
    const appDoc = doc(db, "users", userId, "jobApplications", id);
    const snap = await getDoc(appDoc);
    if (!snap.exists()) return null;
    const data = snap.data();
    return {
      id: snap.id,
      companyName: data.companyName || "",
      position: data.position || "",
      link: data.link || "",
      stage: (data.stage as JobStage) || "To Apply",
      location: data.location || "",
      salary: data.salary || "",
      recruiterName: data.recruiterName || "",
      recruiterEmail: data.recruiterEmail || "",
      dateApplied: data.dateApplied || "",
      createdAt: toDateTime(data.createdAt),
      updatedAt: toDateTime(data.updatedAt),
      questions: data.questions || [],
    };
  }
}

// ==========================================
// 3. FIRESTORE TODO REPOSITORY
// ==========================================

export class FirestoreTodoRepository implements ITodoRepository {
  // --- Personal Todos ---
  async getPersonalTodos(userId: string): Promise<Todo[]> {
    const todosCol = collection(db, "users", userId, "personalTodos");
    const q = query(todosCol, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "",
        description: data.description || "",
        completed: !!data.completed,
        priority: data.priority || "Medium",
        dueDate: data.dueDate || "",
        labels: data.labels || [],
        checklist: data.checklist || [],
        createdAt: toDateTime(data.createdAt),
        updatedAt: toDateTime(data.updatedAt),
      };
    });
  }

  async createPersonalTodo(userId: string, todo: Omit<Todo, "id" | "createdAt" | "updatedAt">): Promise<string> {
    const todosCol = collection(db, "users", userId, "personalTodos");
    const now = new Date();
    const docRef = await addDoc(todosCol, {
      ...todo,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  }

  async updatePersonalTodo(userId: string, todoId: string, updates: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>): Promise<void> {
    const todoDoc = doc(db, "users", userId, "personalTodos", todoId);
    await updateDoc(todoDoc, {
      ...updates,
      updatedAt: new Date(),
    });
  }

  async deletePersonalTodo(userId: string, todoId: string): Promise<void> {
    const todoDoc = doc(db, "users", userId, "personalTodos", todoId);
    await deleteDoc(todoDoc);
  }

  // --- Teams ---
  async getTeams(userEmail: string): Promise<Team[]> {
    const teamsCol = collection(db, "teams");
    const q = query(teamsCol, where("members", "array-contains", userEmail), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        name: data.name || "",
        description: data.description || "",
        ownerId: data.ownerId || "",
        ownerEmail: data.ownerEmail || "",
        members: data.members || [],
        admins: data.admins || [],
        createdAt: toDateTime(data.createdAt),
        updatedAt: toDateTime(data.updatedAt),
      };
    });
  }

  async createTeam(team: Omit<Team, "id" | "createdAt" | "updatedAt">): Promise<string> {
    const teamsCol = collection(db, "teams");
    const now = new Date();
    const docRef = await addDoc(teamsCol, {
      ...team,
      createdAt: now,
      updatedAt: now,
    });

    const batch = writeBatch(db);
    // Add memberships for owner/members
    team.members.forEach((email) => {
      const role: TeamMemberRole = email === team.ownerEmail ? "Owner" : "Member";
      const membershipDoc = doc(db, "users", email, "teamMemberships", docRef.id);
      batch.set(membershipDoc, {
        teamId: docRef.id,
        teamName: team.name,
        role,
        joinedAt: now,
      });
    });
    await batch.commit();

    return docRef.id;
  }

  async updateTeam(teamId: string, updates: Partial<Omit<Team, "id" | "createdAt" | "updatedAt">>): Promise<void> {
    const teamDoc = doc(db, "teams", teamId);
    await updateDoc(teamDoc, {
      ...updates,
      updatedAt: new Date(),
    });

    // If name changes, sync it to users memberships
    if (updates.name) {
      const snap = await getDoc(teamDoc);
      if (snap.exists()) {
        const teamData = snap.data();
        const members: string[] = teamData.members || [];
        const batch = writeBatch(db);
        members.forEach((email) => {
          const membershipDoc = doc(db, "users", email, "teamMemberships", teamId);
          batch.update(membershipDoc, { teamName: updates.name });
        });
        await batch.commit();
      }
    }
  }

  async deleteTeam(teamId: string): Promise<void> {
    const teamDoc = doc(db, "teams", teamId);
    const snap = await getDoc(teamDoc);
    if (!snap.exists()) return;
    const teamData = snap.data();
    const members: string[] = teamData.members || [];

    const batch = writeBatch(db);
    // Delete memberships
    members.forEach((email) => {
      const membershipDoc = doc(db, "users", email, "teamMemberships", teamId);
      batch.delete(membershipDoc);
    });
    // Delete team doc
    batch.delete(teamDoc);
    await batch.commit();
  }

  async inviteMember(teamId: string, email: string, role: TeamMemberRole): Promise<void> {
    const teamDoc = doc(db, "teams", teamId);
    const teamSnap = await getDoc(teamDoc);
    if (!teamSnap.exists()) return;
    const teamData = teamSnap.data();
    const members: string[] = teamData.members || [];
    const admins: string[] = teamData.admins || [];

    if (!members.includes(email)) {
      members.push(email);
    }
    if (role === "Admin" && !admins.includes(email)) {
      admins.push(email);
    }

    const batch = writeBatch(db);
    batch.update(teamDoc, { members, admins, updatedAt: new Date() });

    const membershipDoc = doc(db, "users", email, "teamMemberships", teamId);
    batch.set(membershipDoc, {
      teamId,
      teamName: teamData.name || "",
      role,
      joinedAt: new Date(),
    });

    await batch.commit();
  }

  async removeMember(teamId: string, email: string): Promise<void> {
    const teamDoc = doc(db, "teams", teamId);
    const teamSnap = await getDoc(teamDoc);
    if (!teamSnap.exists()) return;
    const teamData = teamSnap.data();
    const members = (teamData.members || []).filter((m: string) => m !== email);
    const admins = (teamData.admins || []).filter((a: string) => a !== email);

    const batch = writeBatch(db);
    batch.update(teamDoc, { members, admins, updatedAt: new Date() });

    const membershipDoc = doc(db, "users", email, "teamMemberships", teamId);
    batch.delete(membershipDoc);

    await batch.commit();
  }

  // --- Team Todos ---
  async getTeamTodos(teamId: string): Promise<TeamTodo[]> {
    const todosCol = collection(db, "teams", teamId, "todos");
    const q = query(todosCol, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "",
        description: data.description || "",
        status: data.status || "Todo",
        priority: data.priority || "Medium",
        dueDate: data.dueDate || "",
        labels: data.labels || [],
        checklist: data.checklist || [],
        assignedTo: data.assignedTo || "",
        createdAt: toDateTime(data.createdAt),
        updatedAt: toDateTime(data.updatedAt),
      };
    });
  }

  async createTeamTodo(teamId: string, todo: Omit<TeamTodo, "id" | "createdAt" | "updatedAt">, userId: string, userName: string): Promise<string> {
    const todosCol = collection(db, "teams", teamId, "todos");
    const now = new Date();
    
    // Sanitize values to avoid passing undefined values to Firestore
    const cleanedTodo = Object.fromEntries(
      Object.entries(todo).map(([key, val]) => [key, val === undefined ? "" : val])
    );

    const docRef = await addDoc(todosCol, {
      ...cleanedTodo,
      createdAt: now,
      updatedAt: now,
    });

    // Add activity log
    const activitiesCol = collection(db, "teams", teamId, "activities");
    await addDoc(activitiesCol, {
      todoId: docRef.id,
      userId,
      userName,
      action: `created task: "${todo.title}"`,
      createdAt: now,
    });

    // Notify assignee if set
    if (todo.assignedTo) {
      await this.createNotification(
        todo.assignedTo,
        "Task Assigned",
        `${userName} assigned you the task: "${todo.title}"`,
        `/todo?teamId=${teamId}&todoId=${docRef.id}`
      );
    }

    return docRef.id;
  }

  async updateTeamTodo(
    teamId: string,
    todoId: string,
    updates: Partial<Omit<TeamTodo, "id" | "createdAt" | "updatedAt">>,
    userId: string,
    userName: string,
    actionMsg?: string
  ): Promise<void> {
    const todoDoc = doc(db, "teams", teamId, "todos", todoId);
    const snap = await getDoc(todoDoc);
    const oldTodo = snap.exists() ? snap.data() : null;

    // Sanitize values to avoid passing undefined values to Firestore
    const cleanedUpdates = Object.fromEntries(
      Object.entries(updates).map(([key, val]) => [key, val === undefined ? "" : val])
    );

    await updateDoc(todoDoc, {
      ...cleanedUpdates,
      updatedAt: new Date(),
    });

    // Log Activity
    const actCol = collection(db, "teams", teamId, "activities");
    const msg = actionMsg || `updated task details`;
    await addDoc(actCol, {
      todoId,
      userId,
      userName,
      action: msg,
      createdAt: new Date(),
    });

    // Notify on assignment change
    if (updates.assignedTo && oldTodo && oldTodo.assignedTo !== updates.assignedTo) {
      await this.createNotification(
        updates.assignedTo,
        "Task Assigned",
        `${userName} assigned you the task: "${updates.title || oldTodo.title}"`,
        `/todo?teamId=${teamId}&todoId=${todoId}`
      );
    }
  }

  async deleteTeamTodo(teamId: string, todoId: string): Promise<void> {
    const todoDoc = doc(db, "teams", teamId, "todos", todoId);
    await deleteDoc(todoDoc);
  }

  // --- Comments ---
  async getComments(teamId: string, todoId: string): Promise<TodoComment[]> {
    const commentsCol = collection(db, "teams", teamId, "comments");
    const q = query(commentsCol, where("todoId", "==", todoId), orderBy("createdAt", "asc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        todoId: data.todoId,
        userId: data.userId,
        userName: data.userName,
        userAvatar: data.userAvatar || "",
        text: data.text || "",
        createdAt: toDateTime(data.createdAt),
      };
    });
  }

  async addComment(teamId: string, comment: Omit<TodoComment, "id" | "createdAt">): Promise<string> {
    const commentsCol = collection(db, "teams", teamId, "comments");
    const docRef = await addDoc(commentsCol, {
      ...comment,
      createdAt: new Date(),
    });

    // Activity Log
    const actCol = collection(db, "teams", teamId, "activities");
    await addDoc(actCol, {
      todoId: comment.todoId,
      userId: comment.userId,
      userName: comment.userName,
      action: `added a comment: "${comment.text.substring(0, 30)}${comment.text.length > 30 ? "..." : ""}"`,
      createdAt: new Date(),
    });

    // Notify assignee if not the commenter
    const todoDoc = doc(db, "teams", teamId, "todos", comment.todoId);
    const todoSnap = await getDoc(todoDoc);
    if (todoSnap.exists()) {
      const todoData = todoSnap.data();
      if (todoData.assignedTo && todoData.assignedTo !== comment.userId) {
        await this.createNotification(
          todoData.assignedTo,
          "New Comment",
          `${comment.userName} commented on "${todoData.title}": "${comment.text.substring(0, 50)}"`,
          `/todo?teamId=${teamId}&todoId=${comment.todoId}`
        );
      }
    }

    return docRef.id;
  }

  async deleteComment(teamId: string, commentId: string): Promise<void> {
    const commentDoc = doc(db, "teams", teamId, "comments", commentId);
    await deleteDoc(commentDoc);
  }

  // --- Activity Logs ---
  async getActivityLogs(teamId: string, todoId: string): Promise<ActivityLog[]> {
    const actCol = collection(db, "teams", teamId, "activities");
    const q = query(actCol, where("todoId", "==", todoId), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        todoId: data.todoId,
        userId: data.userId,
        userName: data.userName,
        action: data.action || "",
        createdAt: toDateTime(data.createdAt),
      };
    });
  }

  // --- Notifications ---
  async getNotifications(userId: string): Promise<UserNotification[]> {
    const notifCol = collection(db, "users", userId, "notifications");
    const q = query(notifCol, orderBy("createdAt", "desc"), limit(50));
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        title: data.title || "",
        message: data.message || "",
        read: !!data.read,
        link: data.link || "",
        createdAt: toDateTime(data.createdAt),
      };
    });
  }

  async markNotificationAsRead(userId: string, notificationId: string): Promise<void> {
    const notifDoc = doc(db, "users", userId, "notifications", notificationId);
    await updateDoc(notifDoc, { read: true });
  }

  async createNotification(userId: string, title: string, message: string, link?: string): Promise<string> {
    const notifCol = collection(db, "users", userId, "notifications");
    const docRef = await addDoc(notifCol, {
      title,
      message,
      read: false,
      link: link || "",
      createdAt: new Date(),
    });
    return docRef.id;
  }
}
