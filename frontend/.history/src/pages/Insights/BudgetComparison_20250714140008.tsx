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
import { useAxios } from "../../hooks/useAxios";
import { BudgetComparisonItem } from "../../types/Insight";

export default function BudgetComparison() {
  const axios = useAxios();
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<BudgetComparisonItem[]>([]);

  useEffect(() => {
    axios
      .get("/insights/budget-comparison", { params: { month } })
      .then((res) => {
        const rawItems = res.data as {
          category: string;
          budget: number;
          actual: number;
        }[];

        const grouped: Record<string, BudgetComparisonItem> = {};

        rawItems.forEach((item) => {
          const category = item.category.trim();
          if (!grouped[category]) {
            grouped[category] = {
              categoryName: category,
              budget: 0,
              actual: 0,
            };
          }

          grouped[category].budget += item.budget;
          grouped[category].actual += item.actual;
        });

        const transformed: BudgetComparisonItem[] = Object.values(grouped);
        setData(transformed);
      })
      .catch((err) => console.error("Failed to fetch budget comparison", err));
  }, [month, axios]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Budget vs Actual – {month}</h1>

      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mb-6 border p-2 rounded text-sm"
      />

      {data.length > 0 ? (
        <div className="bg-card text-card-foreground rounded-lg p-4 shadow">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
              <XAxis
                dataKey="categoryName"
                interval={0}
                angle={-20}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" name="Budget" fill="#8884d8" />
              <Bar dataKey="actual" name="Actual" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No data available for selected month.</p>
      )}
    </Layout>
  );
}
