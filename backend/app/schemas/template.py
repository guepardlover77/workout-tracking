from datetime import datetime
from datetime import date as DateType
from pydantic import BaseModel, Field
from app.schemas.exercise import ExerciseRead


class TemplateExerciseBase(BaseModel):
    exercise_id: int
    order_index: int = 0
    default_sets: int = 3


class TemplateExerciseCreate(TemplateExerciseBase):
    pass


class TemplateExerciseRead(TemplateExerciseBase):
    id: int
    exercise: ExerciseRead

    model_config = {"from_attributes": True}


class WorkoutTemplateBase(BaseModel):
    name: str
    description: str | None = None


class WorkoutTemplateCreate(WorkoutTemplateBase):
    pass


class WorkoutTemplateUpdate(BaseModel):
    name: str | None = None
    description: str | None = None


class WorkoutTemplateRead(WorkoutTemplateBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


class WorkoutTemplateDetail(WorkoutTemplateRead):
    template_exercises: list[TemplateExerciseRead] = []


class GenerateWorkoutRequest(BaseModel):
    date: DateType = Field(default_factory=DateType.today)
