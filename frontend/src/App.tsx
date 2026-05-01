import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { WorkoutsPage } from "./pages/WorkoutsPage";
import { WorkoutDetailPage } from "./pages/WorkoutDetailPage";
import { ExercisesPage } from "./pages/ExercisesPage";
import { TemplatesPage } from "./pages/TemplatesPage";
import { CalendarPage } from "./pages/CalendarPage";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/workouts" replace />} />
        <Route path="workouts" element={<WorkoutsPage />} />
        <Route path="workouts/:id" element={<WorkoutDetailPage />} />
        <Route path="exercises" element={<ExercisesPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
}
