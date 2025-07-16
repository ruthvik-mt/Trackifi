// // src/components/Budgets/BudgetForm.tsx
// import { useEffect, useState } from "react";
// import { getCategories } from "@/api/category";
// import { createBudget, updateBudget } from "@/api/budget";
// import { Budget } from "@/types/Budget";
// import { Category } from "@/types/Category";

// interface Props {
//   onSuccess: () => void;
//   initialData?: Budget;
// }

// const BudgetForm = ({ onSuccess, initialData }: Props) => {
//   const [categoryId, setCategoryId] = useState(initialData?.categoryId || 0);
//   const [limitAmount, setLimitAmount] = useState(initialData?.limitAmount || 0);
//   const [month, setMonth] = useState(initialData?.month || "");
//   const [categories, setCategories] = useState<Category[]>([]);

//   useEffect(() => {
//     getCategories().then(setCategories);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const data = { categoryId, limitAmount, month };

//     if (initialData) {
//       await updateBudget(initialData.id, data);
//     } else {
//       await createBudget(data);
//     }

//     onSuccess();
//     resetForm();
//   };

//   const resetForm = () => {
//     setCategoryId(0);
//     setLimitAmount(0);
//     setMonth("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-2 mb-4">
//       <select
//         value={categoryId}
//         onChange={(e) => setCategoryId(Number(e.target.value))}
//         className="border p-2 rounded w-full"
//         required
//       >
//         <option value="">Select category</option>
//         {categories.map((cat) => (
//           <option key={cat.id} value={cat.id}>
//             {cat.name}
//           </option>
//         ))}
//       </select>

//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//         className="border p-2 rounded w-full"
//         required
//       />

//       <input
//         type="number"
//         value={limitAmount}
//         onChange={(e) => setLimitAmount(parseFloat(e.target.value))}
//         placeholder="Budget Limit"
//         className="border p-2 rounded w-full"
//         required
//       />

//       <button type="submit" className="bg-indigo-500 text-white px-3 py-2 rounded">
//         {initialData ? "Update" : "Add"} Budget
//       </button>
//     </form>
//   );
// };

// export default BudgetForm;


import { useEffect, useState } from "react";
import { Budget } from "../../types/Budget";
import { Category } from "../../types/Category";
import { getCategories } from "../../api/category";
import FormInput from "../../components/FormInput";

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
    setForm(initial); // No destructuring needed
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
      <div className="mb-4">
        <label className="block font-medium mb-1">Category</label>
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
      </div>

      <FormInput
        type="month"
        name="month"
        label="Month"
        value={form.month}
        onChange={handleChange}
        required
      />

      <FormInput
        type="number"
        name="limitAmount"
        label="Limit Amount"
        value={form.limitAmount}
        onChange={handleChange}
        required
      />

      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {initial ? "Update" : "Add"} Budget
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
