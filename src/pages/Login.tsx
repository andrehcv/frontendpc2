import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, saveToken, getApiError } from "../api";
import { HOME } from "../config";
import { buttonClass, cardClass, inputClass } from "../ui";
import Field from "../components/Field";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim() || !password) {
      setError("Ingresa tu correo y tu contraseña.");
      return;
    }
    setLoading(true);
    try {
      const data = await login(email.trim(), password);
      saveToken(data.token);
      navigate(HOME, { replace: true });
    } catch (err) {
      const { status, message } = getApiError(err);
      setError(status === 401 || status === 400 ? "Correo o contraseña incorrectos." : message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} noValidate className={`${cardClass} w-full max-w-sm`}>
        <h1 className="mb-6 text-2xl font-bold">Iniciar sesión</h1>
        <Field label="Correo" htmlFor="email">
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Contraseña" htmlFor="password">
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </Field>
        {error && <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</p>}
        <button type="submit" disabled={loading} className={`${buttonClass} w-full`}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
        <p className="mt-4 text-center text-sm">
          ¿No tienes cuenta? <Link to="/register" className="text-blue-600 underline">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}
