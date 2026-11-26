import { useCallback, useEffect, useState } from "react";
import { getItems, getApiError } from "../api";
import type { Item } from "../types";
import { APP_TITLE } from "../config";
import ItemCard from "../components/ItemCard";
import Pagination from "../components/Pagination";
import Status from "../components/Status";

export default function ListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(() => {
    setLoading(true);
    setError("");
    getItems(page)
      .then((data) => {
        setItems(data.items);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        setItems([]);
        setError(getApiError(err).message);
      })
      .finally(() => setLoading(false));
  }, [page]);

  useEffect(load, [load]);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-bold">{APP_TITLE}</h1>
      <Status loading={loading} error={error} empty={items.length === 0} onRetry={load} />
      {!loading && !error && (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
      <Pagination page={page} totalPages={totalPages} disabled={loading || items.length === 0} onChange={setPage} />
    </section>
  );
}
