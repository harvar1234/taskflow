import {
  Navigate,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { Link } from "react-router-dom";
export default function MainLayout() {
  const navigate = useNavigate();

  const token =
    localStorage.getItem("access_token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem(
      "access_token"
    );

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <header className="bg-white border-b">

        <div className="flex items-center gap-8">

            <h1 className="text-2xl font-bold">
                TaskFlow
            </h1>

            <nav className="flex gap-5">

            <Link
                to="/dashboard"
                className="text-slate-600 hover:text-blue-600"
            >
                Dashboard
    </Link>

    <Link
      to="/projects"
      className="text-slate-600 hover:text-blue-600"
    >
      Projects
    </Link>

  </nav>

</div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Outlet />
      </main>

    </div>
  );
}