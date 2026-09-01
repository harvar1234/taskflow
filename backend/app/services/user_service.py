from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import (
    hash_password,
    verify_password,
)


def get_user_by_email(
    db: Session,
    email: str,
):
    return (
        db.query(User)
        .filter(
            User.email == email
        )
        .first()
    )


def create_user(
    db: Session,
    user_data: UserCreate,
):
    existing_user = get_user_by_email(
        db,
        user_data.email,
    )

    if existing_user:
        return None

    user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        hashed_password=hash_password(
            user_data.password
        ),
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    email: str,
    password: str,
):
    user = get_user_by_email(
        db,
        email,
    )

    if not user:
        return None

    if not verify_password(
        password,
        user.hashed_password,
    ):
        return None

    return user