# TaskFlow

TaskFlow is a full-stack project and task management application that allows users to securely manage projects, organize tasks, track progress, set priorities, and monitor productivity through a dashboard.

The application is built with a React + TypeScript frontend and a FastAPI + PostgreSQL backend, with JWT-based authentication and user-specific data isolation.

## Features

### Authentication
- User registration and login
- Secure password hashing
- JWT-based authentication
- Protected API endpoints and frontend routes
- Authenticated user profile retrieval

### Project Management
- Create projects
- View all projects
- View individual project details
- Update projects
- Delete projects
- User-specific project access

### Task Management
- Create tasks under projects
- Update task details
- Delete tasks
- Set task priority
- Set due dates
- Track task status
- Filter tasks by status and priority

### Task Board

Tasks are organized into three workflow stages:

- To Do
- In Progress
- Completed

Task status can be changed directly from the project task board.

### Dashboard

The dashboard provides an overview of:

- Total projects
- Total tasks
- To Do tasks
- In Progress tasks
- Completed tasks
- High-priority tasks

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Lucide React

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Passlib / bcrypt
- Uvicorn

### Database

- PostgreSQL
- Alembic database migrations

### Development Tools

- Git
- GitHub
- VS Code
- Swagger / OpenAPI

## Architecture

TaskFlow follows a layered full-stack architecture:

```text
React + TypeScript Frontend
          |
        Axios
          |
          v
     FastAPI REST API
          |
    -----------------
    |       |       |
  Routes  Services  Schemas
            |
            v
        SQLAlchemy
            |
            v
        PostgreSQL
```

The backend separates API routing, business logic, validation, authentication, ORM models, and database access into dedicated modules.

## Database Relationships

```text
User
 |
 | 1:N
 v
Projects
 |
 | 1:N
 v
Tasks
```

Each project belongs to a specific authenticated user, and each task belongs to a project.

Deleting a project also removes its associated tasks.

## Project Structure

```text
TaskFlow/
|
|-- backend/
|   |-- alembic/
|   |   `-- versions/
|   |
|   |-- app/
|   |   |-- api/
|   |   |   `-- routes/
|   |   |
|   |   |-- core/
|   |   |-- db/
|   |   |-- models/
|   |   |-- schemas/
|   |   |-- services/
|   |   `-- main.py
|   |
|   |-- alembic.ini
|   `-- requirements.txt
|
|-- frontend/
|   |-- src/
|   |   |-- api/
|   |   |-- components/
|   |   |-- layouts/
|   |   |-- pages/
|   |   `-- services/
|   |
|   |-- package.json
|   `-- vite.config.ts
|
|-- .env.example
|-- .gitignore
`-- README.md
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Authenticate user and receive JWT |

### Users

| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/me` | Get authenticated user |

### Projects

| Method | Endpoint | Description |
|---|---|---|
| POST | `/projects` | Create project |
| GET | `/projects` | Get user's projects |
| GET | `/projects/{project_id}` | Get project |
| PATCH | `/projects/{project_id}` | Update project |
| DELETE | `/projects/{project_id}` | Delete project |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| POST | `/projects/{project_id}/tasks` | Create task |
| GET | `/projects/{project_id}/tasks` | Get project tasks |
| GET | `/projects/{project_id}/tasks/{task_id}` | Get task |
| PATCH | `/projects/{project_id}/tasks/{task_id}` | Update task |
| DELETE | `/projects/{project_id}/tasks/{task_id}` | Delete task |

Task listing also supports status and priority filtering.

### Dashboard

| Method | Endpoint | Description |
|---|---|---|
| GET | `/dashboard` | Get authenticated user's task/project statistics |

## Local Setup

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd taskflow
```

### 2. Backend setup

```bash
cd backend

python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Environment variables

Copy the example configuration and create:

```text
backend/.env
```

Configure:

```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/taskflow_db
SECRET_KEY=your_secure_secret_key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440
```

Never commit the real `.env` file.

### 4. Database setup

Create a PostgreSQL database named:

```text
taskflow_db
```

Then run the migrations:

```bash
alembic upgrade head
```

### 5. Start the backend

```bash
uvicorn app.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

### 6. Frontend setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

## Security

TaskFlow implements:

- Password hashing before database storage
- JWT Bearer authentication
- Protected backend endpoints
- Protected frontend routes
- User-specific project access
- Project ownership verification before task access
- Environment-based secret management
- `.gitignore` protection for credentials and local dependencies

## Validation

Pydantic is used for request and response validation.

Task status is restricted to:

```text
To Do
In Progress
Completed
```

Task priority is restricted to:

```text
Low
Medium
High
```

## Key Concepts Demonstrated

This project demonstrates practical implementation of:

- Full-stack application development
- REST API design
- Authentication and authorization
- CRUD operations
- Relational database modeling
- One-to-many relationships
- Database migrations
- ORM-based database operations
- API validation
- React state management
- Protected routing
- Frontend/backend integration
- Axios interceptors
- Responsive UI development
- Git-based version control

## Future Improvements

Possible future enhancements include:

- Drag-and-drop Kanban tasks
- Search and advanced filtering
- Project deadlines
- Task assignees
- Team collaboration
- Notifications
- Activity history
- Pagination
- Dark mode
- Deployment and CI/CD

## Author

Developed as a full-stack portfolio project demonstrating React, TypeScript, Python, FastAPI, PostgreSQL, REST APIs, authentication, and modern application development practices.
