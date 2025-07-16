// src/components/Budgets/BudgetForm.tsx
import { useEffect, useState } from "react";
import { getCategories } from "@/api/category";
import { createBudget, updateBudget } from "@/api/budget";
import { Budget } from "@/types/Budget";
import { Category } from "@/types/Category";

interface Props {
  onSuccess: () => void;
  initialData?: Budget;
}

const BudgetForm = ({ onSuccess, initialData }: Props) => {
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || 0);
  const [limitAmount, setLimitAmount] = useState(initialData?.limitAmount || 0);
  const [month, setMonth] = useState(initialData?.month || "");
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { categoryId, limitAmount, month };

    if (initialData) {
      await updateBudget(initialData.id, data);
    } else {
      await createBudget(data);
    }

    onSuccess();
    resetForm();
  };

  const resetForm = () => {
    setCategoryId(0);
    setLimitAmount(0);
    setMonth("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />

      <input
        type="number"
        value={limitAmount}
        onChange={(e) => setLimitAmount(parseFloat(e.target.value))}
        placeholder="Budget Limit"
        className="border p-2 rounded w-full"
        required
      />

      <button type="submit" className="bg-indigo-500 text-white px-3 py-2 rounded">
        {initialData ? "Update" : "Add"} Budget
      </button>
    </form>
  );
};

export default BudgetForm;
