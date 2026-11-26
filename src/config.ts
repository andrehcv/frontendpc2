export const API_URL = "https://bibliotecaactiva-api.aaron-navarro.workers.dev";
export const APP_TITLE = "BibliotecaActiva";
export const PAGE_SIZE = "5";

export const RESOURCE = "materials";
export const HOME = "/dashboard";
export const DETAIL = "/materials";

export const METHOD = "post";
export const OP_PATH = "loans";
export const CONFLICT_CODE = "NO_COPIES";
export const CONFLICT_MSG = "El material ya no tiene ejemplares disponibles";

export const MINE_API = "api/me/loans";
export const MINE_ROUTE = "/my-loans";
export const MINE_TITLE = "Mis préstamos";

export const ACTION_METHOD = "patch";
export const actionUrl = (id: number) => `api/loans/${id}/return`;
export const ACTION_LABEL = "Devolver";
export const ACTION_STATUS = "ACTIVE";
export const STATE_CODE = "INVALID_STATE";

export const STATE_MSG = "El préstamo ya no está activo";


