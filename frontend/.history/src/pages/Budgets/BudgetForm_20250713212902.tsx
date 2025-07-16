import { useEffect, useState } from "react";
import { Budget } from "../../types/Budget";
import { Category } from "../../types/Category";
import { getCategories } from "../../api/category";

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
      const { id, categoryName, ...rest } = initial;
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

      <input
        type="month"
