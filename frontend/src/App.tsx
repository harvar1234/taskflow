import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import ProjectDetails from "./pages/ProjectDetails";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Public */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected */}

        <Route
          element={<MainLayout />}
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>

        <Route
          path="/projects"
          element={<Projects />}
        />
        <Route
          path="/projects/:projectId"
          element={<ProjectDetails />}
        />

      </Routes>

    </BrowserRouter>
  );
}