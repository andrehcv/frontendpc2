import type { ReactNode } from "react";

interface Props {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

export default function Field({ label, htmlFor, error, children }: Props) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="mb-1 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
