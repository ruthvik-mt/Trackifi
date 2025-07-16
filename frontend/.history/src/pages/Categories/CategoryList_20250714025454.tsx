// src/components/Categories/CategoryList.tsx
import { useEffect, useState } from "react";
import { deleteCategory, getCategories } from "@/api/category";
import { Category } from "@/types/Category";
import CategoryForm from "./CategoryForm";

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  const handleDelete = async (id: number) => {
    await deleteCategory(id);
    loadCategories();
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Categories</h2>
      <CategoryForm
        onSuccess={loadCategories}
        initialData={editing || undefined}
      />
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center">
            <span>{cat.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => setEditing(cat)}
                className="text-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(cat.id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
