

import { useEffect, useState } from "react";
import Layout from "../Dashboard/Layout";
import {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../../api/budget";
import { Budget } from "../../types/Budget";
import BudgetForm from "./BudgetForm";

export default function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editing, setEditing] = useState<Budget | null>(null);

  const load = async () => {
    const data = await getAllBudgets();
    setBudgets(data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (budget: Omit<Budget, "id" | "categoryName">) => {
    await createBudget(budget);
    load();
  };

  const handleUpdate = async (budget: Omit<Budget, "id" | "categoryName">) => {
    if (editing) {
      await updateBudget(editing.id, budget);
      setEditing(null);
      load();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteBudget(id);
    load();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Budgets</h1>

      <BudgetForm
        onSubmit={editing ? handleUpdate : handleCreate}
        initial={editing || undefined}
        onCancel={() => setEditing(null)}
      />

      <ul className="space-y-2">
        {budgets.map((b) => (
          <li
            key={b.id}
            className="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{b.categoryName || "Unknown"}</div>
              <div className="text-sm text-gray-600">
                ₹{b.limitAmount} • {b.month}
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditing(b)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(b.id)}
                className="px-3 py-1 text-sm bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
