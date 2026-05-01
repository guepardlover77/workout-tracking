from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.exercise import ExerciseCreate, ExerciseUpdate, ExerciseRead
from app.crud import exercise as crud

router = APIRouter(prefix="/exercises", tags=["exercises"])


@router.get("", response_model=list[ExerciseRead])
def list_exercises(db: Session = Depends(get_db)):
    return crud.get_all(db)


@router.get("/{exercise_id}", response_model=ExerciseRead)
def get_exercise(exercise_id: int, db: Session = Depends(get_db)):
    ex = crud.get_by_id(db, exercise_id)
    if not ex:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return ex


@router.post("", response_model=ExerciseRead, status_code=201)
def create_exercise(data: ExerciseCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)


@router.put("/{exercise_id}", response_model=ExerciseRead)
def update_exercise(exercise_id: int, data: ExerciseUpdate, db: Session = Depends(get_db)):
    ex = crud.get_by_id(db, exercise_id)
    if not ex:
        raise HTTPException(status_code=404, detail="Exercise not found")
    return crud.update(db, ex, data)


@router.delete("/{exercise_id}", status_code=204)
def delete_exercise(exercise_id: int, db: Session = Depends(get_db)):
    ex = crud.get_by_id(db, exercise_id)
    if not ex:
        raise HTTPException(status_code=404, detail="Exercise not found")
    crud.delete(db, ex)
