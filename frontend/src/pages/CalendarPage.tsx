import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import frLocale from "@fullcalendar/core/locales/fr";
import type { EventClickArg } from "@fullcalendar/core";
import { getWorkouts } from "../api/workouts";
import { WorkoutPopover } from "../components/WorkoutPopover";

interface SelectedEvent {
  workoutId: number;
  rect: DOMRect;
}

export function CalendarPage() {
  const [selected, setSelected] = useState<SelectedEvent | null>(null);

  const { data: workouts = [] } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
  });

  const events = workouts.map((w) => ({
    id: String(w.id),
    title: w.name || "Séance",
    date: w.date,
    color: "#3b82f6",
  }));

  const handleEventClick = (info: EventClickArg) => {
    info.jsEvent.stopPropagation();
    setSelected({
      workoutId: Number(info.event.id),
      rect: info.el.getBoundingClientRect(),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Calendrier</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locale={frLocale}
          events={events}
          eventClick={handleEventClick}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          height="auto"
        />
      </div>

      {selected && (
        <WorkoutPopover
          workoutId={selected.workoutId}
          anchorRect={selected.rect}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
