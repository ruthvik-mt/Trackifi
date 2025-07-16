import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "../Dashboard/Layout";
import { getBudgetComparison } from "../../api/insights";
import { BudgetComparisonItem } from "../../types/Insight";

export default function BudgetComparison() {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<BudgetComparisonItem[]>([]);

  useEffect(() => {
    getBudgetComparison(month).then(setData);
  }, [month]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Budget vs Actual – {month}</h1>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mb-6 border p-2 rounded"
      />

      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="categoryName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" name="Budget" />
            <Bar dataKey="actual" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Layout>
  );
}
