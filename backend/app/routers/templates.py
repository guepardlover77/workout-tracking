from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.template import (
    WorkoutTemplateCreate, WorkoutTemplateUpdate,
    WorkoutTemplateRead, WorkoutTemplateDetail,
    TemplateExerciseCreate, TemplateExerciseRead,
    GenerateWorkoutRequest,
)
from app.schemas.workout import WorkoutRead
from app.crud import template as crud

router = APIRouter(prefix="/templates", tags=["templates"])


@router.get("", response_model=list[WorkoutTemplateRead])
def list_templates(db: Session = Depends(get_db)):
    return crud.get_all(db)


@router.get("/{template_id}", response_model=WorkoutTemplateDetail)
def get_template(template_id: int, db: Session = Depends(get_db)):
    template = crud.get_detail(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template


@router.post("", response_model=WorkoutTemplateRead, status_code=201)
def create_template(data: WorkoutTemplateCreate, db: Session = Depends(get_db)):
    return crud.create(db, data)


@router.put("/{template_id}", response_model=WorkoutTemplateRead)
def update_template(template_id: int, data: WorkoutTemplateUpdate, db: Session = Depends(get_db)):
    template = crud.get_by_id(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return crud.update(db, template, data)


@router.delete("/{template_id}", status_code=204)
def delete_template(template_id: int, db: Session = Depends(get_db)):
    template = crud.get_by_id(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    crud.delete(db, template)


@router.post("/{template_id}/exercises", response_model=TemplateExerciseRead, status_code=201)
def add_exercise_to_template(
    template_id: int, data: TemplateExerciseCreate, db: Session = Depends(get_db)
):
    template = crud.get_by_id(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return crud.add_exercise(db, template_id, data)


@router.delete("/{template_id}/exercises/{te_id}", status_code=204)
def remove_exercise_from_template(template_id: int, te_id: int, db: Session = Depends(get_db)):
    template = crud.get_detail(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    te = next((t for t in template.template_exercises if t.id == te_id), None)
    if not te:
        raise HTTPException(status_code=404, detail="TemplateExercise not found")
    crud.remove_exercise(db, te)


@router.post("/{template_id}/generate", response_model=WorkoutRead, status_code=201)
def generate_workout(
    template_id: int, data: GenerateWorkoutRequest, db: Session = Depends(get_db)
):
    template = crud.get_detail(db, template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return crud.generate_workout(db, template, data.date)
