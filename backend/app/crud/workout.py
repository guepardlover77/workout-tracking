from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from app.models.workout import Workout
from app.models.workout_exercise import WorkoutExercise
from app.schemas.workout import WorkoutCreate, WorkoutUpdate, WorkoutExerciseCreate


def get_all(db: Session) -> list[Workout]:
    return db.query(Workout).order_by(Workout.date.desc()).all()


def get_by_id(db: Session, workout_id: int) -> Workout | None:
    return db.get(Workout, workout_id)


def get_detail(db: Session, workout_id: int) -> Workout | None:
    stmt = (
        select(Workout)
        .options(
            selectinload(Workout.workout_exercises).selectinload(WorkoutExercise.exercise),
            selectinload(Workout.workout_exercises).selectinload(WorkoutExercise.sets),
        )
        .where(Workout.id == workout_id)
    )
    return db.scalar(stmt)


def create(db: Session, data: WorkoutCreate) -> Workout:
    workout = Workout(**data.model_dump())
    db.add(workout)
    db.commit()
    db.refresh(workout)
    return workout


def update(db: Session, workout: Workout, data: WorkoutUpdate) -> Workout:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(workout, field, value)
    db.commit()
    db.refresh(workout)
    return workout


def delete(db: Session, workout: Workout) -> None:
    db.delete(workout)
    db.commit()


def get_workout_exercise(db: Session, we_id: int) -> WorkoutExercise | None:
    stmt = (
        select(WorkoutExercise)
        .options(
            selectinload(WorkoutExercise.exercise),
            selectinload(WorkoutExercise.sets),
        )
        .where(WorkoutExercise.id == we_id)
    )
    return db.scalar(stmt)


def add_exercise(db: Session, workout_id: int, data: WorkoutExerciseCreate) -> WorkoutExercise:
    we = WorkoutExercise(workout_id=workout_id, **data.model_dump())
    db.add(we)
    db.commit()
    return get_workout_exercise(db, we.id)


def remove_exercise(db: Session, we: WorkoutExercise) -> None:
    db.delete(we)
    db.commit()
