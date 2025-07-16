import { useEffect, useState } from "react";
import { Budget } from "../../types/Budget";
import { Category } from "../../types/Category";
import { getCategories } from "../../api/category";
import FormInput from "../../components/FormInput";
import { MonthPicker } from "@/components/MonthPicker";

interface Props {
  onSubmit: (budget: Omit<Budget, "id" | "categoryName">) => void;
  initial?: Budget;
  onCancel?: () => void;
}

export default function BudgetForm({ onSubmit, initial, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Budget, "id" | "categoryName">>({
    categoryId: 0,
    limitAmount: 0,
    month: new Date().toISOString().slice(0, 7), // "YYYY-MM"
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "limitAmount" || name === "categoryId"
          ? Number(value)
          : value,
    }));
  };

  const handleMonthChange = (date: Date) => {
    const formatted = date.toISOString().slice(0, 7); // YYYY-MM
    setForm((prev) => ({ ...prev, month: formatted }));
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
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 text-foreground">
      {/* Category Selection */}
      <div>
        <label htmlFor="categoryId" className="block font-medium mb-1">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          value={form.categoryId || ""}
          onChange={handleChange}
          required
          className="w-full p-2 border border-input rounded bg-background text-foreground"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Month Picker */}
      <div>
        <label className="block font-medium mb-1">📅 Month</label>
        <div className="rounded bg-background text-foreground">
          <MonthPicker
            selected={new Date(form.month)}
            onChange={(date) => date && handleMonthChange(date)}
          />
        </div>
      </div>

      {/* Limit Amount */}
      <FormInput
        type="number"
        name="limitAmount"
        label="Limit Amount"
        value={form.limitAmount}
        onChange={handleChange}
        required
      />

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {initial ? "Update" : "Add"} Budget
        </button>

        {initial && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-border px-4 py-2 rounded hover:bg-muted transition"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
