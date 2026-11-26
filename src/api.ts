import axios from "axios";
import { API_URL, RESOURCE, PAGE_SIZE, OP_METHOD, OP_PATH, MINE_API, ACTION_METHOD, actionUrl } from "./config";
import type { Item, Detail, OperationBody, Operation } from "./types";

export const getToken = () => localStorage.getItem("token");
export const saveToken = (token: string) => localStorage.setItem("token", token);
export const clearSession = () => localStorage.removeItem("token");

export const api = axios.create({ baseURL: API_URL, timeout: 10000 });

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token && !config.url?.includes("/auth/")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if ((status === 401 || status === 403) && !error.config?.url?.includes("/auth/")) {
      clearSession();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

const MESSAGES: Record<number, string> = {
  400: "Datos inválidos. Revisa los campos.",
  401: "Sesión inválida o credenciales incorrectas.",
  403: "No tienes permiso para esta acción.",
  404: "El recurso no existe.",
  409: "Conflicto con el estado actual de los datos.",
  422: "Datos inválidos.",
};

export function getApiError(error: unknown) {
  if (axios.isAxiosError(error) && error.response) {
    const { status, data } = error.response;
    const body = typeof data === "object" && data !== null ? data : {};
    const fallback = MESSAGES[status] ?? (status >= 500 ? "Error del servidor. Intenta más tarde." : `Error ${status}`);
    return {
      status,
      code: String(body.code ?? body.error ?? ""),
      message: String(body.message ?? body.detail ?? fallback),
    };
  }

  return { status: 0, code: "NETWORK_ERROR", message: "No se pudo conectar con el servidor." };
}

type RawPage<T> = { items?: T[]; content?: T[]; totalPages?: number; totalItems?: number; totalElements?: number };

function toPage<T>(data: RawPage<T> | T[], page: number) {
  if (Array.isArray(data)) {
    return { items: data, totalPages: data.length === PAGE_SIZE ? page + 1 : page };
  }
  const total = data.totalItems ?? data.totalElements ?? 0;
  return { items: data.items ?? data.content ?? [], totalPages: data.totalPages ?? Math.ceil(total / PAGE_SIZE) };
}

//endpoints
export const login = (email: string, password: string) =>
  api.post<{ token: string }>("/api/auth/login", { email, password }).then((r) => r.data);

export const register = (name: string, email: string, password: string) =>
  api.post("/api/auth/register", { name, email, password });

export const getItems = (page: number) =>
  api.get(`/api/${RESOURCE}`, { params: { page, size: PAGE_SIZE } }).then((r) => toPage<Item>(r.data, page));

export const getDetail = (id: string) => api.get<Detail>(`/api/${RESOURCE}/${id}`).then((r) => r.data);

export const runOperation = (id: string, body: OperationBody) =>
  api
    .request<Operation>({
      method: OP_METHOD,
      url: `/api/${RESOURCE}/${id}${OP_PATH ? `/${OP_PATH}` : ""}`,
      data: body,
    })
    .then((r) => r.data);

// mis operaciones (acepta arreglo o lista paginada)
export const getMine = () => api.get(MINE_API).then((r) => toPage<Operation>(r.data, 1).items);

// acción sobre una operación propia 
export const runAction = (id: number) => api.request({ method: ACTION_METHOD, url: actionUrl(id) });
