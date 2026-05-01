from datetime import datetime
from datetime import date as DateType
from pydantic import BaseModel
from app.schemas.exercise import ExerciseRead


class SetNested(BaseModel):
    id: int
    set_number: int = 0
    weight_kg: float | None = None
    reps: int | None = None
    time_seconds: int | None = None
    distance_meters: float | None = None
    rpe: int | None = None
    notes: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}


class WorkoutExerciseBase(BaseModel):
    exercise_id: int
    order_index: int = 0
    notes: str | None = None


class WorkoutExerciseCreate(WorkoutExerciseBase):
    pass


class WorkoutExerciseUpdate(BaseModel):
    order_index: int | None = None
    notes: str | None = None


class WorkoutExerciseRead(WorkoutExerciseBase):
    id: int
    exercise: ExerciseRead
    sets: list[SetNested] = []

    model_config = {"from_attributes": True}


class WorkoutBase(BaseModel):
    name: str | None = None
    date: DateType
    notes: str | None = None


class WorkoutCreate(WorkoutBase):
    pass


class WorkoutUpdate(BaseModel):
    name: str | None = None
    date: DateType | None = None
    notes: str | None = None


class WorkoutRead(WorkoutBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


class WorkoutDetail(WorkoutRead):
    workout_exercises: list[WorkoutExerciseRead] = []
