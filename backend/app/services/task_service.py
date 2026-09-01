from sqlalchemy.orm import Session

from app.models.project import Project
from app.models.task import Task

from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
)


def get_project_for_user(
    db: Session,
    project_id: int,
    user_id: int,
):
    return (
        db.query(Project)
        .filter(
            Project.id == project_id,
            Project.user_id == user_id,
        )
        .first()
    )


def create_task(
    db: Session,
    project: Project,
    task_data: TaskCreate,
):
    task = Task(
        title=task_data.title,
        description=task_data.description,
        status=task_data.status,
        priority=task_data.priority,
        due_date=task_data.due_date,
        project_id=project.id,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return task


def get_tasks_by_project(
    db: Session,
    project_id: int,
    status: str | None = None,
    priority: str | None = None,
):
    query = (
        db.query(Task)
        .filter(
            Task.project_id == project_id
        )
    )

    if status:
        query = query.filter(
            Task.status == status
        )

    if priority:
        query = query.filter(
            Task.priority == priority
        )

    return (
        query
        .order_by(
            Task.created_at.desc()
        )
        .all()
    )


def get_task_by_id(
    db: Session,
    task_id: int,
    project_id: int,
):
    return (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.project_id == project_id,
        )
        .first()
    )


def update_task(
    db: Session,
    task: Task,
    task_data: TaskUpdate,
):
    update_data = task_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            task,
            field,
            value,
        )

    db.commit()
    db.refresh(task)

    return task


def delete_task(
    db: Session,
    task: Task,
):
    db.delete(task)
    db.commit()