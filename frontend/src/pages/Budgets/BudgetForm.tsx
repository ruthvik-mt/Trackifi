import { useEffect, useState } from "react";
import { getCategories } from "../../api/category";
import { Category } from "../../types/Category";
import { Budget } from "../../types/Budget";
import { MonthPicker } from "@/components/MonthPicker";

interface Props {
  onSubmit: (data: Omit<Budget, "id" | "categoryName">) => void;
  initial?: Budget;
  onCancel?: () => void;
}

type FormState = {
  categoryId: string; 
  limitAmount: number;
  month: Date;
};

export default function BudgetForm({ onSubmit, initial, onCancel }: Props) {
  const [form, setForm] = useState<FormState>({
    categoryId: "",
    limitAmount: 0,
    month: new Date(),
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
    if (initial) {
      setForm({
        categoryId: String(initial.categoryId),
        limitAmount: initial.limitAmount,
        month: new Date(initial.month),
      });
    }
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "limitAmount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formatted: Omit<Budget, "id" | "categoryName"> = {
      categoryId: parseInt(form.categoryId, 10), 
      limitAmount: form.limitAmount,
      month: `${form.month.getFullYear()}-${String(
        form.month.getMonth() + 1
      ).padStart(2, "0")}`,
    };

    onSubmit(formatted);

    if (!initial) {
      setForm({
        categoryId: "",
        limitAmount: 0,
        month: new Date(),
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 rounded-lg bg-card text-card-foreground border shadow"
    >
      {/* Category */}
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
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Limit Amount */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Limit Amount</label>
        <input
          type="number"
          name="limitAmount"
          value={form.limitAmount}
          onChange={handleChange}
          className="w-full p-2 bg-background text-foreground border border-border rounded"
          placeholder="Amount"
          required
        />
      </div>

      {/* Month Picker */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">🗓️ Budget Month</label>
        <MonthPicker
          selected={form.month}
          onChange={(month) => setForm((f) => ({ ...f, month }))}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {initial ? "Update" : "Add"} Budget
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
