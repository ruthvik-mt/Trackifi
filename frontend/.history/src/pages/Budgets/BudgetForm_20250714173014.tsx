import { useEffect, useState } from "react";
import { Budget } from "../../types/Budget";
import { Category } from "../../types/Category";
import { getCategories } from "../../api/category";
import FormInput from "../../components/FormInput";

interface Props {
  onSubmit: (budget: Omit<Budget, "id" | "categoryName">) => void;
  initial?: Budget;
  onCancel?: () => void;
}

export default function BudgetForm({ onSubmit, initial, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Budget, "id" | "categoryName">>({
    categoryId: 0,
    limitAmount: 0,
    month: new Date().toISOString().slice(0, 7),
  });

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
    if (initial) {
      setForm({
        categoryId: initial.categoryId,
        limitAmount: initial.limitAmount,
        month: initial.month,
      });
    }
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "limitAmount" || name === "categoryId" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);

    if (!initial) {
      setForm({
        categoryId: 0,
        limitAmount: 0,
        month: new Date().toISOString().slice(0, 7),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-lg bg-card text-card-foreground border shadow">
      {/* Category Selection */}
      <div className="space-y-2">
        <label htmlFor="categoryId" className="text-sm font-medium">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={form.categoryId || ""}
          onChange={handleChange}
          required
          className="w-full p-2 bg-background text-foreground border border-border rounded"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Month */}
      <div className="space-y-2">
        <label htmlFor="month" className="text-sm font-medium">
          Month
        </label>
        <input
          type="month"
          name="month"
          id="month"
          value={form.month}
          onChange={handleChange}
          required
          className="w-full p-2 bg-background text-foreground border border-border rounded"
        />
      </div>

      {/* Limit Amount */}
      <div className="space-y-2">
        <label htmlFor="limitAmount" className="text-sm font-medium">
          Limit Amount
        </label>
        <input
          type="number"
          name="limitAmount"
          id="limitAmount"
          value={form.limitAmount}
          onChange={handleChange}
          required
          className="w-full p-2 bg-background text-foreground border border-border rounded"
          placeholder="Enter limit amount"
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
            className="border px-4 py-2 rounded hover:bg-muted transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
