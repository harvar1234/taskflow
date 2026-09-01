import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getProject,
} from "../services/projectService";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../services/taskService";

import TaskCard from "../components/tasks/TaskCard";

export default function ProjectDetails() {
  const { projectId } = useParams();

  const id = Number(projectId);

  const [project, setProject] =
    useState<any>(null);

  const [tasks, setTasks] =
    useState<any[]>([]);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState<
      "Low" | "Medium" | "High"
    >("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, [projectId]);

  const loadData = async () => {
    try {
      const projectData =
        await getProject(id);

      const taskData =
        await getTasks(id);

      setProject(projectData);
      setTasks(taskData);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!title.trim()) return;

    await createTask(id, {
      title,
      description,
      priority,
      status: "To Do",
      due_date: dueDate
        ? new Date(dueDate).toISOString()
        : null,
    });

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");

    await loadData();
  };

  const handleStatusChange = async (
    taskId: number,
    status:
      | "To Do"
      | "In Progress"
      | "Completed"
  ) => {
    await updateTask(
      id,
      taskId,
      { status }
    );

    await loadData();
  };

  const handleDeleteTask = async (
    taskId: number
  ) => {
    const confirmed = window.confirm(
      "Delete this task?"
    );

    if (!confirmed) return;

    await deleteTask(
      id,
      taskId
    );

    await loadData();
  };

  if (loading) {
    return (
      <div className="text-slate-500">
        Loading project...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-red-600">
        Project not found.
      </div>
    );
  }

  const todoTasks = tasks.filter(
    (task) =>
      task.status === "To Do"
  );

  const inProgressTasks = tasks.filter(
    (task) =>
      task.status === "In Progress"
  );

  const completedTasks = tasks.filter(
    (task) =>
      task.status === "Completed"
  );

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold">
          {project.name}
        </h2>

        <p className="text-slate-500 mt-2">
          {project.description ||
            "No description"}
        </p>
      </div>

      {/* Create Task */}

      <form
        onSubmit={handleCreateTask}
        className="bg-white border rounded-xl shadow-sm p-6"
      >

        <h3 className="text-xl font-semibold mb-4">
          Create Task
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="Task title"
            className="border rounded-lg px-4 py-3"
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(
                e.target.value as
                  | "Low"
                  | "Medium"
                  | "High"
              )
            }
            className="border rounded-lg px-4 py-3"
          >
            <option value="Low">Low</option>
            <option value="Medium">
              Medium
            </option>
            <option value="High">High</option>
          </select>

          <input
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Description"
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
            className="border rounded-lg px-4 py-3"
          />

        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Create Task
        </button>

      </form>

      {/* Task Board */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* TO DO */}

        <div className="bg-slate-100 rounded-xl p-4">

          <h3 className="font-semibold text-lg mb-4">
            To Do ({todoTasks.length})
          </h3>

          <div className="space-y-4">
            {todoTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onStatusChange={
                  handleStatusChange
                }
                onDelete={
                  handleDeleteTask
                }
              />
            ))}
          </div>

        </div>

        {/* IN PROGRESS */}

        <div className="bg-slate-100 rounded-xl p-4">

          <h3 className="font-semibold text-lg mb-4">
            In Progress (
            {inProgressTasks.length})
          </h3>

          <div className="space-y-4">
            {inProgressTasks.map(
              (task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={
                    handleStatusChange
                  }
                  onDelete={
                    handleDeleteTask
                  }
                />
              )
            )}
          </div>

        </div>

        {/* COMPLETED */}

        <div className="bg-slate-100 rounded-xl p-4">

          <h3 className="font-semibold text-lg mb-4">
            Completed (
            {completedTasks.length})
          </h3>

          <div className="space-y-4">
            {completedTasks.map(
              (task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onStatusChange={
                    handleStatusChange
                  }
                  onDelete={
                    handleDeleteTask
                  }
                />
              )
            )}
          </div>

        </div>

      </div>

    </div>
  );
}