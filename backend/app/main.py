from fastapi import FastAPI

from app.api.routes import (
    auth,
    user,
    project,
    task,
    dashboard,
)
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="TaskFlow API",
    version="1.0.0",
)


app.include_router(
    auth.router
)

app.include_router(
    user.router
)
app.include_router(project.router)
app.include_router(task.router)
app.include_router(dashboard.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message":
        "TaskFlow backend is running."
    }