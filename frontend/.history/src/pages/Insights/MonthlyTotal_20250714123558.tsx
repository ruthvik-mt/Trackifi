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
import { MonthlyTotal } from "../../types/Insight";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export default function MonthlyTotalPage() {
  const axios = useAxios();
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<MonthlyTotal | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError("");
    setLoading(true);
    axios
      .get("/insights/monthly-total", { params: { month } })
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Failed to fetch monthly total", err);
        setError("Failed to load data. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [month, axios]);

  return (
    <Layout>
      <motion.div
        className="space-y-4 px-4 md:px-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="shadow-md border bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800">
              Total Spent – {month}
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 flex-wrap">
              <label htmlFor="month" className="text-sm font-medium text-gray-600">
                Select Month:
              </label>
              <Input
                id="month"
                type="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="max-w-xs"
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
            {loading && !error && <p className="text-muted-foreground text-sm">Loading chart...</p>}

            {data && !loading && (
              <div className="h-[320px] w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      {
                        month: data.month,
                        total: data.total,
                      },
                    ]}
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      cursor={{ fill: "transparent" }}
                      formatter={(value: number) => [`₹${value}`, "Total"]}
                    />
                    <Bar dataKey="total" fill="#3b82f6">
                      <LabelList dataKey="total" position="top" />
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
