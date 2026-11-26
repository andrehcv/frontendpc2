interface Props {
  loading: boolean;
  error: string;
  empty: boolean;
  emptyText?: string;
  onRetry?: () => void;
}

export default function Status({ loading, error, empty, emptyText = "No hay registros para mostrar.", onRetry }: Props) {
  if (loading) return <p className="py-6 text-center text-gray-500">Cargando...</p>;
  if (error) {
    return (
      <div className="flex items-center justify-between rounded bg-red-100 p-3 text-red-700">
        <span>{error}</span>
        {onRetry && (
          <button onClick={onRetry} className="rounded border border-red-700 px-3 py-1">
            Reintentar
          </button>
        )}
      </div>
    );
  }
  if (empty) return <p className="py-6 text-center text-gray-500">{emptyText}</p>;
  return null;
}
