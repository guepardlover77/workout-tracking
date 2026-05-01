from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.set import SetCreate, SetUpdate, SetRead
from app.crud import set as crud_set
from app.crud import workout as crud_workout

router = APIRouter(tags=["sets"])


@router.get("/workout-exercises/{we_id}/sets", response_model=list[SetRead])
def list_sets(we_id: int, db: Session = Depends(get_db)):
    we = crud_workout.get_workout_exercise(db, we_id)
    if not we:
        raise HTTPException(status_code=404, detail="WorkoutExercise not found")
    return crud_set.get_by_workout_exercise(db, we_id)


@router.post("/workout-exercises/{we_id}/sets", response_model=SetRead, status_code=201)
def create_set(we_id: int, data: SetCreate, db: Session = Depends(get_db)):
    we = crud_workout.get_workout_exercise(db, we_id)
    if not we:
        raise HTTPException(status_code=404, detail="WorkoutExercise not found")
    return crud_set.create(db, we_id, data)


@router.put("/sets/{set_id}", response_model=SetRead)
def update_set(set_id: int, data: SetUpdate, db: Session = Depends(get_db)):
    s = crud_set.get_by_id(db, set_id)
    if not s:
        raise HTTPException(status_code=404, detail="Set not found")
    return crud_set.update(db, s, data)


@router.delete("/sets/{set_id}", status_code=204)
def delete_set(set_id: int, db: Session = Depends(get_db)):
    s = crud_set.get_by_id(db, set_id)
    if not s:
        raise HTTPException(status_code=404, detail="Set not found")
    crud_set.delete(db, s)
