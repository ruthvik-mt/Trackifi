// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import { motion } from "framer-motion";

// interface TrendData {
//   date: string;
//   amount: number;
// }

// const SpendingTrendsChart = () => {
//   const [data, setData] = useState<TrendData[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchTrends = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get<TrendData[]>("/api/dashboard/spending-trends", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setData(res.data);
//       } catch (err: unknown) {
//         console.error("Error fetching trends:", err);
//         setError("Failed to load data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrends();
//   }, []);

//   return (
//     <motion.div
//       className="w-full space-y-4"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//     >
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300">
//           Spending Trends
//         </h2>
//       </div>

//       {error && <p className="text-sm text-red-500">{error}</p>}

//       {loading && !error && (
//         <p className="text-sm text-muted-foreground">Loading chart...</p>
//       )}

//       {!loading && data.length > 0 && (
//         <div
//           className={`
//             min-w-[700px] h-[400px] rounded-xl border p-4 
//             bg-gradient-to-br from-blue-50 to-white
//             dark:bg-card dark:from-none dark:to-none dark:bg-none
//             outline-none focus:outline-none
//           `}
//           tabIndex={-1} // Prevents focus
//         >
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart
//               data={data}
//               margin={{ top: 20, right: 30, left: 10, bottom: 0 }}
//             >
//               <defs>
//                 <linearGradient id="spendGradient" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="date" />
//               <YAxis />
//               <Tooltip formatter={(value: number) => [`₹${value}`, "Amount"]} />
//               <Area
//                 type="monotone"
//                 dataKey="amount"
//                 stroke="#3b82f6"
//                 fillOpacity={1}
//                 fill="url(#spendGradient)"
//                 dot={{ r: 3 }}
//                 activeDot={{ r: 6 }}
//               />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       )}

//       {!loading && data.length === 0 && !error && (
//         <p className="text-sm text-muted-foreground">No spending data available.</p>
//       )}
//     </motion.div>
//   );
// };

// export default SpendingTrendsChart;


import { useEffect, useState } from "react";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrends = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/dashboard/spending-trends", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // ✅ Ensuring res.data is an array
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else if (Array.isArray(res.data.data)) {
          // fallback if backend wraps it in a `data` object
          setData(res.data.data);
        } else {
          setData([]); // fallback for empty or unexpected format
        }
      } catch (err) {
        console.error("Error fetching trends:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  return (
    <motion.div
      className="w-full space-y-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-indigo-800 dark:text-indigo-300">
          Spending Trends
        </h2>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {loading && !error && (
        <p className="text-sm text-muted-foreground">Loading chart...</p>
      )}

      {!loading && data.length > 0 && (
        <div
          className={`
            min-w-[700px] h-[400px] rounded-xl border p-4 
            bg-gradient-to-br from-blue-50 to-white
            dark:bg-card dark:from-none dark:to-none dark:bg-none
            outline-none focus:outline-none
          `}
          tabIndex={-1}
        >
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
              <Tooltip formatter={(value: number) => [`₹${value}`, "Amount"]} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#spendGradient)"
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {!loading && data.length === 0 && !error && (
        <p className="text-sm text-muted-foreground">
          No spending data available.
        </p>
      )}
    </motion.div>
  );
};

export default SpendingTrendsChart;



