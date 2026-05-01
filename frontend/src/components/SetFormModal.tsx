import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal } from "./ui/Modal";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { createSet, updateSet } from "../api/sets";
import type { Set, SetFormData } from "../types";

interface SetFormModalProps {
  weId: number;
  workoutId: number;
  editSet?: Set;
  onClose: () => void;
}

const empty: SetFormData = {
  weight_kg: "",
  reps: "",
  time_seconds: "",
  distance_meters: "",
  rpe: "",
  notes: "",
};

function toForm(s: Set): SetFormData {
  return {
    weight_kg: s.weight_kg?.toString() ?? "",
    reps: s.reps?.toString() ?? "",
    time_seconds: s.time_seconds?.toString() ?? "",
    distance_meters: s.distance_meters?.toString() ?? "",
    rpe: s.rpe?.toString() ?? "",
    notes: s.notes ?? "",
  };
}

function parsePayload(form: SetFormData) {
  return {
    weight_kg: form.weight_kg ? parseFloat(form.weight_kg) : null,
    reps: form.reps ? parseInt(form.reps) : null,
    time_seconds: form.time_seconds ? parseInt(form.time_seconds) : null,
    distance_meters: form.distance_meters
      ? parseFloat(form.distance_meters)
      : null,
    rpe: form.rpe ? parseInt(form.rpe) : null,
    notes: form.notes || null,
  };
}

export function SetFormModal({
  weId,
  workoutId,
  editSet,
  onClose,
}: SetFormModalProps) {
  const [form, setForm] = useState<SetFormData>(
    editSet ? toForm(editSet) : empty
  );
  const qc = useQueryClient();

  const invalidate = () => qc.invalidateQueries({ queryKey: ["workout", workoutId] });

  const createMut = useMutation({
    mutationFn: () => createSet(weId, parsePayload(form)),
    onSuccess: () => { invalidate(); onClose(); },
  });

  const updateMut = useMutation({
    mutationFn: () => updateSet(editSet!.id, parsePayload(form)),
    onSuccess: () => { invalidate(); onClose(); },
  });

  const isPending = createMut.isPending || updateMut.isPending;

  const field =
    (key: keyof SetFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editSet ? updateMut.mutate() : createMut.mutate();
  };

  return (
    <Modal
      title={editSet ? "Modifier la série" : "Ajouter une série"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Poids (kg)"
            type="number"
            step="0.5"
            min="0"
            value={form.weight_kg}
            onChange={field("weight_kg")}
            placeholder="ex: 80"
          />
          <Input
            label="Répétitions"
            type="number"
            min="0"
            value={form.reps}
            onChange={field("reps")}
            placeholder="ex: 10"
          />
          <Input
            label="Temps (secondes)"
            type="number"
            min="0"
            value={form.time_seconds}
            onChange={field("time_seconds")}
            placeholder="ex: 60"
          />
          <Input
            label="Distance (m)"
            type="number"
            step="0.1"
            min="0"
            value={form.distance_meters}
            onChange={field("distance_meters")}
            placeholder="ex: 100"
          />
          <div className="col-span-2">
            <Input
              label="RPE (1-10)"
              type="number"
              min="1"
              max="10"
              value={form.rpe}
              onChange={field("rpe")}
              placeholder="Effort perçu"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Notes</label>
          <textarea
            value={form.notes}
            onChange={field("notes")}
            rows={3}
            placeholder="Observations, ressenti..."
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Annuler
          </Button>
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? "Enregistrement..." : editSet ? "Modifier" : "Ajouter"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
