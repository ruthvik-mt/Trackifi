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
    <div className="w-full">
      <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300 mb-4">
        Spending Trends
      </h2>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {/* Chart container always occupies space to prevent layout shift */}
      <div className="h-[400px] w-full">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading chart...</p>
          </div>
        ) : data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white text-black border border-gray-300 p-3 rounded shadow-md text-sm">
                        <p>{label}</p>
                        <p>Amount: ₹{payload[0].value}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                fill="url(#spendGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-muted-foreground">No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpendingTrendsChart;
