import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Layout from "../Dashboard/Layout";
import { useAxios } from "../../hooks/useAxios";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { MonthPicker } from "@/components/MonthPicker";
import { Calendar, TrendingUp, BarChart3, Info } from "lucide-react";

function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export default function MonthlyTotalPage() {
  const axios = useAxios();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [range, setRange] = useState<"monthly" | "all-time">("monthly");
  const [total, setTotal] = useState<number | null>(null);
  const [trendData, setTrendData] = useState<{ month: string; total: number }[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const month = formatMonth(selectedDate);

  useEffect(() => {
    setError("");
    setLoading(true);

    if (range === "monthly") {
      axios.get("/api/insights/monthly-total", { params: { month } })
        .then((res) => {
          setTotal(res.data);
          // For monthly view, we just show one bar
          setTrendData([{ month: format(selectedDate, "MMM"), total: res.data }]);
        })
        .catch((err) => {
          console.error("Failed to fetch monthly total", err);
          setError("Failed to load data.");
        })
        .finally(() => setLoading(false));
    } else {
      // All-time mode
      Promise.all([
        axios.get("/api/insights/all-time-total"),
        axios.get("/api/insights/all-time-monthly-trend")
      ])
        .then(([totalRes, trendRes]) => {
          setTotal(totalRes.data);
          setTrendData(trendRes.data);
        })
        .catch((err) => {
          console.error("Failed to fetch all-time data", err);
          setError("Failed to load all-time data.");
        })
        .finally(() => setLoading(false));
    }
  }, [month, range, selectedDate, axios]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10 pb-10">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Spending Insights
            </h1>
            <p className="text-muted-foreground font-medium">
              {range === "monthly" ? "A high-level view of your monthly activity." : "Your complete financial history at a glance."}
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-card/40 p-1.5 rounded-2xl ring-1 ring-border/50">
            <div className="flex gap-1">
              <button
                onClick={() => setRange("monthly")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  range === "monthly" 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setRange("all-time")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  range === "all-time" 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                All Time
              </button>
            </div>
            
            {range === "monthly" && (
              <div className="h-4 w-px bg-border/50 mx-1" />
            )}

            {range === "monthly" && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-xl font-medium">
                <Calendar size={14} className="text-primary" />
                <MonthPicker
                  selected={selectedDate}
                  onChange={(date) => date && setSelectedDate(date)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Summary + Chart */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Summary Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 rounded-[2.5rem] border-none bg-card/40 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <TrendingUp size={28} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-muted-foreground uppercase tracking-widest text-[10px]">
                  {range === "monthly" ? `Total Spent in ${format(selectedDate, "MMMM")}` : "Total Lifetime Spending"}
                </h3>
                <div className="mt-2">
                  {loading ? (
                    <div className="h-10 w-32 bg-muted animate-pulse rounded-lg" />
                  ) : error ? (
                    <p className="text-sm text-destructive font-bold">{error}</p>
                  ) : total !== null ? (
                    <p className="text-4xl sm:text-5xl font-black text-foreground tabular-nums">
                      ₹{new Intl.NumberFormat('en-IN').format(total)}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest">No data</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-border/50 flex items-start gap-3">
               <Info size={18} className="text-primary shrink-0 mt-0.5" />
               <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                 {range === "monthly" 
                   ? `This sum aggregates all transactions within the ${format(selectedDate, "MMMM yyyy")} timeframe.`
                   : "This sum aggregates every transaction ever recorded in your account history."}
               </p>
            </div>
          </motion.div>

          {/* Chart */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 glass-card p-6 sm:p-10 rounded-[2.5rem] border-none bg-card/40 space-y-6"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black flex items-center gap-2">
                <BarChart3 size={20} className="text-primary" />
                {range === "monthly" ? "Monthly Snapshot" : "Spending Trend Over Time"}
              </h3>
            </div>
            
            <div className="h-[300px] w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                   <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              ) : trendData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trendData}
                    margin={{ top: 20, right: 0, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.1)" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 700 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 600 }}
                    />
                    <Tooltip
                      cursor={{ fill: "hsl(var(--primary) / 0.05)", radius: 12 }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="glass-card p-4 rounded-2xl shadow-2xl border-none ring-1 ring-border/50">
                              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{payload[0].payload.month}</p>
                              <p className="text-lg font-black text-foreground">₹{new Intl.NumberFormat('en-IN').format(Number(payload[0].value))}</p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="total"
                      fill="url(#barGradient)"
                      radius={range === "monthly" ? [12, 12, 12, 12] : [8, 8, 8, 8]}
                      barSize={range === "monthly" ? 60 : 30}
                    />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center opacity-40">
                   <p className="font-bold uppercase tracking-widest text-xs">No activity found</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Dynamic Insight */}
        {total !== null && total > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-4 p-6 rounded-3xl bg-primary/5 border border-primary/20 backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
               <TrendingUp size={20} />
            </div>
            <p className="text-sm font-medium text-foreground/80">
              {range === "monthly" 
                ? "Your spending is tracked! Check Budget vs Actual to see if you're staying within your limits."
                : "This represents your entire transaction history. Great job keeping your records up to date!"}
            </p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
}
