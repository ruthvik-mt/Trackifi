import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Layout from "../Dashboard/Layout";
import { useAxios } from "../../hooks/useAxios";
import { BudgetComparisonItem } from "../../types/Insight";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { MonthPicker } from "@/components/MonthPicker";

// Format date to YYYY-MM string
// ✅ Correct local month formatting (fixes July/August selection bug)
function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`; // e.g. "2025-07"
}

// ✅ Group and aggregate items by category
function aggregateByCategory(data: BudgetComparisonItem[]) {
  const map = new Map<string, BudgetComparisonItem>();

  for (const item of data) {
    const existing = map.get(item.categoryName);
    if (existing) {
      existing.budget += item.budget;
      existing.actual += item.actual;
    } else {
      map.set(item.categoryName, { ...item });
    }
  }

  return Array.from(map.values());
}

export default function BudgetComparison() {
  const axios = useAxios();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [data, setData] = useState<BudgetComparisonItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const month = formatMonth(selectedDate);

  useEffect(() => {
    setError("");
    setLoading(true);

    axios
      .get("/insights/budget-comparison", { params: { month } })
      .then((res) => {
        const cleaned: BudgetComparisonItem[] = (res.data as unknown[])
          .filter(
            (item): item is { category: string; budget: number; actual: number } =>
              !!item &&
              typeof item === "object" &&
              "category" in item &&
              "budget" in item &&
              "actual" in item
          )
          .map((item) => ({
            categoryName: item.category,
            budget: item.budget,
            actual: item.actual,
          }));

        const deduplicated = aggregateByCategory(cleaned);
        setData(deduplicated);
      })
      .catch((err) => {
        console.error("Failed to fetch budget comparison", err);
        setError("Failed to load data. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [month, axios]);

  return (
    <Layout>
      <motion.div
        className="space-y-6 px-4 md:px-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="shadow-lg border bg-gradient-to-br from-blue-50 to-white dark:from-background dark:to-card rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold text-indigo-800 dark:text-indigo-300">
              Budget vs Actual – {format(selectedDate, "MMMM yyyy")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
  <div className="flex items-center gap-3 flex-wrap">
    <label className="text-sm font-medium flex items-center gap-1">
      📅 Choose Month:
    </label>
    <div className="text-foreground bg-background rounded">
      <MonthPicker
        selected={selectedDate}
        onChange={(date) => date && setSelectedDate(date)}
      />
    </div>
  </div>


            {error && <p className="text-sm text-red-500">{error}</p>}
            {loading && !error && (
              <p className="text-muted-foreground text-sm">Loading chart...</p>
            )}

            {data.length > 0 && !loading && (
              <div className="h-[360px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <XAxis dataKey="categoryName" />
                    <YAxis />
                    <Tooltip
  cursor={{ fill: "transparent" }}
  formatter={(value: number, key) => [`₹${value}`, key]}
  contentStyle={{
    borderRadius: "8px",
    borderColor: "#ccc",
    backgroundColor: "var(--tooltip-bg)",
    color: "var(--tooltip-color)",
  }}
/>
                    <Legend />

                    <Bar
                      dataKey="actual"
                      name="Actual"
                      fill="url(#actualGradient)"
                      radius={[6, 6, 0, 0]}
                    >
                      <LabelList dataKey="actual" position="top" />
                    </Bar>

                    <Bar
                      dataKey="budget"
                      name="Budget"
                      fill="url(#budgetGradient)"
                      radius={[6, 6, 0, 0]}
                    >
                      <LabelList dataKey="budget" position="top" />
                    </Bar>

                    <defs>
                      <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.8} />
                      </linearGradient>
                      <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9333ea" stopOpacity={0.9} />
                        <stop offset="100%" stopColor="#c084fc" stopOpacity={0.8} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
}
