from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
import app.models  # noqa: registers all models before create_all
from app.routers import exercises, workouts, sets, templates

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Workout Tracker API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(exercises.router, prefix="/api")
app.include_router(workouts.router, prefix="/api")
app.include_router(sets.router, prefix="/api")
app.include_router(templates.router, prefix="/api")


@app.get("/")
def root():
    return {"message": "Workout Tracker API", "docs": "/docs"}
