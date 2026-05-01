import client from "./client";
import type { Set } from "../types";

export const getSets = (weId: number) =>
  client
    .get<Set[]>(`/workout-exercises/${weId}/sets`)
    .then((r) => r.data);

export const createSet = (
  weId: number,
  data: {
    weight_kg?: number | null;
    reps?: number | null;
    time_seconds?: number | null;
    distance_meters?: number | null;
    rpe?: number | null;
    notes?: string | null;
  }
) =>
  client
    .post<Set>(`/workout-exercises/${weId}/sets`, data)
    .then((r) => r.data);

export const updateSet = (
  setId: number,
  data: {
    weight_kg?: number | null;
    reps?: number | null;
    time_seconds?: number | null;
    distance_meters?: number | null;
    rpe?: number | null;
    notes?: string | null;
  }
) => client.put<Set>(`/sets/${setId}`, data).then((r) => r.data);

export const deleteSet = (setId: number) =>
  client.delete(`/sets/${setId}`);
