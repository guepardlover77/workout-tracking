import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Plus } from "lucide-react";
import { Modal } from "./ui/Modal";
import { ExerciseFormModal } from "./ExerciseFormModal";
import { getExercises } from "../api/exercises";
import type { Exercise } from "../types";

interface WorkoutContext {
  workoutId: number;
  orderIndex: number;
}

interface ExercisePickerProps {
  onSelect: (exercise: Exercise) => void;
  onClose: () => void;
  workoutContext?: WorkoutContext;
}

export function ExercisePicker({ onSelect, onClose, workoutContext }: ExercisePickerProps) {
  const [search, setSearch] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const { data: exercises = [] } = useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });

  const filtered = exercises.filter((ex) =>
    ex.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Modal title="Choisir un exercice" onClose={onClose}>
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col divide-y max-h-80 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="py-4 text-center">
                <p className="text-sm text-gray-500 mb-2">
                  Aucun exercice trouvé
                </p>
                <button
                  onClick={() => setShowCreate(true)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  {search ? `+ Créer "${search}"` : "+ Créer un exercice"}
                </button>
              </div>
            ) : (
              filtered.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    onSelect(ex);
                    onClose();
                  }}
                  className="text-left px-3 py-2.5 hover:bg-blue-50 transition-colors"
                >
                  <div className="text-sm font-medium">{ex.name}</div>
                  {ex.category && (
                    <div className="text-xs text-gray-500">{ex.category}</div>
                  )}
                </button>
              ))
            )}
          </div>

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 self-start"
          >
            <Plus size={14} />
            Créer un exercice
          </button>
        </div>
      </Modal>

      {showCreate && (
        <ExerciseFormModal
          initialName={search}
          onClose={() => setShowCreate(false)}
          onCreated={(ex) => {
            onSelect(ex);
            onClose();
          }}
          workoutContext={workoutContext}
          onAllDone={workoutContext ? onClose : undefined}
        />
      )}
    </>
  );
}
