import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import Layout from "../Dashboard/Layout";
import { getBudgetComparison } from "../../api/insights";
import { BudgetComparisonItem } from "../../types/Insight";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function BudgetComparison() {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<BudgetComparisonItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data whenever month changes
  useEffect(() => {
    setLoading(true);
    getBudgetComparison(month)
      .then(setData)
      .finally(() => setLoading(false));
  }, [month]);

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-bold mb-4">
          Budget vs Actual – {month}
        </h1>

        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="mb-6 border p-2 rounded"
        />

        {loading && <LoadingSpinner />}

        {!loading && data.length === 0 && (
          <p className="text-gray-600">No data available for this month.</p>
        )}

        {!loading && data.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoryName" />
                <YAxis />
                <Tooltip />
                <Legend />
                {/* Blue for budget, green for actual */}
                <Bar
                  dataKey="budget"
                  name="Budget"
                  fill="#3b82f6"
                  maxBarSize={40}
                />
                <Bar
                  dataKey="actual"
                  name="Actual"
                  fill="#10b981"
                  maxBarSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
