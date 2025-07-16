import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import Layout from "../Dashboard/Layout";
import { useAxios } from "../../hooks/useAxios";
import { CategoryBreakdownItem } from "../../types/Insight";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f7f", "#8dd1e1", "#a4de6c"];

export default function CategoryBreakdown() {
  const axios = useAxios();
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<CategoryBreakdownItem[]>([]);

  useEffect(() => {
  axios
    .get("/insights/category-breakdown", { params: { month } })
    .then((res) => {
      const raw = res.data;

      const transformed = Object.entries(raw).map(([categoryName, amount]) => ({
        categoryName,
        amount: typeof amount === "number" ? amount : Number(amount),
      }));

      setData(transformed);
    })
    .catch((err) => console.error("Failed to fetch category breakdown", err));
}, [month, axios]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Spending Breakdown – {month}</h1>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mb-6 border p-2 rounded"
      />
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="amount"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={(d) => d.categoryName}
            >
              {data.map((_, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Layout>
  );
}
