import { Link } from "react-router-dom";

type Props = {
  id: number;
  name: string;
  description?: string | null;
  onDelete: (id: number) => void;
};

export default function ProjectCard({
  id,
  name,
  description,
  onDelete,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">

      <h3 className="text-xl font-semibold">
        {name}
      </h3>

      <p className="text-slate-500 mt-2">
        {description || "No description"}
      </p>

      <div className="flex gap-3 mt-5">

        <Link
          to={`/projects/${id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Open
        </Link>

        <button
          onClick={() => onDelete(id)}
          className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

    </div>
  );
}