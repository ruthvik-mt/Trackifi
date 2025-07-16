import { useEffect, useState, useMemo } from "react";
import Layout from "./Layout";
import { motion } from "framer-motion";
import { getTransactions } from "../../api/transaction";
import { getMonthlyTotal } from "../../api/insights";           // total spent
import { getBudgetComparison } from "../../api/insights";       // budgets vs actual
import { Transaction } from "../../types/Transaction";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { IndianRupee, TrendingUp, TrendingDown, Pocket } from "lucide-react";
import LoadingSpinner from "../../components/LoadingSpinner";

// Helper: current YYYY‑MM
const currentMonth = new Date().toISOString().slice(0, 7);

export default function Dashboard() {
  /* ──────────────────────────── State ──────────────────────────── */
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyTotal, setMonthlyTotal] = useState<number>(0);
  const [budgetData, setBudgetData] = useState<
    { categoryName: string; budget: number; actual: number }[]
  >([]);
  const [loading, setLoading] = useState(true);

  /* ─────────── Fetch data on mount ─────────── */
  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [tx, total, budget] = await Promise.all([
          getTransactions(currentMonth),
          getMonthlyTotal(currentMonth),
          getBudgetComparison(currentMonth),
        ]);
        setTransactions(tx);
        setMonthlyTotal(total.total);
        setBudgetData(budget);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  /* ─────────── Derived Metrics ─────────── */
  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.amount > 0)
        .reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.amount < 0)
        .reduce((sum, t) => sum + Math.abs(t.amount), 0),
    [transactions]
  );

  const netSavings = totalIncome - totalExpenses;

  const spentVsBudget = useMemo(() => {
    const totalBudget = budgetData.reduce((sum, b) => sum + b.budget, 0);
    const totalActual = budgetData.reduce((sum, b) => sum + b.actual, 0);
    const percent =
      totalBudget === 0 ? 0 : Math.min(100, Math.round((totalActual / totalBudget) * 100));
    return { totalBudget, totalActual, percent };
  }, [budgetData]);

  /* Dummy expenses trend for the chart (map monthlyTotal into 6‑month array if you have historical endpoint) */
  const chartData = [
    { month: "Feb", expenses: 400 },
    { month: "Mar", expenses: 550 },
    { month: "Apr", expenses: 300 },
    { month: "May", expenses: 420 },
    { month: "Jun", expenses: 610 },
    { month: "Jul", expenses: monthlyTotal },
  ];

  /* ─────────── Card component ─────────── */
  const Card = ({
    title,
    value,
    icon,
    color,
  }: {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
  }) => (
    <motion.div
      className={`flex items-center gap-4 p-4 rounded shadow ${color}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="p-3 bg-white/20 rounded">{icon}</div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </motion.div>
  );

  /* ─────────── Render ─────────── */
  return (
    <Layout>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card
              title="Total Income"
              value={`₹${totalIncome.toLocaleString()}`}
              color="bg-green-100 text-green-800"
              icon={<TrendingUp className="text-lg" />}
            />
            <Card
              title="Total Expenses"
              value={`₹${totalExpenses.toLocaleString()}`}
              color="bg-red-100 text-red-800"
              icon={<TrendingDown className="text-lg" />}
            />
            <Card
              title="Net Savings"
              value={`₹${netSavings.toLocaleString()}`}
              color="bg-blue-100 text-blue-800"
              icon={<Pocket className="text-lg" />}
            />
            <Card
              title="Budget Used"
              value={`${spentVsBudget.percent}%`}
              color="bg-purple-100 text-purple-800"
              icon={<IndianRupee className="text-lg" />}
            />
          </div>

          {/* Expenses trend chart */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Expense Trend (Last 6 Months)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="expenses" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent transactions */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Recent Transactions</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Description</th>
                  <th className="py-2">Category</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((t) => (
                  <tr key={t.id} className="border-b last:border-0">
                    <td className="py-2">{t.description}</td>
                    <td className="py-2">{t.categoryName}</td>
                    <td className="py-2">
                      {t.amount < 0 ? (
                        <span className="text-red-600">‑₹{Math.abs(t.amount)}</span>
                      ) : (
                        <span className="text-green-600">₹{t.amount}</span>
                      )}
                    </td>
                    <td className="py-2">{t.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </Layout>
  );
}
