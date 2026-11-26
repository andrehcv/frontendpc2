import { buttonClass } from "../ui";

interface Props {
  page: number;
  totalPages: number;
  disabled: boolean; 
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, disabled, onChange }: Props) {
  return (
    <div className="mt-6 flex items-center justify-center gap-4">
      <button className={buttonClass} disabled={disabled || page <= 1} onClick={() => onChange(page - 1)}>
        Anterior
      </button>
      <span>
        Página {page} de {totalPages}
      </span>
      <button className={buttonClass} disabled={disabled || page >= totalPages} onClick={() => onChange(page + 1)}>
        Siguiente
      </button>
    </div>
  );
}
