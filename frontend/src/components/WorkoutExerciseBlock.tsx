import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "./ui/Button";
import { SetFormModal } from "./SetFormModal";
import { deleteSet } from "../api/sets";
import { removeExerciseFromWorkout } from "../api/workouts";
import type { WorkoutExercise, Set } from "../types";

interface WorkoutExerciseBlockProps {
  we: WorkoutExercise;
  workoutId: number;
}

function formatSet(s: Set): string {
  const parts: string[] = [];
  if (s.reps != null && s.weight_kg != null)
    parts.push(`${s.reps} × ${s.weight_kg} kg`);
  else if (s.reps != null) parts.push(`${s.reps} rép.`);
  else if (s.weight_kg != null) parts.push(`${s.weight_kg} kg`);
  if (s.time_seconds != null) parts.push(`${s.time_seconds}s`);
  if (s.distance_meters != null) parts.push(`${s.distance_meters} m`);
  if (s.rpe != null) parts.push(`RPE ${s.rpe}`);
  return parts.join(" · ") || "—";
}

export function WorkoutExerciseBlock({
  we,
  workoutId,
}: WorkoutExerciseBlockProps) {
  const [showAddSet, setShowAddSet] = useState(false);
  const [editingSet, setEditingSet] = useState<Set | null>(null);
  const qc = useQueryClient();

  const invalidate = () =>
    qc.invalidateQueries({ queryKey: ["workout", workoutId] });

  const deleteSetMut = useMutation({
    mutationFn: (setId: number) => deleteSet(setId),
    onSuccess: invalidate,
  });

  const removeExMut = useMutation({
    mutationFn: () => removeExerciseFromWorkout(workoutId, we.id),
    onSuccess: invalidate,
  });

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between bg-gray-50 px-4 py-3">
        <div>
          <span className="font-semibold">{we.exercise.name}</span>
          {we.exercise.category && (
            <span className="ml-2 text-xs text-gray-500 bg-gray-200 rounded px-1.5 py-0.5">
              {we.exercise.category}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" onClick={() => setShowAddSet(true)}>
            <Plus size={16} />
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              if (confirm(`Supprimer "${we.exercise.name}" de la séance ?`))
                removeExMut.mutate();
            }}
          >
            <Trash2 size={16} className="text-red-500" />
          </Button>
        </div>
      </div>

      {we.sets.length > 0 ? (
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/50 text-gray-500 text-xs">
              <th className="text-left px-4 py-2 font-medium">Série</th>
              <th className="text-left px-4 py-2 font-medium">Détails</th>
              <th className="text-left px-4 py-2 font-medium">Notes</th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {we.sets.map((s) => (
              <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 text-gray-500">#{s.set_number}</td>
                <td className="px-4 py-2 font-medium">{formatSet(s)}</td>
                <td className="px-4 py-2 text-gray-500 text-xs max-w-xs truncate">
                  {s.notes ?? ""}
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-1 justify-end">
                    <button
                      onClick={() => setEditingSet(s)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Pencil size={13} className="text-gray-500" />
                    </button>
                    <button
                      onClick={() => deleteSetMut.mutate(s.id)}
                      className="p-1 hover:bg-gray-100 rounded transition-colors"
                    >
                      <Trash2 size={13} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="px-4 py-3 text-sm text-gray-400 italic">
          Aucune série — cliquez + pour ajouter
        </p>
      )}

      {(showAddSet || editingSet) && (
        <SetFormModal
          weId={we.id}
          workoutId={workoutId}
          editSet={editingSet ?? undefined}
          onClose={() => {
            setShowAddSet(false);
            setEditingSet(null);
          }}
        />
      )}
    </div>
  );
}
