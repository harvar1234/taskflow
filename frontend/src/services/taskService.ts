import api from "../api/axios";

export interface TaskCreate {
  title: string;
  description?: string;
  status?: "To Do" | "In Progress" | "Completed";
  priority?: "Low" | "Medium" | "High";
  due_date?: string | null;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: "To Do" | "In Progress" | "Completed";
  priority?: "Low" | "Medium" | "High";
  due_date?: string | null;
}

export const getTasks = async (
  projectId: number
) => {
  const response = await api.get(
    `/projects/${projectId}/tasks`
  );

  return response.data;
};

export const createTask = async (
  projectId: number,
  data: TaskCreate
) => {
  const response = await api.post(
    `/projects/${projectId}/tasks`,
    data
  );

  return response.data;
};

export const updateTask = async (
  projectId: number,
  taskId: number,
  data: TaskUpdate
) => {
  const response = await api.patch(
    `/projects/${projectId}/tasks/${taskId}`,
    data
  );

  return response.data;
};

export const deleteTask = async (
  projectId: number,
  taskId: number
) => {
  await api.delete(
    `/projects/${projectId}/tasks/${taskId}`
  );
};