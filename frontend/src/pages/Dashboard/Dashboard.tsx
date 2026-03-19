import Layout from "./Layout";
import { DollarSign, PieChart, Folder, ArrowUpRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "@/axios";
import SpendingTrendsChart from "@/components/SpendingTrendsChart";
import { Link } from "react-router-dom";

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

  const stats = [
    {
      label: "Total Spent",
      value: `₹${formatNumber(summary.totalSpent)}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: "+12.5%",
      to: "/transactions"
    },
    {
      label: "Active Budgets",
      value: formatNumber(summary.activeBudgets),
      icon: PieChart,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "4 active",
      to: "/budgets"
    },
    {
      label: "Categories",
      value: formatNumber(summary.categories),
      icon: Folder,
      color: "text-violet-500",
      bg: "bg-violet-500/10",
      trend: "managed",
      to: "/categories"
    },
  ];

  return (
    <Layout>
      <div className="space-y-10 pb-10 px-0 sm:px-2">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
              Hello, Welcome back!
            </h1>
            <p className="text-muted-foreground font-medium">
              Here's what's happening with your money today.
            </p>
          </div>
          <Link to="/insights/monthly-total" className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95 group">
             <TrendingUp size={20} className="group-hover:rotate-12 transition-transform" />
             View Details
          </Link>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-card p-6 rounded-3xl relative overflow-hidden group border-none bg-card/40"
            >
              <Link 
                to={stat.to}
                className="absolute top-0 right-0 p-4 z-10"
                aria-label={`View ${stat.label} details`}
              >
                 <ArrowUpRight size={24} className="text-muted-foreground/30 group-hover:text-primary transition-colors hover:scale-125" />
              </Link>
              
              <div className="space-y-4">
                <div className={`p-3 rounded-2xl w-fit ${stat.bg} ${stat.color}`}>
                  <stat.icon size={28} />
                </div>
                <div>
                  <p className="text-sm font-bold text-muted-foreground/60 tracking-widest uppercase">{stat.label}</p>
                  <h3 className="text-3xl font-black text-foreground mt-1 tabular-nums">
                    {stat.value}
                  </h3>
                </div>
                <div className="flex items-center gap-2 pt-2">
                   <div className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      {stat.trend}
                   </div>
                   <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter opacity-60">vs last month</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spending Trends Chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-[2.5rem] p-6 sm:p-10 border-none bg-card/40"
        >
          <SpendingTrendsChart />
        </motion.div>
      </div>
    </Layout>
  );
}
