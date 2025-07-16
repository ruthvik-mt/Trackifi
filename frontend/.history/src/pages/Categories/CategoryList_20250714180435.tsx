import { useEffect, useState } from "react";
import Layout from "../Dashboard/Layout";
import CategoryForm from "./CategoryForm";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../api/category";
import { Category } from "../../types/Category";

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreate = async (name: string) => {
    await createCategory(name);
    loadCategories();
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const handleUpdate = async (name: string) => {
    if (editingId !== null) {
      await updateCategory(editingId, name);
      setEditingId(null);
      setEditingName("");
      loadCategories();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
      loadCategories();
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Categories</h1>

      <CategoryForm
        onSubmit={editingId ? handleUpdate : handleCreate}
        initialName={editingName}
        editing={!!editingId}
        onCancel={() => {
          setEditingId(null);
          setEditingName("");
        }}
      />

      {categories.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">No categories found. Add one above.</p>
      ) : (
        <ul className="space-y-2 mt-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="bg-white dark:bg-muted text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 p-4 rounded flex justify-between items-center"
            >
              <span className="text-base font-medium">{cat.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
}
