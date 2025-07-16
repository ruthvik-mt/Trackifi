// // src/components/Categories/CategoryForm.tsx
// import { useState } from "react";
// import { createCategory, updateCategory } from "@/api/category";
// import { Category } from "@/types/Category";

// interface Props {
//   onSuccess: () => void;
//   initialData?: Category;
// }

// const CategoryForm = ({ onSuccess, initialData }: Props) => {
//   const [name, setName] = useState(initialData?.name || "");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (initialData) {
//       await updateCategory(initialData.id, { name });
//     } else {
//       await createCategory({ name });
//     }
//     setName("");
//     onSuccess();
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-x-2 mb-4">
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Category name"
//         className="border p-2 rounded"
//         required
//       />
//       <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
//         {initialData ? "Update" : "Add"}
//       </button>
//     </form>
//   );
// };

// export default CategoryForm;

import { useState, useEffect } from "react";

interface Props {
  onSubmit: (name: string) => void;
  initialName?: string;
  editing?: boolean;
  onCancel?: () => void;
}

export default function CategoryForm({ onSubmit, initialName = "", editing = false, onCancel }: Props) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-6">
      <input
        type="text"
        className="border p-2 rounded w-full"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {editing ? "Update" : "Add"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
