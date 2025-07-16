import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import Layout from "../Dashboard/Layout";
import { useAxios } from "../../hooks/useAxios";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { MonthPicker } from "@/components/MonthPicker";

function formatMonth(date: Date) {
  return date.toISOString().slice(0, 7);
}

export default function MonthlyTotalPage() {
  const axios = useAxios();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const month = formatMonth(selectedDate);

  useEffect(() => {
    setError("");
    setLoading(true);
    axios
      .get("/insights/monthly-total", { params: { month } })
      .then((res) => {
        console.log("API Monthly Total response:", res.data);
        setTotal(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch monthly total", err);
        setError("Failed to load data. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [month, axios]);

  return (
    <Layout>
      <motion.div
        className="space-y-6 px-4 md:px-8 py-6 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Monthly Spending Overview
          </h1>
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              📅 Select Month:
            </label>
            <MonthPicker
              selected={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
            />
          </div>
        </div>

        {/* Summary + Chart */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Summary Card */}
          <Card className="shadow-lg border border-blue-100 bg-blue-50 dark:bg-background dark:border-border rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                Total Spent in {format(selectedDate, "MMMM yyyy")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-sm text-muted-foreground">Fetching total...</p>
              ) : error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : total !== null ? (
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-300">
                  ₹{total.toLocaleString("en-IN")}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">No data available.</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                This includes all transactions recorded in the selected month.
              </p>
            </CardContent>
          </Card>

          {/* Chart */}
          <Card className="shadow-lg border bg-gradient-to-br from-blue-50 to-white dark:from-background dark:to-card rounded-xl">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                Visual Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              {loading && !error ? (
                <p className="text-sm text-muted-foreground">Loading chart...</p>
              ) : total !== null ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[{ month: format(selectedDate, "MMMM yyyy"), total }]}
                  >
                    <XAxis dataKey="month" stroke="#8884d8" />
                    <YAxis domain={[0, "dataMax + 100"]} />
                    <Tooltip
  cursor={{ fill: "transparent" }}
  formatter={(value: number) => [`₹${value}`, "Total"]}
  contentStyle={{
    borderRadius: "8px",
    borderColor: "#ccc",
    backgroundColor: "var(--tooltip-bg)",
    color: "var(--tooltip-color)",
  }}
/>
                    <Bar
                      dataKey="total"
                      fill="url(#barColor)"
                      radius={[6, 6, 0, 0]}
                    >
                      <LabelList dataKey="total" position="top" />
                      <defs>
                        <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                          <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                        </linearGradient>
                      </defs>
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-muted-foreground">No data found.</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Optional Insight */}
        {total !== null && total > 0 && (
          <motion.div
            className="mt-4 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            💡 <span className="font-medium">Insight:</span> Try comparing this
            with your budget under{" "}
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              Insights → Budget vs Actual
            </span>{" "}
            for more control.
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
}
