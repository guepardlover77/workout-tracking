import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "../components/ui/Button";
import { WorkoutExerciseBlock } from "../components/WorkoutExerciseBlock";
import { ExercisePicker } from "../components/ExercisePicker";
import { getWorkout, deleteWorkout, addExerciseToWorkout } from "../api/workouts";
import type { Exercise } from "../types";

export function WorkoutDetailPage() {
  const { id } = useParams<{ id: string }>();
  const workoutId = Number(id);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [showPicker, setShowPicker] = useState(false);

  const { data: workout, isLoading } = useQuery({
    queryKey: ["workout", workoutId],
    queryFn: () => getWorkout(workoutId),
  });

  const deleteMut = useMutation({
    mutationFn: () => deleteWorkout(workoutId),
    onSuccess: () => navigate("/workouts"),
  });

  const addExMut = useMutation({
    mutationFn: (ex: Exercise) =>
      addExerciseToWorkout(workoutId, {
        exercise_id: ex.id,
        order_index: (workout?.workout_exercises.length ?? 0) + 1,
      }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["workout", workoutId] }),
  });

  if (isLoading)
    return <p className="text-gray-500">Chargement...</p>;

  if (!workout)
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">Séance introuvable</p>
        <Link to="/workouts" className="text-blue-600 text-sm mt-2 block">
          Retour
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Link to="/workouts" className="p-1 hover:bg-gray-100 rounded-lg">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold truncate">
            {workout.name || `Séance du ${workout.date}`}
          </h1>
          <p className="text-gray-500 text-sm">{workout.date}</p>
        </div>
        <Button
          variant="danger"
          onClick={() => {
            if (confirm("Supprimer cette séance ?")) deleteMut.mutate();
          }}
        >
          <Trash2 size={15} className="inline mr-1" />
          Supprimer
        </Button>
      </div>

      {workout.notes && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 text-sm text-yellow-800">
          {workout.notes}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-gray-700">
          Exercices ({workout.workout_exercises.length})
        </h2>
        <Button variant="primary" onClick={() => setShowPicker(true)}>
          <Plus size={15} className="inline mr-1" />
          Ajouter exercice
        </Button>
      </div>

      {workout.workout_exercises.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p>Aucun exercice — ajoutez-en un pour commencer</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {workout.workout_exercises.map((we) => (
            <WorkoutExerciseBlock
              key={we.id}
              we={we}
              workoutId={workoutId}
            />
          ))}
        </div>
      )}

      {showPicker && (
        <ExercisePicker
          onSelect={(ex) => addExMut.mutate(ex)}
          onClose={() => setShowPicker(false)}
          workoutContext={{
            workoutId,
            orderIndex: (workout?.workout_exercises.length ?? 0) + 1,
          }}
        />
      )}
    </div>
  );
}
