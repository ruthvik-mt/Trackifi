import { useCallback, useEffect, useState } from "react";
import Layout from "../Dashboard/Layout";
import TransactionForm from "./TransactionForm";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../api/transaction";
import { Transaction } from "../../types/Transaction";
import { MonthPicker } from "@/components/MonthPicker";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Edit2, Trash2, History, CreditCard, ArrowDownRight } from "lucide-react";

function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

function formatToIST(dateStr: string): string {
  const utcDate = new Date(dateStr);
  const istOffset = 330; 
  const istDate = new Date(utcDate.getTime() + istOffset * 60000);
  return istDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function TransactionList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  const selectedMonth = formatMonth(selectedDate);

  const loadTransactions = useCallback(async () => {
    try {
      const allTx = await getTransactions();

      const filtered = showAll
        ? allTx
        : allTx.filter((tx: Transaction) => {
            const txDate = new Date(tx.date);
            const istOffset = 330;
            const istDate = new Date(txDate.getTime() + istOffset * 60000);
            return formatMonth(istDate) === selectedMonth;
          });

      setTransactions(filtered);
    } catch (err) {
      console.error("Failed to load transactions", err);
    }
  }, [selectedMonth, showAll]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const refresh = async () => {
    loadTransactions();
  };

  const handleCreate = async (tx: Omit<Transaction, "id">) => {
    await createTransaction(tx);
    refresh();
  };

  const handleUpdate = async (tx: Omit<Transaction, "id">) => {
    if (!editing) return;
    await updateTransaction(editing.id, tx);
    setEditing(null);
    refresh();
  };

  const handleDelete = async (id: number) => {
    if (confirm("Permanently delete this transaction?")) {
      await deleteTransaction(id);
      refresh();
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-10 pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">Transactions</h1>
            <p className="text-muted-foreground font-medium">Keep track of every rupee spent.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-card/40 p-2 rounded-2xl ring-1 ring-border/50">
            <div className="flex items-center gap-2 px-3 py-2 bg-muted/50 rounded-xl font-medium">
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
          <TransactionForm
            onSubmit={editing ? handleUpdate : handleCreate}
            initial={editing || undefined}
            onCancel={() => setEditing(null)}
          />
        </div>

        <div className="space-y-6">
           <h2 className="text-xl font-bold px-2 flex items-center gap-2">
             <History size={20} className="text-primary" />
             Recent Activity
           </h2>
           
           <div className="space-y-3">
             <AnimatePresence mode="popLayout">
               {transactions.length === 0 ? (
                 <div className="glass-card p-16 rounded-[2.5rem] text-center border-none bg-card/40 space-y-4">
                   <div className="w-16 h-16 bg-muted/50 rounded-2xl mx-auto flex items-center justify-center">
                     <CreditCard size={32} className="text-muted-foreground/40" />
                   </div>
                   <p className="text-muted-foreground font-medium max-w-xs mx-auto">
                     No transactions found {showAll ? "at all" : `for ${new Intl.DateTimeFormat('en-IN', { month: 'long', year: 'numeric' }).format(selectedDate)}`}.
                   </p>
                 </div>
               ) : (
                 transactions.map((tx, i) => (
                   <motion.div
                     layout
                     key={tx.id}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: 20 }}
                     transition={{ delay: i * 0.03 }}
                     className="glass-card p-5 sm:px-8 rounded-2xl sm:rounded-3xl border-none bg-card/40 hover:bg-muted/30 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                   >
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                           <ArrowDownRight size={24} />
                        </div>
                        <div>
                          <div className="font-black text-foreground group-hover:text-primary transition-colors">{tx.description}</div>
                          <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                            {tx.categoryName || "Uncategorized"} • {formatToIST(tx.date)}
                          </div>
                        </div>
                     </div>
                     
                     <div className="flex items-center justify-between w-full sm:w-auto gap-6 self-end sm:self-center">
                        <div className="text-xl font-black text-foreground">
                          ₹{new Intl.NumberFormat('en-IN').format(tx.amount)}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditing(tx)}
                            className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all active:scale-90"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(tx.id)}
                            className="p-2.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all active:scale-90"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                     </div>
                   </motion.div>
                 ))
               )}
             </AnimatePresence>
           </div>
        </div>
      </div>
    </Layout>
  );
}
