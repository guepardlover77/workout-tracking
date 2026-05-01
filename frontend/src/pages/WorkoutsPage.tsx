import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { getWorkouts, createWorkout, deleteWorkout } from "../api/workouts";

function today(): string {
  return new Date().toISOString().split("T")[0];
}

export function WorkoutsPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", date: today(), notes: "" });
  const qc = useQueryClient();

  const { data: workouts = [], isLoading } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });

  const createMut = useMutation({
    mutationFn: () =>
      createWorkout({
        date: form.date,
        name: form.name || undefined,
        notes: form.notes || undefined,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["workouts"] });
      setShowCreate(false);
      setForm({ name: "", date: today(), notes: "" });
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteWorkout,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["workouts"] }),
  });

  const sorted = [...workouts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Séances</h1>
        <Button variant="primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} className="inline mr-1" />
          Nouvelle séance
        </Button>
      </div>

      {isLoading && <p className="text-gray-500">Chargement...</p>}

      {sorted.length === 0 && !isLoading && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Aucune séance pour l'instant</p>
          <p className="text-sm mt-1">Créez votre première séance !</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {sorted.map((w) => (
          <div
            key={w.id}
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between hover:border-blue-300 transition-colors"
          >
            <Link to={`/workouts/${w.id}`} className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {w.name || `Séance du ${w.date}`}
                </span>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <div className="text-sm text-gray-500">{w.date}</div>
            </Link>
            <button
              onClick={() => {
                if (confirm("Supprimer cette séance ?")) deleteMut.mutate(w.id);
              }}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors ml-2"
            >
              <Trash2 size={16} className="text-red-400" />
            </button>
          </div>
        ))}
      </div>

      {showCreate && (
        <Modal title="Nouvelle séance" onClose={() => setShowCreate(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createMut.mutate();
            }}
            className="flex flex-col gap-4"
          >
            <Input
              label="Nom (optionnel)"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="ex: Push Day"
            />
            <Input
              label="Date"
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) =>
                  setForm((p) => ({ ...p, notes: e.target.value }))
                }
                rows={3}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowCreate(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={createMut.isPending}
              >
                {createMut.isPending ? "Création..." : "Créer"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
