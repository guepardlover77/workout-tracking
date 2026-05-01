# Workout Tracker

Application de suivi d'entraînements — backend FastAPI + frontend React.

## Prérequis

- Python 3.11+
- Node.js 18+

## Installation

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows : venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend

```bash
cd frontend
npm install
```

## Lancement

### Backend (port 8000)

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Frontend (port 5173)

```bash
cd frontend
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173).

## Stack

| Couche | Tech |
|--------|------|
| Backend | FastAPI · SQLAlchemy · SQLite |
| Frontend | React 18 · Vite · TailwindCSS · TanStack Query |
