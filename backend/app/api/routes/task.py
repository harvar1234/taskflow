from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    Query,
    status,
)

from sqlalchemy.orm import Session

from app.core.auth import get_current_user
from app.db.dependencies import get_db

from app.models.user import User

from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
    TaskResponse,
)

from app.services.task_service import (
    get_project_for_user,
    create_task,
    get_tasks_by_project,
    get_task_by_id,
    update_task,
    delete_task,
)


router = APIRouter(
    prefix="/projects/{project_id}/tasks",
    tags=["Tasks"],
)


@router.post(
    "",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_new_task(
    project_id: int,
    task_data: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    project = get_project_for_user(
        db=db,
        project_id=project_id,
        user_id=current_user.id,
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    return create_task(
        db=db,
        project=project,
        task_data=task_data,
    )


@router.get(
    "",
    response_model=list[TaskResponse],
)
def get_tasks(
    project_id: int,
    status_filter: str | None = Query(
        default=None,
        alias="status",
    ),
    priority: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    project = get_project_for_user(
        db=db,
        project_id=project_id,
        user_id=current_user.id,
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    return get_tasks_by_project(
        db=db,
        project_id=project_id,
        status=status_filter,
        priority=priority,
    )


@router.get(
    "/{task_id}",
    response_model=TaskResponse,
)
def get_task(
    project_id: int,
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    project = get_project_for_user(
        db=db,
        project_id=project_id,
        user_id=current_user.id,
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    task = get_task_by_id(
        db=db,
        task_id=task_id,
        project_id=project_id,
    )

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found.",
        )

    return task


@router.patch(
    "/{task_id}",
    response_model=TaskResponse,
)
def edit_task(
    project_id: int,
    task_id: int,
    task_data: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    project = get_project_for_user(
        db=db,
        project_id=project_id,
        user_id=current_user.id,
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    task = get_task_by_id(
        db=db,
        task_id=task_id,
        project_id=project_id,
    )

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found.",
        )

    return update_task(
        db=db,
        task=task,
        task_data=task_data,
    )


@router.delete(
    "/{task_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
def remove_task(
    project_id: int,
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):
    project = get_project_for_user(
        db=db,
        project_id=project_id,
        user_id=current_user.id,
    )

    if not project:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Project not found.",
        )

    task = get_task_by_id(
        db=db,
        task_id=task_id,
        project_id=project_id,
    )

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found.",
        )

    delete_task(
        db=db,
        task=task,
    )

    return None