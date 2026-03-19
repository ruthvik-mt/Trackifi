import { useEffect, useState } from "react";
import axios from "@/axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";

interface TrendData {
  date: string;
  amount: number;
}

const SpendingTrendsChart = () => {
  const [data, setData] = useState<TrendData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        const res = await axios.get("/api/dashboard/spending-trends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        let trends: TrendData[] = [];

        if (Array.isArray(res.data)) {
          trends = res.data;
        } else if (Array.isArray(res.data?.data)) {
          trends = res.data.data;
        }

        const filtered = trends.filter(
          (item) =>
            typeof item.date === "string" && typeof item.amount === "number"
        );

        setData(filtered);
      } catch (err) {
        console.error("Error fetching trends:", err);
        setError("Failed to load data. Please try again.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-black text-foreground">
            Spending Trends
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">Your financial activity over time</p>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <div className="w-full h-[300px] sm:h-[400px]">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
               className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
            />
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground) / 0.1)" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 500 }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="glass-card p-4 rounded-2xl shadow-2xl border-none ring-1 ring-border/50">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</p>
                        <p className="text-lg font-black text-foreground">₹{new Intl.NumberFormat('en-IN').format(Number(payload[0].value))}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                strokeWidth={4}
                fill="url(#spendGradient)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex flex-col items-center justify-center space-y-2 opacity-50">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">No transaction data</p>
            <p className="text-xs text-muted-foreground">Start adding expenses to see trends</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingTrendsChart;
