// // components/pages/CategoryBreakdown.tsx
// import { useEffect, useState } from "react";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import Layout from "../Dashboard/Layout";
// import { useAxios } from "../../hooks/useAxios";
// import { CategoryBreakdownItem } from "../../types/Insight";
// import { motion } from "framer-motion";
// import { MonthPicker } from "@/components/MonthPicker";
// import { format } from "date-fns";

// const COLORS = [
//   "#8884d8",
//   "#82ca9d",
//   "#ffc658",
//   "#ff7f7f",
//   "#8dd1e1",
//   "#a4de6c",
// ];

// // ✅ Proper month formatting (avoid timezone bugs)
// function formatMonth(date: Date): string {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   return `${year}-${month}`; // → "2025-07"
// }

// export default function CategoryBreakdown() {
//   const axios = useAxios();
//   const [selectedDate, setSelectedDate] = useState<Date>(new Date());
//   const [data, setData] = useState<CategoryBreakdownItem[]>([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const month = formatMonth(selectedDate); // ⬅️ safe month string

//   useEffect(() => {
//     setError("");
//     setLoading(true);

//     axios
//       .get("/api/insights/category-breakdown", { params: { month } })
//       .then((res) => {
//         const raw = res.data;
//         const transformed = Object.entries(raw).map(
//           ([categoryName, amount]) => ({
//             categoryName,
//             amount: typeof amount === "number" ? amount : Number(amount),
//           })
//         );
//         setData(transformed);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch category breakdown", err);
//         setError("Failed to load data. Please try again.");
//       })
//       .finally(() => setLoading(false));
//   }, [month, axios]);

//   return (
//     <Layout>
//       <motion.div
//         className="space-y-6 px-4 md:px-8 max-w-5xl mx-auto"
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.4 }}
//       >
//         <div className="flex flex-col gap-4">
//           <h1 className="text-2xl font-bold text-indigo-800 dark:text-indigo-300">
//             Spending Breakdown – {format(selectedDate, "MMMM yyyy")}
//           </h1>

//           <div className="flex items-center gap-3 flex-wrap">
//             <label className="text-sm font-medium text-foreground flex items-center gap-1">
//               📅 Choose Month:
//             </label>
//             <MonthPicker
//               selected={selectedDate}
//               onChange={(date) => date && setSelectedDate(date)}
//             />
//           </div>

//           {error && <p className="text-sm text-red-500">{error}</p>}
//           {loading && !error && (
//             <p className="text-muted-foreground text-sm">Loading chart...</p>
//           )}

//           {data.length > 0 && (
//             <div className="h-[300px] sm:h-[340px] w-full pt-2">
//               <ResponsiveContainer width="100%" height="100%">
//                 <PieChart>
//                   <Pie
//                     dataKey="amount"
//                     data={data}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={110}
//                     label={({ categoryName }) => categoryName}
//                     labelLine={false}
//                     isAnimationActive={true}
//                   >
//                     {data.map((_, idx) => (
//                       <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip
//                     formatter={(value: number) => [`₹${value}`, "Amount"]}
//                     contentStyle={{
//                       borderRadius: "8px",
//                       borderColor: "#ccc",
//                       backgroundColor: "var(--tooltip-bg)",
//                       color: "var(--tooltip-color)",
//                     }}
//                   />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
//           )}

//           {!loading && data.length === 0 && !error && (
//             <p className="text-sm text-muted-foreground">
//               No data found for this month.
//             </p>
//           )}
//         </div>
//       </motion.div>
//     </Layout>
//   );
// }

// components/pages/CategoryBreakdown.tsx
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Layout from "../Dashboard/Layout";
import { useAxios } from "../../hooks/useAxios";
import { CategoryBreakdownItem } from "../../types/Insight";
import { motion } from "framer-motion";
import { MonthPicker } from "@/components/MonthPicker";
import { format } from "date-fns";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f7f",
  "#8dd1e1",
  "#a4de6c",
];

// ✅ Proper month formatting (avoid timezone bugs)
function formatMonth(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`; // → "2025-07"
}

export default function CategoryBreakdown() {
  const axios = useAxios();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [data, setData] = useState<CategoryBreakdownItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const month = formatMonth(selectedDate); // ⬅️ safe month string

  useEffect(() => {
    setError("");
    setLoading(true);

    axios
      .get("/api/insights/category-breakdown", { params: { month } })
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
        setError("Failed to load data. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [month, axios]);

  return (
    <Layout>
      <motion.div
        className="space-y-6 px-4 sm:px-6 md:px-8 max-w-full sm:max-w-3xl md:max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-xl sm:text-2xl font-bold text-indigo-800 dark:text-indigo-300">
            Spending Breakdown – {format(selectedDate, "MMMM yyyy")}
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 flex-wrap">
            <label className="text-sm font-medium text-foreground flex items-center gap-1">
              📅 Choose Month:
            </label>
            <MonthPicker
              selected={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          {loading && !error && (
            <p className="text-muted-foreground text-sm">Loading chart...</p>
          )}

          {data.length > 0 && (
            <div className="h-[300px] sm:h-[340px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    dataKey="amount"
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label={({ categoryName }) => categoryName}
                    labelLine={false}
                    isAnimationActive={true}
                  >
                    {data.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => [`₹${value}`, "Amount"]}
                    contentStyle={{
                      borderRadius: "8px",
                      borderColor: "#ccc",
                      backgroundColor: "var(--tooltip-bg)",
                      color: "var(--tooltip-color)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}

          {!loading && data.length === 0 && !error && (
            <p className="text-sm text-muted-foreground">
              No data found for this month.
            </p>
          )}
        </div>
      </motion.div>
    </Layout>
  );
}
