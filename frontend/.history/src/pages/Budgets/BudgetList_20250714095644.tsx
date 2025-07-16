// // src/components/Budgets/BudgetList.tsx
// import { useEffect, useState } from "react";
// import { getBudgets, deleteBudget } from "@/api/budget";
// import { getCategories } from "@/api/category";
// import { Budget } from "@/types/Budget";
// import BudgetForm from "./BudgetForm";

// const BudgetList = () => {
//   const [budgets, setBudgets] = useState<Budget[]>([]);
//   const [categories, setCategories] = useState<Record<number, string>>({});
//   const [editing, setEditing] = useState<Budget | null>(null);

//   const loadBudgets = async () => {
//     const data = await getBudgets();
//     setBudgets(data);
//   };

//   const loadCategories = async () => {
//     const cats = await getCategories();
//     const map: Record<number, string> = {};
//     cats.forEach((c) => (map[c.id] = c.name));
//     setCategories(map);
//   };

//   const handleDelete = async (id: number) => {
//     await deleteBudget(id);
//     loadBudgets();
//   };

//   useEffect(() => {
//     loadBudgets();
//     loadCategories();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Budgets</h2>

//       <BudgetForm
//         onSuccess={loadBudgets}
//         initialData={editing || undefined}
//       />

//       <ul className="space-y-2">
//         {budgets.map((b) => (
//           <li key={b.id} className="border rounded p-2 flex justify-between items-center">
//             <div>
//               <div className="font-medium">
//                 {categories[b.categoryId]} • {b.month}
//               </div>
//               <div className="text-sm text-gray-600">
//                 ₹{b.limitAmount.toFixed(2)}
//               </div>
//             </div>
//             <div className="space-x-2">
//               <button
//                 onClick={() => setEditing(b)}
//                 className="text-blue-500"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(b.id)}
//                 className="text-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BudgetList;

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
