# Graph Report - .  (2026-05-01)

## Corpus Check
- Corpus is ~7,312 words - fits in a single context window. You may not need a graph.

## Summary
- 200 nodes · 215 edges · 43 communities detected
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 31 edges (avg confidence: 0.56)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Pydantic Schema Models|Pydantic Schema Models]]
- [[_COMMUNITY_App Stack & Infrastructure|App Stack & Infrastructure]]
- [[_COMMUNITY_SQLAlchemy ORM Models|SQLAlchemy ORM Models]]
- [[_COMMUNITY_Template CRUD Service|Template CRUD Service]]
- [[_COMMUNITY_Workout CRUD Service|Workout CRUD Service]]
- [[_COMMUNITY_Frontend Template API|Frontend Template API]]
- [[_COMMUNITY_Template Router (FastAPI)|Template Router (FastAPI)]]
- [[_COMMUNITY_Frontend Workout API|Frontend Workout API]]
- [[_COMMUNITY_Workout Router (FastAPI)|Workout Router (FastAPI)]]
- [[_COMMUNITY_Frontend Exercise API|Frontend Exercise API]]
- [[_COMMUNITY_Set Form UI Component|Set Form UI Component]]
- [[_COMMUNITY_Exercise Router (FastAPI)|Exercise Router (FastAPI)]]
- [[_COMMUNITY_Exercise CRUD Service|Exercise CRUD Service]]
- [[_COMMUNITY_Set CRUD Service|Set CRUD Service]]
- [[_COMMUNITY_Frontend Set API|Frontend Set API]]
- [[_COMMUNITY_Set Schema Models|Set Schema Models]]
- [[_COMMUNITY_Set Router (FastAPI)|Set Router (FastAPI)]]
- [[_COMMUNITY_Workout Popover UI|Workout Popover UI]]
- [[_COMMUNITY_Workout Exercise Block UI|Workout Exercise Block UI]]
- [[_COMMUNITY_Calendar Page UI|Calendar Page UI]]
- [[_COMMUNITY_Workouts Page UI|Workouts Page UI]]
- [[_COMMUNITY_Templates Page UI|Templates Page UI]]
- [[_COMMUNITY_Input UI Component|Input UI Component]]
- [[_COMMUNITY_Modal UI Component|Modal UI Component]]
- [[_COMMUNITY_Button UI Component|Button UI Component]]
- [[_COMMUNITY_Health Check Endpoint|Health Check Endpoint]]
- [[_COMMUNITY_Vite Build Config|Vite Build Config]]
- [[_COMMUNITY_PostCSS Config|PostCSS Config]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]
- [[_COMMUNITY_React App Root|React App Root]]
- [[_COMMUNITY_Frontend Entry Point|Frontend Entry Point]]
- [[_COMMUNITY_API Client Config|API Client Config]]
- [[_COMMUNITY_Module Index|Module Index]]
- [[_COMMUNITY_Exercises Page UI|Exercises Page UI]]
- [[_COMMUNITY_Workout Detail Page UI|Workout Detail Page UI]]
- [[_COMMUNITY_Exercise Picker UI|Exercise Picker UI]]
- [[_COMMUNITY_Layout UI Component|Layout UI Component]]
- [[_COMMUNITY_Exercise Form Modal UI|Exercise Form Modal UI]]
- [[_COMMUNITY_Package Init (backend)|Package Init (backend)]]
- [[_COMMUNITY_Package Init (routers)|Package Init (routers)]]
- [[_COMMUNITY_Package Init (services)|Package Init (services)]]
- [[_COMMUNITY_Package Init (models)|Package Init (models)]]
- [[_COMMUNITY_Package Init (schemas)|Package Init (schemas)]]

## God Nodes (most connected - your core abstractions)
1. `ExerciseRead` - 21 edges
2. `Base` - 8 edges
3. `Backend (FastAPI)` - 8 edges
4. `Frontend (React 18 + Vite)` - 7 edges
5. `TemplateExerciseBase` - 5 edges
6. `WorkoutTemplateBase` - 5 edges
7. `WorkoutExerciseBase` - 5 edges
8. `WorkoutBase` - 5 edges
9. `ExerciseBase` - 4 edges
10. `SetBase` - 4 edges

## Surprising Connections (you probably didn't know these)
- `fastapi>=0.111.0` --semantically_similar_to--> `FastAPI`  [EXTRACTED] [semantically similar]
  backend/requirements.txt → README.md
- `sqlalchemy>=2.0.0` --semantically_similar_to--> `SQLAlchemy`  [EXTRACTED] [semantically similar]
  backend/requirements.txt → README.md
- `uvicorn[standard]>=0.29.0` --semantically_similar_to--> `Uvicorn ASGI Server`  [EXTRACTED] [semantically similar]
  backend/requirements.txt → README.md
- `pydantic>=2.0.0` --semantically_similar_to--> `Pydantic`  [EXTRACTED] [semantically similar]
  backend/requirements.txt → README.md
- `Exercise` --uses--> `Base`  [INFERRED]
  backend/app/models/exercise.py → backend/app/database.py

## Hyperedges (group relationships)
- **Backend Python Stack** — req_fastapi, req_uvicorn, req_sqlalchemy, req_pydantic [EXTRACTED 1.00]
- **Frontend JavaScript Stack** — readme_react18, readme_vite, readme_tailwindcss, readme_tanstack_query [EXTRACTED 1.00]
- **Data Persistence Layer** — readme_sqlalchemy, readme_sqlite, req_sqlalchemy [INFERRED 0.85]

## Communities

