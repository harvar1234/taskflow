import api from "../api/axios";

export interface ProjectCreate {
  name: string;
  description?: string;
}

export interface ProjectUpdate {
  name?: string;
  description?: string;
}

export const getProjects = async () => {
  const response = await api.get("/projects");
  return response.data;
};

export const createProject = async (
  data: ProjectCreate
) => {
  const response = await api.post(
    "/projects",
    data
  );

  return response.data;
};

export const getProject = async (
  projectId: number
) => {
  const response = await api.get(
    `/projects/${projectId}`
  );

  return response.data;
};

export const updateProject = async (
  projectId: number,
  data: ProjectUpdate
) => {
  const response = await api.patch(
    `/projects/${projectId}`,
    data
  );

  return response.data;
};

export const deleteProject = async (
  projectId: number
) => {
  await api.delete(
    `/projects/${projectId}`
  );
};