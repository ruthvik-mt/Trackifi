// src/components/Categories/CategoryForm.tsx
import { useState } from "react";
import { createCategory, updateCategory } from "@/api/category";
import { Category } from "@/types/Category";

interface Props {
  onSuccess: () => void;
  initialData?: Category;
}

const CategoryForm = ({ onSuccess, initialData }: Props) => {
  const [name, setName] = useState(initialData?.name || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      await updateCategory(initialData.id, { name });
    } else {
      await createCategory({ name });
    }
    setName("");
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-x-2 mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        className="border p-2 rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
        {initialData ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default CategoryForm;
