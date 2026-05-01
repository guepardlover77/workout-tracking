export interface Exercise {
  id: number;
  name: string;
  category: string | null;
  description: string | null;
  created_at: string;
}

export interface Set {
  id: number;
  workout_exercise_id: number;
  set_number: number;
  weight_kg: number | null;
  reps: number | null;
  time_seconds: number | null;
  distance_meters: number | null;
  rpe: number | null;
  notes: string | null;
  created_at: string;
}

export interface WorkoutExercise {
  id: number;
  workout_id: number;
  exercise_id: number;
  order_index: number;
  notes: string | null;
  exercise: Exercise;
  sets: Set[];
}

export interface Workout {
  id: number;
  name: string | null;
  date: string;
  notes: string | null;
  created_at: string;
}

export interface WorkoutDetail extends Workout {
  workout_exercises: WorkoutExercise[];
}

export interface TemplateExercise {
  id: number;
  template_id: number;
  exercise_id: number;
  order_index: number;
  default_sets: number;
  notes: string | null;
  exercise: Exercise;
}

export interface WorkoutTemplate {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
}

export interface WorkoutTemplateDetail extends WorkoutTemplate {
  template_exercises: TemplateExercise[];
}

export type SetFormData = {
  weight_kg: string;
  reps: string;
  time_seconds: string;
  distance_meters: string;
  rpe: string;
  notes: string;
};
