import {
  FirestoreHabitRepository,
  FirestoreJobTrackerRepository,
  FirestoreTodoRepository,
} from "./firestoreRepository";

export const habitRepository = new FirestoreHabitRepository();
export const jobTrackerRepository = new FirestoreJobTrackerRepository();
export const todoRepository = new FirestoreTodoRepository();
