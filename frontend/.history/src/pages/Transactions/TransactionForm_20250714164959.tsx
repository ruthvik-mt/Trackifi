import { useEffect, useState } from "react";
import { Transaction } from "../../types/Transaction";
import { getCategories } from "../../api/category";
import { Category } from "../../types/Category";
import { MonthPicker } from "../MonthPicker";

interface Props {
  onSubmit: (tx: Omit<Transaction, "id">) => void;
  initial?: Transaction;
  onCancel?: () => void;
}

type FormState = Omit<Transaction, "id" | "date"> & {
  date: Date;
};

export default function TransactionForm({ onSubmit, initial, onCancel }: Props) {
  const [form, setForm] = useState<FormState>({
    categoryId: 0,
    amount: 0,
    description: "",
    date: new Date(),
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
    if (initial) {
      setForm({
        categoryId: initial.categoryId,
        amount: initial.amount,
        description: initial.description,
        date: new Date(initial.date), // convert string to Date
      });
    }
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "amount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formatted: Omit<Transaction, "id"> = {
      ...form,
      date: form.date.toISOString().slice(0, 10), // convert Date to string
    };

    onSubmit(formatted);

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
        className="w-full p-2 bg-input text-foreground border border-border rounded"
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
        className="w-full p-2 bg-input text-foreground border border-border rounded"
        placeholder="Amount"
        required
      />

      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 bg-input text-foreground border border-border rounded"
        placeholder="Description"
        required
      />

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-muted-foreground">
          📅 Transaction Date:
        </label>
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {initial ? "Update" : "Add"} Transaction
        </button>

        {initial && onCancel && (
          <button
            onClick={onCancel}
            type="button"
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
