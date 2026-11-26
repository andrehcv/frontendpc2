import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register, getApiError } from "../api";
import { buttonClass, cardClass, inputClass } from "../ui";
import Field from "../components/Field";

type Errors = { name?: string; email?: string; password?: string };

function validate(name: string, email: string, password: string): Errors {
  const errors: Errors = {};
  if (!name.trim() || name.trim().length > 100) errors.name = "Nombre obligatorio, máximo 100 caracteres.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = "Ingresa un correo válido.";
  if (password.length < 8 || password.length > 72) errors.password = "La contraseña debe tener de 8 a 72 caracteres.";
  // Para "ASCII": if (!/^[ -~]{8,72}$/.test(password)) ...
  return errors;
}

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setServerError("");
    const errs = validate(name, email, password);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate("/login", { replace: true });
    } catch (err) {
      setServerError(getApiError(err).message); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} noValidate className={`${cardClass} w-full max-w-sm`}>
        <h1 className="mb-6 text-2xl font-bold">Crear cuenta</h1>
        <Field label="Nombre" htmlFor="name" error={errors.name}>
          <input id="name" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Correo" htmlFor="email" error={errors.email}>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
        </Field>
        <Field label="Contraseña" htmlFor="password" error={errors.password}>
          <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} />
        </Field>
        {serverError && <p className="mb-4 rounded bg-red-100 p-3 text-red-700">{serverError}</p>}
        <button type="submit" disabled={loading} className={`${buttonClass} w-full`}>
          {loading ? "Registrando..." : "Registrarme"}
        </button>
        <p className="mt-4 text-center text-sm">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 underline">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}
