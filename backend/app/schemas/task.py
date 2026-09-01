from datetime import datetime
from enum import Enum

from pydantic import BaseModel, Field


class TaskStatus(str, Enum):
    TODO = "To Do"
    IN_PROGRESS = "In Progress"
    COMPLETED = "Completed"


class TaskPriority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"


class TaskCreate(BaseModel):
    title: str = Field(
        ...,
        min_length=2,
        max_length=200,
    )

    description: str | None = None

    status: TaskStatus = TaskStatus.TODO

    priority: TaskPriority = TaskPriority.MEDIUM

    due_date: datetime | None = None


class TaskUpdate(BaseModel):
    title: str | None = Field(
        default=None,
        min_length=2,
        max_length=200,
    )

    description: str | None = None

    status: TaskStatus | None = None

    priority: TaskPriority | None = None

    due_date: datetime | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    status: TaskStatus
    priority: TaskPriority
    due_date: datetime | None
    created_at: datetime
    project_id: int

    class Config:
        from_attributes = True