import { useEffect, useState } from "react";
import { Transaction } from "../../types/Transaction";
import { getCategories } from "../../api/category";
import { Category } from "../../types/Category";
import { MonthPicker } from "@/components/MonthPicker";

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
    date: new Date(), // using Date object for MonthPicker
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
    if (initial) {
      setForm({
        ...initial,
        date: new Date(initial.date), // convert to Date object if passed as string
      });
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
    const formattedDate = form.date.toISOString().slice(0, 10); // YYYY-MM-DD
    onSubmit({ ...form, date: formattedDate });
    if (!initial) {
      setForm({
        categoryId: 0,
        amount: 0,
        description: "",
        date: new Date(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <select
        name="categoryId"
        value={form.categoryId}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-input text-foreground border-border"
        required
      >
        <option value="">Select category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-input text-foreground border-border"
        placeholder="Amount"
        required
      />

      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-input text-foreground border-border"
        placeholder="Description"
        required
      />

      {/* ✅ Custom MonthPicker for themed dark/light mode */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-foreground">Date</label>
        <MonthPicker
          selected={form.date}
          onChange={(date) => {
            if (date) {
              setForm((f) => ({ ...f, date }));
            }
          }}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {initial ? "Update" : "Add"} Transaction
        </button>
        {initial && onCancel && (
          <button
            onClick={onCancel}
            type="button"
            className="border px-4 py-2 rounded bg-background text-foreground border-border hover:bg-muted"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
