// // src/components/Transactions/TransactionList.tsx
// import { useCallback, useEffect, useState } from "react";
// import { getTransactions, deleteTransaction } from "@/api/transaction";
// import { getCategories } from "@/api/category";
// import { Transaction } from "@/types/Transaction";
// import TransactionForm from "./TransactionForm";

// const TransactionList = () => {
//   const [transactions, setTransactions] = useState<Transaction[]>([]);
//   const [categories, setCategories] = useState<Record<number, string>>({});
//   const [editing, setEditing] = useState<Transaction | null>(null);
//   const [monthFilter, setMonthFilter] = useState<string>("");

//   // ⚡ Stable function: depends on monthFilter
//   const loadTransactions = useCallback(async () => {
//     const data = await getTransactions(monthFilter);
//     setTransactions(data);
//   }, [monthFilter]);

//   // ⚡ Stable function: no dependencies
//   const loadCategories = useCallback(async () => {
//     const cats = await getCategories();
//     const map: Record<number, string> = {};
//     cats.forEach((c) => {
//       map[c.id] = c.name;
//     });
//     setCategories(map);
//   }, []);

//   const handleDelete = async (id: number) => {
//     await deleteTransaction(id);
//     loadTransactions();
//   };

//   useEffect(() => {
//     loadTransactions();
//     loadCategories();
//   }, [loadTransactions, loadCategories]); // ✅ no ESLint warning

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Transactions</h2>

//       <div className="mb-4">
//         <label className="mr-2 font-medium">Filter by Month:</label>
//         <input
//           type="month"
//           value={monthFilter}
//           onChange={(e) => setMonthFilter(e.target.value)}
//           className="border p-2 rounded"
//         />
//       </div>

//       <TransactionForm
//         onSuccess={loadTransactions}
//         initialData={editing || undefined}
//       />

//       <ul className="space-y-2">
//         {transactions.map((tx) => (
//           <li
//             key={tx.id}
//             className="border rounded p-2 flex justify-between items-center"
//           >
//             <div>
//               <div className="font-medium">{tx.description}</div>
//               <div className="text-sm text-gray-600">
//                 ₹{tx.amount.toFixed(2)} •{" "}
//                 {new Date(tx.date).toLocaleDateString()} •{" "}
//                 {categories[tx.categoryId]}
//               </div>
//             </div>
//             <div className="space-x-2">
//               <button onClick={() => setEditing(tx)} className="text-blue-500">
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(tx.id)}
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

// export default TransactionList;

import { useEffect, useState } from "react";
import Layout from "../Dashboard/Layout";
import TransactionForm from "./TransactionForm";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../api/transaction";
import { Transaction } from "../../types/Transaction";

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [editing, setEditing] = useState<Transaction | null>(null);

  const load = async () => {
    const data = await getTransactions(month);
    setTransactions(data);
  };

  useEffect(() => {
    load();
  }, [month]);

  const handleCreate = async (tx: Omit<Transaction, "id">) => {
    await createTransaction(tx);
    load();
  };

  const handleUpdate = async (tx: Omit<Transaction, "id">) => {
    if (editing) {
      await updateTransaction(editing.id, tx);
      setEditing(null);
      load();
    }
  };

  const handleDelete = async (id: number) => {
    await deleteTransaction(id);
    load();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <label className="block mb-4">
        <span className="text-sm text-gray-600">Filter by Month:</span>
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="ml-2 p-2 border rounded"
        />
      </label>

      <TransactionForm
        onSubmit={editing ? handleUpdate : handleCreate}
        initial={editing || undefined}
        onCancel={() => setEditing(null)}
      />

      <ul className="space-y-2">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <div>
              <div className="font-semibold">{tx.description}</div>
              <div className="text-sm text-gray-600">
                ₹{tx.amount} • {tx.categoryName || "Unknown"} • {tx.date}
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => setEditing(tx)}
                className="px-3 py-1 text-sm bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tx.id)}
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
