import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Layout from "../Dashboard/Layout";
import { getCategoryBreakdown } from "../../api/insights";
import { CategoryBreakdownItem } from "../../types/Insight";
import { motion } from "framer-motion";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#8dd1e1", "#a4de6c", "#d0ed57", "#a28fd0"];

export default function CategoryBreakdown() {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<CategoryBreakdownItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategoryBreakdown(month)
      .then(setData)
      .finally(() => setLoading(false));
  }, [month]);

  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold mb-4">Spending Breakdown - {month}</h1>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="mb-6 border p-2 rounded"
        />

        {loading ? (
          <p className="text-gray-500">Loading chart...</p>
        ) : data.length === 0 ? (
          <p className="text-gray-500">No spending data available for this month.</p>
        ) : (
          <ResponsiveContainer width="100%" height={360}>
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="categoryName"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={({ categoryName, amount }) =>
                  `${categoryName} (${((amount / total) * 100).toFixed(0)}%)`
                }
              >
                {data.map((_, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `₹${value.toFixed(2)}`} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </Layout>
  );
}
