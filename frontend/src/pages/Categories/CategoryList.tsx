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
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit2, Trash2, Folder } from "lucide-react";

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
      <div className="max-w-4xl mx-auto space-y-10 pb-10">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">Categories</h1>
          <p className="text-muted-foreground font-medium">Organize your expenses with custom labels.</p>
        </div>

        <div className="glass-card p-6 sm:p-8 rounded-[2rem] border-none bg-card/40">
          <CategoryForm
            onSubmit={editingId ? handleUpdate : handleCreate}
            initialName={editingName}
            editing={!!editingId}
            onCancel={() => {
              setEditingId(null);
              setEditingName("");
            }}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold px-2 flex items-center gap-2">
             <Folder size={20} className="text-primary" />
             Managed Categories
          </h2>
          {categories.length === 0 ? (
            <div className="glass-card p-12 rounded-[2rem] text-center border-none bg-card/40">
              <p className="text-muted-foreground font-medium">No categories found. Start by adding one above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <AnimatePresence mode="popLayout">
                {categories.map((cat, i) => (
                  <motion.div
                    layout
                    key={cat.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-card p-5 rounded-2xl flex justify-between items-center group hover:bg-muted/50 transition-colors border-none bg-card/40 shadow-sm"
                  >
                    <span className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">{cat.name}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(cat.id)}
                        className="p-2.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all active:scale-90"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
