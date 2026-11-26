import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { APP_TITLE, HOME, MINE_ROUTE, MINE_TITLE } from "../config";
import { clearSession, getToken } from "../api";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  if (!getToken()) return <Navigate to="/login" replace />;

  const logout = () => {
    clearSession();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex items-center justify-between bg-white px-6 py-4 shadow">
        <span className="text-xl font-bold text-blue-700">{APP_TITLE}</span>
        <nav className="flex items-center gap-4">
          <Link to={HOME} className="hover:underline">
            Catálogo
          </Link>
          <Link to={MINE_ROUTE} className="hover:underline">
            {MINE_TITLE}
          </Link>
          <button onClick={logout} className="rounded bg-red-600 px-4 py-2 text-white">
            Cerrar sesión
          </button>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl p-6">
        <Outlet />
      </main>
    </div>
  );
}
