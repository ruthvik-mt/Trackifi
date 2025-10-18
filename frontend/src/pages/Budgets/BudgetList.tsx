import { useCallback, useEffect, useState } from "react";
import Layout from "../Dashboard/Layout";
import {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../../api/budget";
import { Budget } from "../../types/Budget";
import BudgetForm from "./BudgetForm";
import { MonthPicker } from "@/components/MonthPicker";

function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export default function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editing, setEditing] = useState<Budget | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAll, setShowAll] = useState(false);

  const selectedMonth = formatMonth(selectedDate); 

  const load = useCallback(async () => {
    const data = await getAllBudgets();

    const filtered = showAll
      ? data
      : data.filter((b: Budget) => b.month === selectedMonth);

    setBudgets(filtered);
  }, [selectedMonth, showAll]);

  useEffect(() => {
    load();
  }, [load]);

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
      <div className="max-w-3xl mx-auto px-4 sm:px-0 space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl font-bold text-foreground">Budgets</h1>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium flex items-center gap-1">
              📅 Filter by Month:
            </label>
            <MonthPicker
              selected={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
            />
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className={`px-3 py-1 text-sm font-medium rounded transition 
                ${showAll
                  ? "bg-black hover:bg-black text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"}`}
            >
              {showAll ? "Show Monthly" : "Show All"}
            </button>
          </div>
        </div>

        <BudgetForm
          onSubmit={editing ? handleUpdate : handleCreate}
          initial={editing || undefined}
          onCancel={() => setEditing(null)}
        />

        {budgets.length === 0 ? (
          <p className="text-muted-foreground text-sm mt-4">
            No budgets found {showAll ? "" : "for this month"}.
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

