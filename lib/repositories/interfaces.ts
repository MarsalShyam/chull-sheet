// Type definitions and Repository interfaces for ChullSheet modules

// ==========================================
// 1. HABIT TRACKING TYPES
// ==========================================

export type HabitEntryStatus = "completed" | "skipped" | "missed";

export interface Habit {
  id: string;
  name: string;
  color: string; // Tailwind class or hex color
  createdAt: Date;
  order: number;
}

export type HabitEntries = Record<string, Record<string, HabitEntryStatus>>; // { [dateStr]: { [habitId]: status } }

export interface IHabitRepository {
  getHabits(userId: string): Promise<Habit[]>;
  createHabit(userId: string, name: string, color: string, order: number): Promise<string>;
  updateHabit(userId: string, habitId: string, updates: Partial<Omit<Habit, "id" | "createdAt">>): Promise<void>;
  deleteHabit(userId: string, habitId: string): Promise<void>;
  setHabitEntry(userId: string, dateStr: string, habitId: string, status: HabitEntryStatus | null): Promise<void>;
  getHabitEntries(userId: string, startDateStr: string, endDateStr: string): Promise<Record<string, Record<string, HabitEntryStatus>>>;
}

// ==========================================
// 2. JOB APPLICATION TRACKER TYPES
// ==========================================

export type JobStage = "To Apply" | "Applied" | "Interview Call" | "No Answer" | "Offer" | "Rejected";

export interface QAItem {
  id: string;
  question: string;
  answer: string;
}

export interface JobApplication {
  id: string;
  companyName: string;
  position: string;
  link: string;
  stage: JobStage;
  location?: string;
  salary?: string;
  recruiterName?: string;
  recruiterEmail?: string;
  dateApplied?: string; // YYYY-MM-DD
  createdAt: Date;
  updatedAt: Date;
  questions: QAItem[];
}

export interface IJobTrackerRepository {
  getApplications(userId: string): Promise<JobApplication[]>;
  createApplication(userId: string, app: Omit<JobApplication, "id" | "createdAt" | "updatedAt">): Promise<string>;
  updateApplication(userId: string, id: string, updates: Partial<Omit<JobApplication, "id" | "createdAt" | "updatedAt">>): Promise<void>;
  deleteApplication(userId: string, id: string): Promise<void>;
  getApplication(userId: string, id: string): Promise<JobApplication | null>;
}

// ==========================================
// 3. TODO TYPES
// ==========================================

export type TodoPriority = "Low" | "Medium" | "High";

export interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TodoPriority;
  dueDate?: string; // YYYY-MM-DD
  labels: string[];
  checklist: ChecklistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export type TeamTodoStatus = "Todo" | "In Progress" | "Review" | "Completed";

export interface TeamTodo {
  id: string;
  title: string;
  description?: string;
  status: TeamTodoStatus;
  priority: TodoPriority;
  dueDate?: string; // YYYY-MM-DD
  labels: string[];
  checklist: ChecklistItem[];
  assignedTo?: string; // Member email
  createdAt: Date;
  updatedAt: Date;
}

export type TeamMemberRole = "Owner" | "Admin" | "Member";

export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  ownerEmail: string;
  members: string[]; // Array of member emails/userIDs for fast auth check
  admins: string[];  // Array of admin emails/userIDs
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoComment {
  id: string;
  todoId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: Date;
}

export interface ActivityLog {
  id: string;
  todoId: string;
  userId: string;
  userName: string;
  action: string; // e.g. "created task", "moved to In Progress"
  createdAt: Date;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  link?: string; // Optional path to navigate when clicked
  createdAt: Date;
}

export interface ITodoRepository {
  // Personal Todo
  getPersonalTodos(userId: string): Promise<Todo[]>;
  createPersonalTodo(userId: string, todo: Omit<Todo, "id" | "createdAt" | "updatedAt">): Promise<string>;
  updatePersonalTodo(userId: string, todoId: string, updates: Partial<Omit<Todo, "id" | "createdAt" | "updatedAt">>): Promise<void>;
  deletePersonalTodo(userId: string, todoId: string): Promise<void>;
  
  // Teams
  getTeams(userEmail: string): Promise<Team[]>;
  createTeam(team: Omit<Team, "id" | "createdAt" | "updatedAt">): Promise<string>;
  updateTeam(teamId: string, updates: Partial<Omit<Team, "id" | "createdAt" | "updatedAt">>): Promise<void>;
  deleteTeam(teamId: string): Promise<void>;
  inviteMember(teamId: string, email: string, role: TeamMemberRole): Promise<void>;
  removeMember(teamId: string, email: string): Promise<void>;
  
  // Team Todos
  getTeamTodos(teamId: string): Promise<TeamTodo[]>;
  createTeamTodo(teamId: string, todo: Omit<TeamTodo, "id" | "createdAt" | "updatedAt">, userId: string, userName: string): Promise<string>;
  updateTeamTodo(teamId: string, todoId: string, updates: Partial<Omit<TeamTodo, "id" | "createdAt" | "updatedAt">>, userId: string, userName: string, actionMsg?: string): Promise<void>;
  deleteTeamTodo(teamId: string, todoId: string): Promise<void>;
  
  // Comments
  getComments(teamId: string, todoId: string): Promise<TodoComment[]>;
  addComment(teamId: string, comment: Omit<TodoComment, "id" | "createdAt">): Promise<string>;
  deleteComment(teamId: string, commentId: string): Promise<void>;
  
  // Activity logs
  getActivityLogs(teamId: string, todoId: string): Promise<ActivityLog[]>;
  
  // Notifications
  getNotifications(userId: string): Promise<UserNotification[]>;
  markNotificationAsRead(userId: string, notificationId: string): Promise<void>;
  createNotification(userId: string, title: string, message: string, link?: string): Promise<string>;
}
