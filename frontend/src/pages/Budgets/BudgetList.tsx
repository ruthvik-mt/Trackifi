import { useCallback, useEffect, useState } from "react";
import Layout from "../Dashboard/Layout";
import {
  getAllBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
} from "../../api/budget";
import { Budget } from "../../types/Budget";
import BudgetForm from "./BudgetForm";
import { MonthPicker } from "@/components/MonthPicker";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Edit2, Trash2, Wallet, Layers } from "lucide-react";

function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export default function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [editing, setEditing] = useState<Budget | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAll, setShowAll] = useState(false);

  const selectedMonth = formatMonth(selectedDate); 

  const load = useCallback(async () => {
    const data = await getAllBudgets();

    const filtered = showAll
      ? data
      : data.filter((b: Budget) => b.month === selectedMonth);

    setBudgets(filtered);
  }, [selectedMonth, showAll]);

  useEffect(() => {
    load();
  }, [load]);

  const handleCreate = async (budget: Omit<Budget, "id" | "categoryName">) => {
    await createBudget(budget);
    load();
  };

  const handleUpdate = async (budget: Omit<Budget, "id" | "categoryName">) => {
    if (editing) {
      await updateBudget(editing.id, budget);
      setEditing(null);
      load();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Delete this budget plan?")) {
      await deleteBudget(id);
      load();
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-10 pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">Budgets</h1>
            <p className="text-muted-foreground font-medium">Plan your spending and save more every month.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-card/40 p-2 rounded-2xl ring-1 ring-border/50">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-xl">
              <Calendar size={16} className="text-primary" />
              <MonthPicker
                selected={selectedDate}
                onChange={(date) => date && setSelectedDate(date)}
              />
            </div>
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className={`px-4 py-2.5 text-xs font-black uppercase tracking-widest rounded-xl transition-all active:scale-95 
                ${showAll
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "bg-muted-foreground/10 text-muted-foreground hover:bg-muted-foreground/20"}`}
            >
              {showAll ? "All Time" : "Monthly"}
            </button>
          </div>
        </div>

        <div className="glass-card p-6 sm:p-10 rounded-[2.5rem] border-none bg-card/40">
          <BudgetForm
            onSubmit={editing ? handleUpdate : handleCreate}
            initial={editing || undefined}
            onCancel={() => setEditing(null)}
          />
        </div>

        <div className="space-y-6">
           <h2 className="text-xl font-bold px-2 flex items-center gap-2">
             <Layers size={20} className="text-primary" />
             Budget Overview
           </h2>
           
           {budgets.length === 0 ? (
             <div className="glass-card p-16 rounded-[2.5rem] text-center border-none bg-card/40 space-y-4">
               <div className="w-16 h-16 bg-muted/50 rounded-2xl mx-auto flex items-center justify-center">
                 <Wallet size={32} className="text-muted-foreground/40" />
               </div>
               <p className="text-muted-foreground font-medium max-w-xs mx-auto">
                 No budgets found {showAll ? "at all" : `for ${new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(selectedDate)}`}.
               </p>
             </div>
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <AnimatePresence mode="popLayout">
                 {budgets.map((b, i) => (
                   <motion.div
                     layout
                     key={b.id}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ delay: i * 0.05 }}
                     className="glass-card p-6 rounded-3xl group border-none bg-card/40 hover:bg-muted/30 transition-all shadow-sm"
                   >
                     <div className="flex justify-between items-start">
                       <div className="space-y-1">
                         <div className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1">
                           {b.month}
                         </div>
                         <h3 className="text-xl font-black text-foreground group-hover:text-primary transition-colors">
                           {b.categoryName || "Uncategorized"}
                         </h3>
                         <div className="text-2xl font-black text-foreground/90 mt-2">
                            ₹{new Intl.NumberFormat('en-IN').format(b.limitAmount)}
                         </div>
                       </div>

                       <div className="flex items-center gap-2">
                         <button
                           onClick={() => setEditing(b)}
                           className="p-3 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90"
                           title="Edit Budget"
                         >
                           <Edit2 size={18} />
                         </button>
                         <button
                           onClick={() => handleDelete(b.id)}
                           className="p-3 rounded-2xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all active:scale-90"
                           title="Delete Budget"
                         >
                           <Trash2 size={18} />
                         </button>
                       </div>
                     </div>
                     <div className="mt-6 h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary/30 w-full" />
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

