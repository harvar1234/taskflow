from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.project import Project
from app.models.task import Task


def get_dashboard_stats(
    db: Session,
    user_id: int,
):
    total_projects = (
        db.query(Project)
        .filter(
            Project.user_id == user_id
        )
        .count()
    )

    total_tasks = (
        db.query(Task)
        .join(
            Project,
            Task.project_id == Project.id,
        )
        .filter(
            Project.user_id == user_id,
        )
        .count()
    )

    todo_tasks = (
        db.query(Task)
        .join(
            Project,
            Task.project_id == Project.id,
        )
        .filter(
            Project.user_id == user_id,
            Task.status == "To Do",
        )
        .count()
    )

    in_progress_tasks = (
        db.query(Task)
        .join(
            Project,
            Task.project_id == Project.id,
        )
        .filter(
            Project.user_id == user_id,
            Task.status == "In Progress",
        )
        .count()
    )

    completed_tasks = (
        db.query(Task)
        .join(
            Project,
            Task.project_id == Project.id,
        )
        .filter(
            Project.user_id == user_id,
            Task.status == "Completed",
        )
        .count()
    )

    high_priority_tasks = (
        db.query(Task)
        .join(
            Project,
            Task.project_id == Project.id,
        )
        .filter(
            Project.user_id == user_id,
            Task.priority == "High",
        )
        .count()
    )

    return {
        "total_projects": total_projects,
        "total_tasks": total_tasks,
        "todo_tasks": todo_tasks,
        "in_progress_tasks": in_progress_tasks,
        "completed_tasks": completed_tasks,
        "high_priority_tasks": high_priority_tasks,
    }