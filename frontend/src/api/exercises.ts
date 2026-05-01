import client from "./client";
import type { Exercise } from "../types";

export const getExercises = () =>
  client.get<Exercise[]>("/exercises").then((r) => r.data);

export const getExercise = (id: number) =>
  client.get<Exercise>(`/exercises/${id}`).then((r) => r.data);

export const createExercise = (data: {
  name: string;
  category?: string;
  description?: string;
}) => client.post<Exercise>("/exercises", data).then((r) => r.data);

export const updateExercise = (
  id: number,
  data: { name?: string; category?: string; description?: string }
) => client.put<Exercise>(`/exercises/${id}`, data).then((r) => r.data);

export const deleteExercise = (id: number) =>
  client.delete(`/exercises/${id}`);
