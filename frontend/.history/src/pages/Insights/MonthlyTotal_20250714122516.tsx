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

  useEffect(() => {
    setError("");
    axios
      .get("/insights/monthly-total", { params: { month } })
      .then((res) => setData(res.data))
      .catch((err) => {
        console.error("Failed to fetch monthly total", err);
        setError("Failed to load data. Please try again.");
      });
  }, [month, axios]);

  return (
    <Layout>
      <motion.div
        className="space-y-4 px-4 md:px-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg md:text-2xl">
              Total Spent – {month}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full max-w-xs"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            {data && (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[data]}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
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
