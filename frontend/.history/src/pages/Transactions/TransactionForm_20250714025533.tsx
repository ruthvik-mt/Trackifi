// src/components/Transactions/TransactionForm.tsx
import { useEffect, useState } from "react";
import { createTransaction, updateTransaction } from "@/api/transaction";
import { getCategories } from "@/api/category";
import { Category } from "@/types/Category";
import { Transaction } from "@/types/Transaction";

interface Props {
  onSuccess: () => void;
  initialData?: Transaction;
}

const TransactionForm = ({ onSuccess, initialData }: Props) => {
  const [amount, setAmount] = useState(initialData?.amount || 0);
  const [description, setDescription] = useState(initialData?.description || "");
  const [date, setDate] = useState(initialData?.date || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || 0);
  const [categories, setCategories] = useState<Category[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { amount, description, date, categoryId };

    if (initialData) {
      await updateTransaction(initialData.id, data);
    } else {
      await createTransaction(data);
    }

    onSuccess();
    resetForm();
  };

  const resetForm = () => {
    setAmount(0);
    setDescription("");
    setDate("");
    setCategoryId(0);
  };

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
        placeholder="Amount"
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full"
        required
      />
      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="border p-2 rounded w-full"
        required
      >
        <option value="" disabled>
          Select category
        </option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <button type="submit" className="bg-green-500 text-white px-3 py-2 rounded">
        {initialData ? "Update" : "Add"} Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
