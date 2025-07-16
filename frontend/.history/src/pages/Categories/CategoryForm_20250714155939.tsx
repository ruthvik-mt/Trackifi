import { useState, useEffect } from "react";

interface Props {
  onSubmit: (name: string) => void;
  initialName?: string;
  editing?: boolean;
  onCancel?: () => void;
}

export default function CategoryForm({
  onSubmit,
  initialName = "",
  editing = false,
  onCancel,
}: Props) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      if (!editing) setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <input
        type="text"
        className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-muted text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 p-2 rounded"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          {editing ? "Update" : "Add"}
        </button>

        {editing && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded text-gray-800 dark:text-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
