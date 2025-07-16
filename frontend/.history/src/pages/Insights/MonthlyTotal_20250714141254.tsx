// import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import Layout from "../Dashboard/Layout";
// import { useAxios } from "../../hooks/useAxios";
// import { MonthlyTotal } from "../../types/Insight";

// export default function MonthlyTotalPage() {
//   const axios = useAxios();
//   const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
//   const [data, setData] = useState<MonthlyTotal | null>(null);

//   useEffect(() => {
//     axios
//       .get("/insights/monthly-total", { params: { month } })
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Failed to fetch monthly total", err));
//   }, [month, axios]);

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold mb-4">Total Spent – {month}</h1>
//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//         className="mb-6 border p-2 rounded"
//       />

//       {data && (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={[data]}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="total" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </Layout>
//   );
// }

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

// Convert YYYY-MM string from date object
function formatMonth(date: Date) {
  return date.toISOString().slice(0, 7);
}

export default function MonthlyTotalPage() {
  const axios = useAxios();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const month = formatMonth(selectedDate); // "YYYY-MM"

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
        className="space-y-6 px-4 md:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="shadow-lg border bg-gradient-to-br from-blue-50 to-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-bold text-blue-800">
              Total Spent on {format(selectedDate, "MMMM yyyy")}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center gap-3 flex-wrap">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                📅 Choose Month:
              </label>
              <MonthPicker selected={selectedDate} onChange={(date) => date && setSelectedDate(date)} />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {loading && !error && (
              <p className="text-muted-foreground text-sm">Loading chart...</p>
            )}

            {total !== null && !loading && (
              <div className="h-[320px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{ month: format(selectedDate, "MMMM yyyy"), total }]}>
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, "dataMax + 100"]} />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      formatter={(value: number) => [`₹${value}`, "Total"]}
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
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
}


