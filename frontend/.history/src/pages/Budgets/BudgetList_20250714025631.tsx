// src/components/Budgets/BudgetList.tsx
import { useEffect, useState } from "react";
import { getBudgets, deleteBudget } from "@/api/budget";
import { getCategories } from "@/api/category";
import { Budget } from "@/types/Budget";
import { Category } from "@/types/Category";
import BudgetForm from "./BudgetForm";

const BudgetList = () => {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [categories, setCategories] = useState<Record<number, string>>({});
  const [editing, setEditing] = useState<Budget | null>(null);

  const loadBudgets = async () => {
    const data = await getBudgets();
    setBudgets(data);
  };

  const loadCategories = async () => {
    const cats = await getCategories();
    const map: Record<number, string> = {};
    cats.forEach((c) => (map[c.id] = c.name));
    setCategories(map);
  };

  const handleDelete = async (id: number) => {
    await deleteBudget(id);
    loadBudgets();
  };

  useEffect(() => {
    loadBudgets();
    loadCategories();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Budgets</h2>

      <BudgetForm
        onSuccess={loadBudgets}
        initialData={editing || undefined}
      />

      <ul className="space-y-2">
        {budgets.map((b) => (
          <li key={b.id} className="border rounded p-2 flex justify-between items-center">
            <div>
              <div className="font-medium">
                {categories[b.categoryId]} • {b.month}
              </div>
              <div className="text-sm text-gray-600">
                ₹{b.limitAmount.toFixed(2)}
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditing(b)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;
