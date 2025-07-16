import { useEffect, useState } from "react";
import { Transaction } from "../../types/Transaction";
import { getCategories } from "../../api/category";
import { Category } from "../../types/Category";
import { DatePicker } from "@/components/DatePicker"; // ✅ correct picker

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
      date: form.date.toISOString().slice(0, 10), // format date
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
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded-lg bg-card text-card-foreground border shadow"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium">Category</label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full p-2 bg-background text-foreground border border-border rounded"
          required
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full p-2 bg-background text-foreground border border-border rounded"
          placeholder="Amount"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Description</label>
        <input
          type="text"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 bg-background text-foreground border border-border rounded"
          placeholder="Description"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">📅 Transaction Date</label>
        <DatePicker
          selected={form.date}
          onChange={(date) => date && setForm((f) => ({ ...f, date }))}
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
            type="button"
            onClick={onCancel}
            className="border px-4 py-2 rounded hover:bg-muted"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
