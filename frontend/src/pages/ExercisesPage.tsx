import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Button } from "../components/ui/Button";
import { ExerciseFormModal } from "../components/ExerciseFormModal";
import { getExercises, deleteExercise } from "../api/exercises";
import type { Exercise } from "../types";

export function ExercisesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Exercise | null>(null);
  const [search, setSearch] = useState("");
  const qc = useQueryClient();

  const { data: exercises = [], isLoading } = useQuery({
    queryKey: ["exercises"],
    queryFn: getExercises,
  });

  const deleteMut = useMutation({
    mutationFn: deleteExercise,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exercises"] }),
  });

  const filtered = exercises.filter(
    (ex) =>
      ex.name.toLowerCase().includes(search.toLowerCase()) ||
      (ex.category ?? "").toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce<Record<string, Exercise[]>>((acc, ex) => {
    const cat = ex.category ?? "Autres";
    (acc[cat] ??= []).push(ex);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Exercices</h1>
        <Button variant="primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} className="inline mr-1" />
          Nouvel exercice
        </Button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher..."
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {isLoading && <p className="text-gray-500">Chargement...</p>}

      {filtered.length === 0 && !isLoading && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Aucun exercice</p>
          <p className="text-sm mt-1">Créez votre premier exercice !</p>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([cat, exs]) => (
            <div key={cat}>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                {cat}
              </h2>
              <div className="flex flex-col gap-1">
                {exs.map((ex) => (
                  <div
                    key={ex.id}
                    className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between"
                  >
                    <div className="min-w-0">
                      <div className="font-medium">{ex.name}</div>
                      {ex.description && (
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {ex.description}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => setEditing(ex)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Pencil size={15} className="text-gray-500" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Supprimer "${ex.name}" ?`))
                            deleteMut.mutate(ex.id);
                        }}
                        className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={15} className="text-red-400" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {showCreate && (
        <ExerciseFormModal onClose={() => setShowCreate(false)} />
      )}
      {editing && (
        <ExerciseFormModal
          exercise={editing}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}
