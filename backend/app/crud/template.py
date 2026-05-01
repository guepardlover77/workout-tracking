from datetime import date
from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from app.models.template import WorkoutTemplate, TemplateExercise
from app.models.workout import Workout
from app.models.workout_exercise import WorkoutExercise
from app.schemas.template import WorkoutTemplateCreate, WorkoutTemplateUpdate, TemplateExerciseCreate


def get_all(db: Session) -> list[WorkoutTemplate]:
    return db.query(WorkoutTemplate).order_by(WorkoutTemplate.name).all()


def get_by_id(db: Session, template_id: int) -> WorkoutTemplate | None:
    return db.get(WorkoutTemplate, template_id)


def get_detail(db: Session, template_id: int) -> WorkoutTemplate | None:
    stmt = (
        select(WorkoutTemplate)
        .options(
            selectinload(WorkoutTemplate.template_exercises).selectinload(TemplateExercise.exercise)
        )
        .where(WorkoutTemplate.id == template_id)
    )
    return db.scalar(stmt)


def create(db: Session, data: WorkoutTemplateCreate) -> WorkoutTemplate:
    template = WorkoutTemplate(**data.model_dump())
    db.add(template)
    db.commit()
    db.refresh(template)
    return template


def update(db: Session, template: WorkoutTemplate, data: WorkoutTemplateUpdate) -> WorkoutTemplate:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(template, field, value)
    db.commit()
    db.refresh(template)
    return template


def delete(db: Session, template: WorkoutTemplate) -> None:
    db.delete(template)
    db.commit()


def add_exercise(db: Session, template_id: int, data: TemplateExerciseCreate) -> TemplateExercise:
    te = TemplateExercise(template_id=template_id, **data.model_dump())
    db.add(te)
    db.commit()
    stmt = (
        select(TemplateExercise)
        .options(selectinload(TemplateExercise.exercise))
        .where(TemplateExercise.id == te.id)
    )
    return db.scalar(stmt)


def remove_exercise(db: Session, te: TemplateExercise) -> None:
    db.delete(te)
    db.commit()


def generate_workout(db: Session, template: WorkoutTemplate, workout_date: date) -> Workout:
    workout = Workout(
        name=template.name,
        date=workout_date,
        notes=f"Générée depuis le programme : {template.name}",
    )
    db.add(workout)
    db.flush()

    for te in template.template_exercises:
        we = WorkoutExercise(
            workout_id=workout.id,
            exercise_id=te.exercise_id,
            order_index=te.order_index,
        )
        db.add(we)

    db.commit()
    db.refresh(workout)
    return workout
