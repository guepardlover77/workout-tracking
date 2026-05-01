import client from "./client";
import type { Workout, WorkoutDetail, WorkoutExercise } from "../types";

export const getWorkouts = () =>
  client.get<Workout[]>("/workouts").then((r) => r.data);

export const getWorkout = (id: number) =>
  client.get<WorkoutDetail>(`/workouts/${id}`).then((r) => r.data);

export const createWorkout = (data: {
  date: string;
  name?: string;
  notes?: string;
}) => client.post<Workout>("/workouts", data).then((r) => r.data);

export const updateWorkout = (
  id: number,
  data: { name?: string; date?: string; notes?: string }
) => client.put<Workout>(`/workouts/${id}`, data).then((r) => r.data);

export const deleteWorkout = (id: number) =>
  client.delete(`/workouts/${id}`);

export const addExerciseToWorkout = (
  workoutId: number,
  data: { exercise_id: number; order_index?: number; notes?: string }
) =>
  client
    .post<WorkoutExercise>(`/workouts/${workoutId}/exercises`, data)
    .then((r) => r.data);

export const removeExerciseFromWorkout = (
  workoutId: number,
  weId: number
) => client.delete(`/workouts/${workoutId}/exercises/${weId}`);
