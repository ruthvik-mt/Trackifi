import { useEffect, useState } from "react";
import { Transaction } from "../../types/Transaction";
import { getCategories } from "../../api/category";
import { Category } from "../../types/Category";

interface Props {
  onSubmit: (tx: Omit<Transaction, "id">) => void;
  initial?: Transaction;
  onCancel?: () => void;
}

export default function TransactionForm({ onSubmit, initial, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Transaction, "id">>({
    categoryId: 0,
    amount: 0,
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
    if (initial) {
      setForm(initial);
    }
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    if (!initial) {
      setForm({
        categoryId: 0,
        amount: 0,
        description: "",
        date: new Date().toISOString().slice(0, 10),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {/* Category */}
      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        required
        className="w-full rounded px-3 py-2 border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ring-ring"
      >
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Amount */}
      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        required
        placeholder="Amount"
        className="w-full rounded px-3 py-2 border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ring-ring"
      />

      {/* Description */}
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        required
        placeholder="Description"
        className="w-full rounded px-3 py-2 border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ring-ring"
      />

      {/* Date */}
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        required
        className="w-full rounded px-3 py-2 border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 ring-ring"
      />

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {initial ? "Update" : "Add"} Transaction
        </button>
        {initial && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded border border-border text-foreground hover:bg-muted transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
