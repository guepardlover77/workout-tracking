import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { SetFormModal } from "./SetFormModal";
import { createExercise, updateExercise } from "../api/exercises";
import { addExerciseToWorkout } from "../api/workouts";
import type { Exercise } from "../types";

interface WorkoutContext {
  workoutId: number;
  orderIndex: number;
}

interface ExerciseFormModalProps {
  exercise?: Exercise;
  initialName?: string;
  onClose: () => void;
  onCreated?: (exercise: Exercise) => void;
  workoutContext?: WorkoutContext;
  onAllDone?: () => void;
}

export function ExerciseFormModal({
  exercise,
  initialName = "",
  onClose,
  onCreated,
  workoutContext,
  onAllDone,
}: ExerciseFormModalProps) {
  const [form, setForm] = useState({
    name: exercise?.name ?? initialName,
    category: exercise?.category ?? "",
    description: exercise?.description ?? "",
  });
  const [pendingWeId, setPendingWeId] = useState<number | null>(null);
  const qc = useQueryClient();

  const createMut = useMutation({
    mutationFn: () =>
      createExercise({
        name: form.name,
        category: form.category || undefined,
        description: form.description || undefined,
      }),
    onSuccess: (newExercise) => {
      qc.invalidateQueries({ queryKey: ["exercises"] });
      onCreated?.(newExercise);
      onClose();
    },
  });

  const updateMut = useMutation({
    mutationFn: () =>
      updateExercise(exercise!.id, {
        name: form.name,
        category: form.category || undefined,
        description: form.description || undefined,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["exercises"] });
      onClose();
    },
  });

  const createAndAddMut = useMutation({
    mutationFn: async () => {
      const newExercise = await createExercise({
        name: form.name,
        category: form.category || undefined,
        description: form.description || undefined,
      });
      const we = await addExerciseToWorkout(workoutContext!.workoutId, {
        exercise_id: newExercise.id,
        order_index: workoutContext!.orderIndex,
      });
      return { newExercise, weId: we.id };
    },
    onSuccess: ({ weId }) => {
      qc.invalidateQueries({ queryKey: ["exercises"] });
      qc.invalidateQueries({ queryKey: ["workout", workoutContext!.workoutId] });
      setPendingWeId(weId);
    },
  });

  const isPending = createMut.isPending || updateMut.isPending || createAndAddMut.isPending;
  const canAddSet = !!workoutContext && !exercise;

  return (
    <>
      <Modal
        title={exercise ? "Modifier l'exercice" : "Nouvel exercice"}
        onClose={onClose}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            exercise ? updateMut.mutate() : createMut.mutate();
          }}
          className="flex flex-col gap-4"
        >
          <Input
            label="Nom"
            required
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="ex: Développé couché"
          />
          <Input
            label="Catégorie"
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            placeholder="ex: Pectoraux, Dos, Jambes..."
          />
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            {canAddSet && (
              <Button
                type="button"
                variant="secondary"
                disabled={isPending || !form.name.trim()}
                onClick={() => createAndAddMut.mutate()}
              >
                {createAndAddMut.isPending ? "Création..." : "Créer et ajouter une série"}
              </Button>
            )}
            <Button type="submit" variant="primary" disabled={isPending}>
              {isPending && !createAndAddMut.isPending
                ? "Enregistrement..."
                : exercise
                ? "Modifier"
                : "Créer"}
            </Button>
          </div>
        </form>
      </Modal>

      {pendingWeId !== null && workoutContext && (
        <SetFormModal
          weId={pendingWeId}
          workoutId={workoutContext.workoutId}
          onClose={() => {
            setPendingWeId(null);
            onClose();
            onAllDone?.();
          }}
        />
      )}
    </>
  );
}
