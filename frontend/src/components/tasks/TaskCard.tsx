type Props = {
  task: any;
  onStatusChange: (
    taskId: number,
    status: "To Do" | "In Progress" | "Completed"
  ) => void;
  onDelete: (taskId: number) => void;
};

export default function TaskCard({
  task,
  onStatusChange,
  onDelete,
}: Props) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm">

      <div className="flex justify-between gap-4">
        <h4 className="font-semibold text-slate-900">
          {task.title}
        </h4>

        <span
          className={`text-xs px-2 py-1 rounded-full font-medium ${
            task.priority === "High"
              ? "bg-red-100 text-red-700"
              : task.priority === "Medium"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-slate-500 mt-2">
          {task.description}
        </p>
      )}

      {task.due_date && (
        <p className="text-xs text-slate-400 mt-3">
          Due:{" "}
          {new Date(task.due_date).toLocaleString()}
        </p>
      )}

      <select
        value={task.status}
        onChange={(e) =>
          onStatusChange(
            task.id,
            e.target.value as
              | "To Do"
              | "In Progress"
              | "Completed"
          )
        }
        className="w-full mt-4 border rounded-lg px-3 py-2 text-sm"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">
          In Progress
        </option>
        <option value="Completed">
          Completed
        </option>
      </select>

      <button
        onClick={() => onDelete(task.id)}
        className="mt-3 text-sm text-red-600 hover:text-red-700"
      >
        Delete
      </button>

    </div>
  );
}