import client from "./client";
import type { WorkoutTemplate, WorkoutTemplateDetail, Workout } from "../types";

export const getTemplates = () =>
  client.get<WorkoutTemplate[]>("/templates").then((r) => r.data);

export const getTemplate = (id: number) =>
  client.get<WorkoutTemplateDetail>(`/templates/${id}`).then((r) => r.data);

export const createTemplate = (data: {
  name: string;
  description?: string;
}) =>
  client
    .post<WorkoutTemplate>("/templates", data)
    .then((r) => r.data);

export const updateTemplate = (
  id: number,
  data: { name?: string; description?: string }
) =>
  client
    .put<WorkoutTemplate>(`/templates/${id}`, data)
    .then((r) => r.data);

export const deleteTemplate = (id: number) =>
  client.delete(`/templates/${id}`);

export const addExerciseToTemplate = (
  templateId: number,
  data: {
    exercise_id: number;
    order_index?: number;
    default_sets?: number;
    notes?: string;
  }
) =>
  client
    .post(`/templates/${templateId}/exercises`, data)
    .then((r) => r.data);

export const removeExerciseFromTemplate = (
  templateId: number,
  teId: number
) => client.delete(`/templates/${templateId}/exercises/${teId}`);

export const generateWorkout = (templateId: number, date: string) =>
  client
    .post<Workout>(`/templates/${templateId}/generate`, { date })
    .then((r) => r.data);
