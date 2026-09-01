import {
  useEffect,
  useState,
} from "react";

import ProjectCard from "../components/projects/ProjectCard";

import {
  createProject,
  deleteProject,
  getProjects,
} from "../services/projectService";


export default function Projects() {
  const [projects, setProjects] =
    useState<any[]>([]);

  const [name, setName] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  useEffect(() => {
    loadProjects();
  }, []);


  const loadProjects = async () => {
    try {
      const data =
        await getProjects();

      setProjects(data);
    } finally {
      setLoading(false);
    }
  };


  const handleCreate = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    await createProject({
      name,
      description,
    });

    setName("");
    setDescription("");

    await loadProjects();
  };


  const handleDelete = async (
    projectId: number
  ) => {
    const confirmed = window.confirm(
      "Delete this project and all its tasks?"
    );

    if (!confirmed) return;

    await deleteProject(projectId);

    await loadProjects();
  };


  if (loading) {
    return (
      <div className="text-slate-500">
        Loading projects...
      </div>
    );
  }


  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold">
          Projects
        </h2>

        <p className="text-slate-500 mt-2">
          Create and manage your projects.
        </p>
      </div>


      <form
        onSubmit={handleCreate}
        className="bg-white border rounded-xl shadow-sm p-6"
      >

        <h3 className="text-xl font-semibold mb-4">
          Create Project
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Project name"
            className="border rounded-lg px-4 py-3"
          />

          <input
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            placeholder="Description"
            className="border rounded-lg px-4 py-3"
          />

        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          Create Project
        </button>

      </form>


      {projects.length === 0 ? (

        <div className="bg-white border rounded-xl p-8 text-center text-slate-500">
          No projects yet.
        </div>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {projects.map((project) => (

            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              onDelete={handleDelete}
            />

          ))}

        </div>

      )}

    </div>
  );
}