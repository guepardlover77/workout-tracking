from datetime import datetime
from pydantic import BaseModel, Field


class SetBase(BaseModel):
    weight_kg: float | None = None
    reps: int | None = None
    time_seconds: int | None = None
    distance_meters: float | None = None
    rpe: int | None = Field(None, ge=1, le=10)
    notes: str | None = None


class SetCreate(SetBase):
    pass


class SetUpdate(BaseModel):
    weight_kg: float | None = None
    reps: int | None = None
    time_seconds: int | None = None
    distance_meters: float | None = None
    rpe: int | None = Field(None, ge=1, le=10)
    notes: str | None = None


class SetRead(SetBase):
    id: int
    set_number: int
    workout_exercise_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