### Community 0 - "Pydantic Schema Models"
Cohesion: 0.19
Nodes (24): BaseModel, ExerciseBase, ExerciseCreate, ExerciseRead, ExerciseUpdate, GenerateWorkoutRequest, TemplateExerciseBase, TemplateExerciseCreate (+16 more)

### Community 1 - "App Stack & Infrastructure"
Cohesion: 0.12
Nodes (21): app.main:app (FastAPI entry point), Backend (FastAPI), FastAPI, Frontend (React 18 + Vite), Node.js 18+, Frontend Port 5173, Backend Port 8000, Pydantic (+13 more)

### Community 2 - "SQLAlchemy ORM Models"
Cohesion: 0.17
Nodes (9): Base, Base, DeclarativeBase, Exercise, Set, TemplateExercise, WorkoutTemplate, WorkoutExercise (+1 more)

### Community 3 - "Template CRUD Service"
Cohesion: 0.22
Nodes (2): delete(), remove_exercise()

### Community 4 - "Workout CRUD Service"
Cohesion: 0.24
Nodes (4): add_exercise(), delete(), get_workout_exercise(), remove_exercise()

### Community 5 - "Frontend Template API"
Cohesion: 0.22
Nodes (0): 

### Community 6 - "Template Router (FastAPI)"
Cohesion: 0.22
Nodes (0): 

### Community 7 - "Frontend Workout API"
Cohesion: 0.25
Nodes (0): 

### Community 8 - "Workout Router (FastAPI)"
Cohesion: 0.25
Nodes (0): 

### Community 9 - "Frontend Exercise API"
Cohesion: 0.33
Nodes (0): 

### Community 10 - "Set Form UI Component"
Cohesion: 0.33
Nodes (0): 

### Community 11 - "Exercise Router (FastAPI)"
Cohesion: 0.33
Nodes (0): 

### Community 12 - "Exercise CRUD Service"
Cohesion: 0.33
Nodes (0): 

### Community 13 - "Set CRUD Service"
Cohesion: 0.4
Nodes (2): create(), get_by_workout_exercise()

### Community 14 - "Frontend Set API"
Cohesion: 0.4
Nodes (0): 

### Community 15 - "Set Schema Models"
Cohesion: 0.6
Nodes (4): SetBase, SetCreate, SetRead, SetUpdate

### Community 16 - "Set Router (FastAPI)"
Cohesion: 0.4
Nodes (0): 

### Community 17 - "Workout Popover UI"
Cohesion: 0.67
Nodes (0): 

### Community 18 - "Workout Exercise Block UI"
Cohesion: 0.67
Nodes (0): 

### Community 19 - "Calendar Page UI"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Workouts Page UI"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "Templates Page UI"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Input UI Component"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Modal UI Component"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Button UI Component"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Health Check Endpoint"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Vite Build Config"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "PostCSS Config"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Tailwind Config"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "React App Root"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Frontend Entry Point"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "API Client Config"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Module Index"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Exercises Page UI"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Workout Detail Page UI"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Exercise Picker UI"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "Layout UI Component"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Exercise Form Modal UI"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Package Init (backend)"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Package Init (routers)"
Cohesion: 1.0
Nodes (0): 

### Community 40 - "Package Init (services)"
Cohesion: 1.0
Nodes (0): 

### Community 41 - "Package Init (models)"
Cohesion: 1.0
Nodes (0): 

### Community 42 - "Package Init (schemas)"
Cohesion: 1.0
Nodes (0): 

## Knowledge Gaps
- **7 isolated node(s):** `React 18`, `Vite`, `TailwindCSS`, `Python 3.11+`, `Node.js 18+` (+2 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Calendar Page UI`** (2 nodes): `handleEventClick()`, `CalendarPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Workouts Page UI`** (2 nodes): `WorkoutsPage.tsx`, `today()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Templates Page UI`** (2 nodes): `TemplatesPage.tsx`, `today()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Input UI Component`** (2 nodes): `Input.tsx`, `Input()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Modal UI Component`** (2 nodes): `Modal.tsx`, `Modal()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button UI Component`** (2 nodes): `Button()`, `Button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Health Check Endpoint`** (2 nodes): `main.py`, `root()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Build Config`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `PostCSS Config`** (1 nodes): `postcss.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tailwind Config`** (1 nodes): `tailwind.config.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React App Root`** (1 nodes): `App.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Frontend Entry Point`** (1 nodes): `main.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `API Client Config`** (1 nodes): `client.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Module Index`** (1 nodes): `index.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Exercises Page UI`** (1 nodes): `ExercisesPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Workout Detail Page UI`** (1 nodes): `WorkoutDetailPage.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Exercise Picker UI`** (1 nodes): `ExercisePicker.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Layout UI Component`** (1 nodes): `Layout.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Exercise Form Modal UI`** (1 nodes): `ExerciseFormModal.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Package Init (backend)`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Package Init (routers)`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Package Init (services)`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Package Init (models)`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Package Init (schemas)`** (1 nodes): `__init__.py`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Are the 19 inferred relationships involving `ExerciseRead` (e.g. with `TemplateExerciseBase` and `TemplateExerciseCreate`) actually correct?**
  _`ExerciseRead` has 19 INFERRED edges - model-reasoned connections that need verification._
- **Are the 6 inferred relationships involving `Base` (e.g. with `Exercise` and `Set`) actually correct?**
  _`Base` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Backend (FastAPI)` (e.g. with `Pydantic` and `TanStack Query`) actually correct?**
  _`Backend (FastAPI)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `React 18`, `Vite`, `TailwindCSS` to the rest of the system?**
  _7 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `App Stack & Infrastructure` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._