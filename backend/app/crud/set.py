from sqlalchemy.orm import Session
from app.models.set import Set
from app.schemas.set import SetCreate, SetUpdate


def get_by_workout_exercise(db: Session, workout_exercise_id: int) -> list[Set]:
    return (
        db.query(Set)
        .filter(Set.workout_exercise_id == workout_exercise_id)
        .order_by(Set.set_number)
        .all()
    )


def get_by_id(db: Session, set_id: int) -> Set | None:
    return db.get(Set, set_id)


def create(db: Session, workout_exercise_id: int, data: SetCreate) -> Set:
    existing = get_by_workout_exercise(db, workout_exercise_id)
    next_number = (max((s.set_number for s in existing), default=0)) + 1
    s = Set(
        workout_exercise_id=workout_exercise_id,
        set_number=next_number,
        **data.model_dump(),
    )
    db.add(s)
    db.commit()
    db.refresh(s)
    return s


def update(db: Session, s: Set, data: SetUpdate) -> Set:
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(s, field, value)
    db.commit()
    db.refresh(s)
    return s


def delete(db: Session, s: Set) -> None:
    db.delete(s)
    db.commit()
