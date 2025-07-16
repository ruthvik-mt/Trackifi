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
} from "recharts";
import { motion } from "framer-motion";
import Layout from "../Dashboard/Layout";
import { useAxios } from "../../hooks/useAxios";
import { MonthlyTotal } from "../../types/Insight";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MonthlyTotalPage() {
  const axios = useAxios();
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<MonthlyTotal | null>(null);

  useEffect(() => {
    axios
      .get("/insights/monthly-total", { params: { month } })
      .then((res) => {
        console.log("API Monthly Total response:", res.data.total);
        setData(res.data);
      })
      .catch((err) => console.error("Failed to fetch monthly total", err));
  }, [month, axios]);

  return (
    <Layout>
      <motion.div
        className="max-w-3xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="mb-6 shadow-md">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">Total Spent – {month}</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full max-w-xs mb-4"
            />

            {data ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[{ ...data, month }]}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-500 text-sm">No data available for the selected month.</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Layout>
  );
}
