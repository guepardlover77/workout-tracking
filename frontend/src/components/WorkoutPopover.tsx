import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { getWorkout } from "../api/workouts";

interface WorkoutPopoverProps {
  workoutId: number;
  anchorRect: DOMRect;
  onClose: () => void;
}

export function WorkoutPopover({ workoutId, anchorRect, onClose }: WorkoutPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { data: workout, isLoading } = useQuery({
    queryKey: ["workout", workoutId],
    queryFn: () => getWorkout(workoutId),
  });

  const top = Math.max(0, Math.min(anchorRect.bottom + 6, window.innerHeight - 220));
  const left = Math.min(anchorRect.left, window.innerWidth - 264);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const addListener = () => {
      const handler = (e: MouseEvent) => {
        if (!ref.current?.contains(e.target as Node)) onClose();
      };
      document.addEventListener("mousedown", handler);
      return handler;
    };
    let handler: ((e: MouseEvent) => void) | null = null;
    // Defer by one tick so the opening mousedown doesn't immediately close the popover
    timeoutId = setTimeout(() => {
      handler = addListener();
    }, 0);
    return () => {
      clearTimeout(timeoutId);
      if (handler) document.removeEventListener("mousedown", handler);
    };
  }, [onClose]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Close on scroll/resize since anchorRect is a snapshot and would drift
  useEffect(() => {
    const handler = () => onClose();
    window.addEventListener("scroll", handler, true);
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("scroll", handler, true);
      window.removeEventListener("resize", handler);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      style={{ position: "fixed", top, left, zIndex: 50 }}
      className="bg-white rounded-xl shadow-xl border border-gray-200 w-64 p-4"
    >
      {isLoading ? (
        <p className="text-sm text-gray-400">Chargement...</p>
      ) : !workout ? (
        <p className="text-sm text-gray-400">Séance introuvable</p>
      ) : (
        <>
          <p className="font-semibold text-sm mb-0.5">
            {workout.name || `Séance du ${workout.date}`}
          </p>
          <p className="text-xs text-gray-400 mb-3">{workout.date}</p>

          {workout.workout_exercises.length === 0 ? (
            <p className="text-xs text-gray-400 italic mb-3">Aucun exercice</p>
          ) : (
            <ul className="text-xs text-gray-600 flex flex-col gap-1 mb-3">
              {workout.workout_exercises.map((we) => (
                <li key={we.id} className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                  {we.exercise.name}
                </li>
              ))}
            </ul>
          )}

          <Link
            to={`/workouts/${workout.id}`}
            onClick={onClose}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Voir le détail <ChevronRight size={12} />
          </Link>
        </>
      )}
    </div>
  );
}
