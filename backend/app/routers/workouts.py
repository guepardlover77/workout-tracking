from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.workout import (
    WorkoutCreate, WorkoutUpdate, WorkoutRead, WorkoutDetail,
    WorkoutExerciseCreate, WorkoutExerciseRead,
)
from app.crud import workout as crud

router = APIRouter(prefix="/workouts", tags=["workouts"])


@router.get("", response_model=list[WorkoutRead])
def list_workouts(db: Session = Depends(get_db)):
    return crud.get_all(db)


@router.get("/{workout_id}", response_model=WorkoutDetail)
def get_workout(workout_id: int, db: Session = Depends(get_db)):
    workout = crud.get_detail(db, workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    return workout


@router.post("", response_model=WorkoutRead, status_code=201)
def create_workout(data: WorkoutCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)


@router.put("/{workout_id}", response_model=WorkoutRead)
def update_workout(workout_id: int, data: WorkoutUpdate, db: Session = Depends(get_db)):
    workout = crud.get_by_id(db, workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    return crud.update(db, workout, data)


@router.delete("/{workout_id}", status_code=204)
def delete_workout(workout_id: int, db: Session = Depends(get_db)):
    workout = crud.get_by_id(db, workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    crud.delete(db, workout)


@router.post("/{workout_id}/exercises", response_model=WorkoutExerciseRead, status_code=201)
def add_exercise_to_workout(
    workout_id: int, data: WorkoutExerciseCreate, db: Session = Depends(get_db)
):
    workout = crud.get_by_id(db, workout_id)
    if not workout:
        raise HTTPException(status_code=404, detail="Workout not found")
    return crud.add_exercise(db, workout_id, data)


@router.delete("/{workout_id}/exercises/{we_id}", status_code=204)
def remove_exercise_from_workout(
    workout_id: int, we_id: int, db: Session = Depends(get_db)
):
    we = crud.get_workout_exercise(db, we_id)
    if not we or we.workout_id != workout_id:
        raise HTTPException(status_code=404, detail="WorkoutExercise not found")
    crud.remove_exercise(db, we)
