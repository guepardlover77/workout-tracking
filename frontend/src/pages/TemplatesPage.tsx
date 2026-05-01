import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Play, ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { Input } from "../components/ui/Input";
import { ExercisePicker } from "../components/ExercisePicker";
import {
  getTemplates,
  getTemplate,
  createTemplate,
  deleteTemplate,
  addExerciseToTemplate,
  removeExerciseFromTemplate,
  generateWorkout,
} from "../api/templates";
import type { Exercise, WorkoutTemplateDetail } from "../types";

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function TemplateDetail({ templateId }: { templateId: number }) {
  const [showPicker, setShowPicker] = useState(false);
  const [showGenerate, setShowGenerate] = useState(false);
  const [genDate, setGenDate] = useState(today());
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { data: detail } = useQuery<WorkoutTemplateDetail>({
    queryKey: ["template", templateId],
    queryFn: () => getTemplate(templateId),
  });

  const addExMut = useMutation({
    mutationFn: (ex: Exercise) =>
      addExerciseToTemplate(templateId, {
        exercise_id: ex.id,
        order_index: (detail?.template_exercises.length ?? 0) + 1,
      }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["template", templateId] }),
  });

  const removeExMut = useMutation({
    mutationFn: (teId: number) =>
      removeExerciseFromTemplate(templateId, teId),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["template", templateId] }),
  });

  const generateMut = useMutation({
    mutationFn: () => generateWorkout(templateId, genDate),
    onSuccess: (workout) => {
      qc.invalidateQueries({ queryKey: ["workouts"] });
      navigate(`/workouts/${workout.id}`);
    },
  });

  if (!detail) return <p className="text-sm text-gray-400 px-4 pb-3">Chargement...</p>;

  return (
    <div className="px-4 pb-4 flex flex-col gap-3">
      {detail.description && (
        <p className="text-sm text-gray-500">{detail.description}</p>
      )}

      <div className="flex flex-col gap-1">
        {detail.template_exercises.length === 0 && (
          <p className="text-sm text-gray-400 italic">Aucun exercice</p>
        )}
        {detail.template_exercises
          .sort((a, b) => a.order_index - b.order_index)
          .map((te) => (
            <div
              key={te.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
            >
              <span className="text-sm font-medium">{te.exercise.name}</span>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{te.default_sets} séries</span>
                <button
                  onClick={() => removeExMut.mutate(te.id)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <Trash2 size={12} className="text-red-400" />
                </button>
              </div>
            </div>
          ))}
      </div>

      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => setShowPicker(true)}>
          <Plus size={14} className="inline mr-1" />
          Exercice
        </Button>
        <Button variant="primary" onClick={() => setShowGenerate(true)}>
          <Play size={14} className="inline mr-1" />
          Générer séance
        </Button>
      </div>

      {showPicker && (
        <ExercisePicker
          onSelect={(ex) => addExMut.mutate(ex)}
          onClose={() => setShowPicker(false)}
        />
      )}

      {showGenerate && (
        <Modal title="Générer une séance" onClose={() => setShowGenerate(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generateMut.mutate();
            }}
            className="flex flex-col gap-4"
          >
            <Input
              label="Date de la séance"
              type="date"
              required
              value={genDate}
              onChange={(e) => setGenDate(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => setShowGenerate(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={generateMut.isPending}
              >
                {generateMut.isPending ? "Génération..." : "Créer la séance"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export function TemplatesPage() {
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ name: "", description: "" });
  const [expanded, setExpanded] = useState<number | null>(null);
  const qc = useQueryClient();

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["templates"],
    queryFn: getTemplates,
  });

  const createMut = useMutation({
    mutationFn: () =>
      createTemplate({
        name: form.name,
        description: form.description || undefined,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["templates"] });
      setShowCreate(false);
      setForm({ name: "", description: "" });
    },
  });

  const deleteMut = useMutation({
    mutationFn: deleteTemplate,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["templates"] }),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Programmes</h1>
        <Button variant="primary" onClick={() => setShowCreate(true)}>
          <Plus size={16} className="inline mr-1" />
          Nouveau programme
        </Button>
      </div>

      {isLoading && <p className="text-gray-500">Chargement...</p>}

      {templates.length === 0 && !isLoading && (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">Aucun programme</p>
          <p className="text-sm mt-1">
            Créez un programme pour générer des séances rapidement
          </p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {templates.map((t) => (
          <div
            key={t.id}
            className="bg-white border border-gray-200 rounded-xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <button
                className="flex items-center gap-2 flex-1 text-left"
                onClick={() =>
                  setExpanded(expanded === t.id ? null : t.id)
                }
              >
                <span className="font-semibold">{t.name}</span>
                {expanded === t.id ? (
                  <ChevronUp size={16} className="text-gray-400" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400" />
                )}
              </button>
              <button
                onClick={() => {
                  if (confirm(`Supprimer "${t.name}" ?`))
                    deleteMut.mutate(t.id);
                }}
                className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={15} className="text-red-400" />
              </button>
            </div>
            {expanded === t.id && <TemplateDetail templateId={t.id} />}
          </div>
        ))}
      </div>

      {showCreate && (
        <Modal
          title="Nouveau programme"
          onClose={() => setShowCreate(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createMut.mutate();
            }}
            className="flex flex-col gap-4"
          >
            <Input
              label="Nom"
              required
              value={form.name}
              onChange={(e) =>
                setForm((p) => ({ ...p, name: e.target.value }))
              }
              placeholder="ex: Push Day A"
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                rows={2}
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
