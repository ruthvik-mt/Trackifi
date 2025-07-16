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
      <div className="max-w-3xl mx-auto px-4 sm:px-0">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Budgets</h1>

        <BudgetForm
          onSubmit={editing ? handleUpdate : handleCreate}
          initial={editing || undefined}
          onCancel={() => setEditing(null)}
        />

        {budgets.length === 0 ? (
          <p className="text-muted-foreground text-sm mt-4">
            No budgets found. Add one above.
          </p>
        ) : (
          <ul className="space-y-3 mt-6">
            {budgets.map((b) => (
              <li
                key={b.id}
                className="bg-card text-card-foreground border border-border shadow-sm p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="font-semibold">
                    {b.categoryName || "Unknown"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ₹{b.limitAmount} • {b.month}
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditing(b)}
                    className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
}
