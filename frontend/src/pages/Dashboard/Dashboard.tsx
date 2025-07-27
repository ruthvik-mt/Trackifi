// import Layout from "./Layout";
// import { DollarSign, PieChart, Folder } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Dashboard() {
//   return (
//     <Layout>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="space-y-1">
//           <h1 className="text-2xl font-bold text-foreground">Welcome to your Trackifi Home</h1>
//           <p className="text-muted-foreground">
//             Track your budgets, analyze your spending, and stay in control.
//           </p>
//         </div>

//         {/* Overview Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {[
//             {
//               icon: <DollarSign className="text-green-600 dark:text-green-300" />,
//               label: "Total Spent",
//               value: "₹12,450",
//               bg: "bg-green-100 dark:bg-green-900",
//             },
//             {
//               icon: <PieChart className="text-blue-600 dark:text-blue-300" />,
//               label: "Active Budgets",
//               value: "4",
//               bg: "bg-blue-100 dark:bg-blue-900",
//             },
//             {
//               icon: <Folder className="text-purple-600 dark:text-purple-300" />,
//               label: "Categories",
//               value: "6",
//               bg: "bg-purple-100 dark:bg-purple-900",
//             },
//           ].map((card, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 1.2, ease: "easeOut" }}
//               className="rounded-xl p-4 bg-muted/40 dark:bg-muted/20 flex items-center gap-4"
//             >
//               <div className={`p-3 rounded-full ${card.bg}`}>{card.icon}</div>
//               <div>
//                 <p className="text-sm text-muted-foreground">{card.label}</p>
//                 <h3 className="text-lg font-semibold text-foreground">{card.value}</h3>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Placeholder for Charts */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.2 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             className="rounded-lg p-6 bg-muted/30 dark:bg-muted/10 min-h-[200px]"
//           >
//             <h4 className="text-lg font-medium mb-2 text-foreground">Spending Trends</h4>
//             <div className="text-muted-foreground text-sm">Chart coming soon...</div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, amount: 0.2 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//             className="rounded-lg p-6 bg-muted/30 dark:bg-muted/10 min-h-[200px]"
//           >
//             <h4 className="text-lg font-medium mb-2 text-foreground">Budget Breakdown</h4>
//             <div className="text-muted-foreground text-sm">Chart coming soon...</div>
//           </motion.div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// import Layout from "./Layout";
// import { DollarSign, PieChart, Folder } from "lucide-react";
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import axios from "@/axios";
// import SpendingTrendsChart from "@/components/SpendingTrendsChart";

// export default function Dashboard() {
//   const [summary, setSummary] = useState({
//     totalSpent: 0,
//     activeBudgets: 0,
//     categories: 0,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res1 = await axios.get("/api/dashboard/summary");
//         setSummary(res1.data);
//       } catch (error) {
//         console.error("Error fetching dashboard summary:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const formatNumber = (value: number) =>
//     new Intl.NumberFormat("en-IN").format(value);

//   return (
//     <Layout>
//       <div className="w-full max-w-screen overflow-x-hidden space-y-6 px-4">
//         {/* Header */}
//         <div className="space-y-1">
//           <h1 className="text-xl sm:text-2xl font-bold text-foreground">
//             Welcome to your Trackifi Home
//           </h1>
//           <p className="text-sm sm:text-base text-muted-foreground">
//             Track your budgets, analyze your spending, and stay in control.
//           </p>
//         </div>

//         {/* Summary Cards */}
//         <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
//           {[
//             {
//               icon: (
//                 <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-300" />
//               ),
//               label: "Total Spent",
//               value: `₹${formatNumber(summary.totalSpent)}`,
//               bg: "bg-green-100 dark:bg-green-900",
//             },
//             {
//               icon: (
//                 <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-300" />
//               ),
//               label: "Active Budgets",
//               value: formatNumber(summary.activeBudgets),
//               bg: "bg-blue-100 dark:bg-blue-900",
//             },
//             {
//               icon: (
//                 <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-300" />
//               ),
//               label: "Categories",
//               value: formatNumber(summary.categories),
//               bg: "bg-purple-100 dark:bg-purple-900",
//             },
//           ].map((card, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, amount: 0.2 }}
//               transition={{ duration: 1.2, ease: "easeOut" }}
//               className="rounded-lg p-3 sm:p-4 bg-muted/40 dark:bg-muted/20 flex items-center gap-3"
//             >
//               <div className={`p-2 sm:p-3 rounded-full ${card.bg}`}>
//                 {card.icon}
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-muted-foreground">{card.label}</p>
//                 <h3 className="text-base sm:text-lg font-semibold text-foreground">
//                   {card.value}
//                 </h3>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Spending Trends Chart */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.2 }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//           className="min-h-[250px] sm:min-h-[300px] rounded-lg p-2 sm:p-4"
//         >
//           <SpendingTrendsChart />
//         </motion.div>
//       </div>
//     </Layout>
//   );
// }

import Layout from "./Layout";
import { DollarSign, PieChart, Folder } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "@/axios";
import SpendingTrendsChart from "@/components/SpendingTrendsChart";

interface DashboardSummary {
  totalSpent: number;
  activeBudgets: number;
  categories: number;
}

export default function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>({
    totalSpent: 0,
    activeBudgets: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<DashboardSummary>("/api/dashboard/summary", {
          withCredentials: true,
        });
        setSummary(res.data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("en-IN").format(value);

  return (
    <Layout>
      <div className="w-full max-w-screen overflow-x-hidden space-y-6 px-4">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">
            Welcome to your Trackifi Home
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Track your budgets, analyze your spending, and stay in control.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-300" />
              ),
              label: "Total Spent",
              value: `₹${formatNumber(summary.totalSpent)}`,
              bg: "bg-green-100 dark:bg-green-900",
            },
            {
              icon: (
                <PieChart className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-300" />
              ),
              label: "Active Budgets",
              value: formatNumber(summary.activeBudgets),
              bg: "bg-blue-100 dark:bg-blue-900",
            },
            {
              icon: (
                <Folder className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-300" />
              ),
              label: "Categories",
              value: formatNumber(summary.categories),
              bg: "bg-purple-100 dark:bg-purple-900",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="rounded-lg p-3 sm:p-4 bg-muted/40 dark:bg-muted/20 flex items-center gap-3"
            >
              <div className={`p-2 sm:p-3 rounded-full ${card.bg}`}>
                {card.icon}
              </div>
              <div>
                <p className="text-xs sm:text-sm text-muted-foreground">{card.label}</p>
                <h3 className="text-base sm:text-lg font-semibold text-foreground">
                  {card.value}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spending Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="min-h-[250px] sm:min-h-[300px] rounded-lg p-2 sm:p-4"
        >
          <SpendingTrendsChart />
        </motion.div>
      </div>
    </Layout>
  );
}
