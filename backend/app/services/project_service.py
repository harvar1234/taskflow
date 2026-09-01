from sqlalchemy.orm import Session

from app.models.project import Project
from app.schemas.project import (
    ProjectCreate,
    ProjectUpdate,
)


def create_project(
    db: Session,
    project_data: ProjectCreate,
    user_id: int,
):
    project = Project(
        name=project_data.name,
        description=project_data.description,
        user_id=user_id,
    )

    db.add(project)
    db.commit()
    db.refresh(project)

    return project


def get_projects_by_user(
    db: Session,
    user_id: int,
):
    return (
        db.query(Project)
        .filter(
            Project.user_id == user_id
        )
        .order_by(
            Project.created_at.desc()
        )
        .all()
    )


def get_project_by_id(
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


def update_project(
    db: Session,
    project: Project,
    project_data: ProjectUpdate,
):
    update_data = project_data.model_dump(
        exclude_unset=True
    )

    for field, value in update_data.items():
        setattr(
            project,
            field,
            value,
        )

    db.commit()
    db.refresh(project)

    return project


def delete_project(
    db: Session,
    project: Project,
):
    db.delete(project)
    db.commit()