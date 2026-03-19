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
import Layout from "../Dashboard/Layout";
import { useAxios } from "../../hooks/useAxios";
import { BudgetComparisonItem } from "../../types/Insight";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { MonthPicker } from "@/components/MonthPicker";
import { Calendar, Scale, Info } from "lucide-react";

function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

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
  const [range, setRange] = useState<"monthly" | "all-time">("monthly");
  const [data, setData] = useState<BudgetComparisonItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const month = formatMonth(selectedDate);

  useEffect(() => {
    setError("");
    setLoading(true);

    const url = range === "monthly" 
      ? "/api/insights/budget-comparison" 
      : "/api/insights/all-time-budget-comparison";
    
    const params = range === "monthly" ? { month } : {};

    axios
      .get(url, { params })
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
        setError("Failed to load data.");
      })
      .finally(() => setLoading(false));
  }, [month, range, axios]);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-10 pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
              Budget vs Actual
            </h1>
            <p className="text-muted-foreground font-medium">
              {range === "monthly" ? "Compare your plans with reality this month." : "Your lifetime budgeting discipline overview."}
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

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 sm:p-10 rounded-[3rem] border-none bg-card/40 space-y-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Scale size={20} className="text-primary" />
              {range === "monthly" ? `Comparison for ${format(selectedDate, "MMMM yyyy")}` : "Lifetime Comparison"}
            </h3>
          </div>

          {error && <p className="text-sm text-destructive font-bold">{error}</p>}
          
          <div className="h-[450px] w-full pt-4">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                 <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : data.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 20, right: 0, left: -20, bottom: 20 }}
                  barGap={12}
                >
                  <defs>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={1} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0.6} />
                    </linearGradient>
                    <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={1} />
                      <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.1)" />
                  <XAxis 
                    dataKey="categoryName" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
                    dy={12}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: 700 }}
                  />
                  <Tooltip
                    cursor={{ fill: "hsl(var(--muted) / 0.3)", radius: 12 }}
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card p-5 rounded-3xl shadow-2xl border-none ring-1 ring-border/50 space-y-3 min-w-[180px]">
                            <p className="text-xs font-black uppercase tracking-widest text-primary">{label}</p>
                            <div className="space-y-2">
                               <div className="flex justify-between items-center gap-4">
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Actual</span>
                                  <span className="text-sm font-black text-rose-500">₹{new Intl.NumberFormat('en-IN').format(Number(payload[0].value))}</span>
                               </div>
                               <div className="flex justify-between items-center gap-4">
                                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Budget</span>
                                  <span className="text-sm font-black text-primary">₹{new Intl.NumberFormat('en-IN').format(Number(payload[1].value))}</span>
                               </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                     verticalAlign="top" 
                     align="right"
                     iconType="circle"
                     wrapperStyle={{ paddingBottom: 20 }}
                     formatter={(value) => <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">{value}</span>}
                  />
                  <Bar dataKey="actual" name="Actual" fill="url(#actualGradient)" radius={[8, 8, 8, 8]} barSize={24} />
                  <Bar dataKey="budget" name="Budget" fill="url(#budgetGradient)" radius={[8, 8, 8, 8]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40 text-center">
                 <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center">
                    <Scale size={40} className="text-muted-foreground" />
                 </div>
                 <div>
                    <p className="font-bold uppercase tracking-widest text-xs">No comparison data</p>
                    <p className="text-[10px] mt-1">Set budgets and add transactions to see results</p>
                 </div>
              </div>
            )}
          </div>
        </motion.div>

        <div className="flex items-start gap-4 p-6 rounded-3xl bg-primary/5 border border-primary/20">
           <Info className="text-primary shrink-0 mt-1" size={20} />
           <p className="text-sm font-medium text-foreground/80 leading-relaxed">
             <span className="font-black text-primary">Pro Tip:</span> If your actual spending (rose bars) is consistently higher than your budget (indigo bars), consider adjusting your budget limits or reviewing your transaction categories.
           </p>
        </div>
      </div>
    </Layout>
  );
}
