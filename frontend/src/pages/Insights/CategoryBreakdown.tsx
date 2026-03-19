// components/pages/CategoryBreakdown.tsx
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
import { useAxios } from "../../hooks/useAxios";
import { CategoryBreakdownItem } from "../../types/Insight";
import { motion } from "framer-motion";
import { MonthPicker } from "@/components/MonthPicker";
import { format } from "date-fns";
import { PieChart as PieIcon, Calendar, Filter } from "lucide-react";

const COLORS = [
  "hsl(var(--primary))",
  "#10b981", // Emerald 500
  "#3b82f6", // Blue 500
  "#8b5cf6", // Violet 500
  "#f59e0b", // Amber 500
  "#ef4444", // Red 500
  "#06b6d4", // Cyan 500
];

function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`; 
}

export default function CategoryBreakdown() {
  const axios = useAxios();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [range, setRange] = useState<"monthly" | "all-time">("monthly");
  const [data, setData] = useState<CategoryBreakdownItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const month = formatMonth(selectedDate); 

  useEffect(() => {
    setError("");
    setLoading(true);

    const url = range === "monthly" 
      ? "/api/insights/category-breakdown" 
      : "/api/insights/all-time-category-breakdown";
    
    const params = range === "monthly" ? { month } : {};

    axios
      .get(url, { params })
      .then((res) => {
        const raw = res.data;
        const transformed = Object.entries(raw).map(
          ([categoryName, amount]) => ({
            categoryName,
            amount: typeof amount === "number" ? amount : Number(amount),
          })
        );
        setData(transformed);
      })
      .catch((err) => {
        console.error("Failed to fetch category breakdown", err);
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
              Category Breakdown
            </h1>
            <p className="text-muted-foreground font-medium">
              {range === "monthly" ? "Where exactly is your money going this month?" : "Your total lifetime spending distribution."}
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
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-6 sm:p-12 rounded-[3.5rem] border-none bg-card/40 space-y-8"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black flex items-center gap-2">
              <PieIcon size={20} className="text-primary" />
              {range === "monthly" ? `${format(selectedDate, "MMMM yyyy")} Spending` : "Lifetime Distribution"}
            </h3>
            {data.length > 0 && (
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest ring-1 ring-primary/20">
                <Filter size={14} />
                {data.length} Categories
              </div>
            )}
          </div>

          {error && <p className="text-sm text-destructive font-bold">{error}</p>}
          
          <div className="min-h-[400px] w-full relative">
            {loading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : data.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    dataKey="amount"
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={140}
                    paddingAngle={8}
                    stroke="none"
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={1500}
                    nameKey="categoryName"
                  >
                    {data.map((_, idx) => (
                      <Cell 
                        key={idx} 
                        fill={COLORS[idx % COLORS.length]} 
                        className="hover:opacity-80 transition-opacity cursor-pointer outline-none shadow-2xl"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="glass-card p-4 rounded-2xl shadow-2xl border-none ring-1 ring-border/50">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                              {payload[0].name}
                            </p>
                            <p className="text-lg font-black text-foreground">
                              ₹{new Intl.NumberFormat('en-IN').format(Number(payload[0].value))}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend 
                     verticalAlign="bottom" 
                     height={36} 
                     iconType="circle"
                     formatter={(value) => <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 opacity-40">
                 <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                   <PieIcon size={40} className="text-muted-foreground" />
                 </div>
                 <p className="font-bold uppercase tracking-widest text-xs">No activity found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Layout>
  );
}
