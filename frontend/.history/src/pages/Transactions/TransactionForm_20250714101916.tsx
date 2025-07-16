// // src/components/Transactions/TransactionForm.tsx
// import { useEffect, useState } from "react";
// import { createTransaction, updateTransaction } from "@/api/transaction";
// import { getCategories } from "@/api/category";
// import { Category } from "@/types/Category";
// import { Transaction } from "@/types/Transaction";

// interface Props {
//   onSuccess: () => void;
//   initialData?: Transaction;
// }

// const TransactionForm = ({ onSuccess, initialData }: Props) => {
//   const [amount, setAmount] = useState(initialData?.amount || 0);
//   const [description, setDescription] = useState(initialData?.description || "");
//   const [date, setDate] = useState(initialData?.date || "");
//   const [categoryId, setCategoryId] = useState(initialData?.categoryId || 0);
//   const [categories, setCategories] = useState<Category[]>([]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const data = { amount, description, date, categoryId };

//     if (initialData) {
//       await updateTransaction(initialData.id, data);
//     } else {
//       await createTransaction(data);
//     }

//     onSuccess();
//     resetForm();
//   };

//   const resetForm = () => {
//     setAmount(0);
//     setDescription("");
//     setDate("");
//     setCategoryId(0);
//   };

//   useEffect(() => {
//     getCategories().then(setCategories);
//   }, []);

//   return (
//     <form onSubmit={handleSubmit} className="space-y-2 mb-4">
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(parseFloat(e.target.value))}
//         placeholder="Amount"
//         className="border p-2 rounded w-full"
//         required
//       />
//       <input
//         type="text"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         placeholder="Description"
//         className="border p-2 rounded w-full"
//         required
//       />
//       <input
//         type="date"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//         className="border p-2 rounded w-full"
//         required
//       />
//       <select
//         value={categoryId}
//         onChange={(e) => setCategoryId(Number(e.target.value))}
//         className="border p-2 rounded w-full"
//         required
//       >
//         <option value="" disabled>
//           Select category
//         </option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>
//       <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded">
//         {initialData ? "Update" : "Add"} Transaction
//       </button>
//     </form>
//   );
// };

// export default TransactionForm;

import { useEffect, useState } from "react";
import { Transaction } from "../../types/Transaction";
import { getCategories } from "../../api/category";
import { Category } from "../../types/Category";

interface Props {
  onSubmit: (tx: Omit<Transaction, "id">) => void;
  initial?: Transaction;
  onCancel?: () => void;
}

export default function TransactionForm({ onSubmit, initial, onCancel }: Props) {
  const [form, setForm] = useState<Omit<Transaction, "id">>({
    categoryId: 0,
    amount: 0,
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getCategories().then(setCategories);
    if (initial) {
      setForm(initial);
    }
  }, [initial]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "amount" ? parseFloat(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
    if (!initial) {
      setForm({ categoryId: 0, amount: 0, description: "", date: new Date().toISOString().slice(0, 10) });
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
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Amount"
        required
      />
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        placeholder="Description"
        required
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {initial ? "Update" : "Add"} Transaction
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
