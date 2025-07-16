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
      setForm(rest);
    }
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "limitAmount" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    if (!initial) {
      setForm({ categoryId: 0, limitAmount: 0, month: new Date().toISOString().slice(0, 7) });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-6">
      <div className="mb-4">
        <label className="block font-medium mb-1">Category</label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
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

      <FormInput
        type="month"
        name="month"
        label="Month"
        value={form.month}
        onChange={handleChange}
        required
      />

      <FormInput
        type="number"
        name="limitAmount"
        label="Limit Amount"
        value={form.limitAmount}
        onChange={handleChange}
        required
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {initial ? "Update" : "Add"} Budget
        </button>
        {initial && onCancel && (
          <button onClick={onCancel} type="button" className="border px-4 py-2 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
