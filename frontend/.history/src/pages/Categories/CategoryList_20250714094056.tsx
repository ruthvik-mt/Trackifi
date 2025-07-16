// // src/components/Categories/CategoryList.tsx
// import { useEffect, useState } from "react";
// import { deleteCategory, getCategories } from "@/api/category";
// import { Category } from "@/types/Category";
// import CategoryForm from "./CategoryForm";

// const CategoryList = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [editing, setEditing] = useState<Category | null>(null);

//   const loadCategories = async () => {
//     const data = await getCategories();
//     setCategories(data);
//   };

//   const handleDelete = async (id: number) => {
//     await deleteCategory(id);
//     loadCategories();
//   };

//   useEffect(() => {
//     loadCategories();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-2">Categories</h2>
//       <CategoryForm
//         onSuccess={loadCategories}
//         initialData={editing || undefined}
//       />
//       <ul className="space-y-2">
//         {categories.map((cat) => (
//           <li key={cat.id} className="flex justify-between items-center">
//             <span>{cat.name}</span>
//             <div className="space-x-2">
//               <button
//                 onClick={() => setEditing(cat)}
//                 className="text-blue-500"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(cat.id)}
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

// export default CategoryList;

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
    await deleteCategory(id);
    loadCategories();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>

      <CategoryForm
        onSubmit={editingId ? handleUpdate : handleCreate}
        initialName={editingName}
        editing={!!editingId}
        onCancel={() => {
          setEditingId(null);
          setEditingName("");
        }}
      />

      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="bg-white shadow p-4 rounded flex justify-between items-center">
            <span>{cat.name}</span>
            <div className="space-x-2">
              <button onClick={() => handleEdit(cat)} className="px-3 py-1 text-sm bg-yellow-500 text-white rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(cat.id)} className="px-3 py-1 text-sm bg-red-600 text-white rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
