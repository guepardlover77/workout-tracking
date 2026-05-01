from sqlalchemy.orm import Session
from app.models.exercise import Exercise
from app.schemas.exercise import ExerciseCreate, ExerciseUpdate


def get_all(db: Session) -> list[Exercise]:
    return db.query(Exercise).order_by(Exercise.name).all()


def get_by_id(db: Session, exercise_id: int) -> Exercise | None:
    return db.get(Exercise, exercise_id)


def create(db: Session, data: ExerciseCreate) -> Exercise:
    exercise = Exercise(**data.model_dump())
    db.add(exercise)
    db.commit()
    db.refresh(exercise)
    return exercise


def update(db: Session, exercise: Exercise, data: ExerciseUpdate) -> Exercise:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(exercise, field, value)
    db.commit()
    db.refresh(exercise)
    return exercise


def delete(db: Session, exercise: Exercise) -> None:
    db.delete(exercise)
    db.commit()
