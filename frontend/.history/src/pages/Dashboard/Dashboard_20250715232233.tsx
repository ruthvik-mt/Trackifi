import Layout from "./Layout";
import { DollarSign, PieChart, Folder } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Welcome to your Dashboard</h1>
          <p className="text-muted-foreground">
            Track your budgets, analyze your spending, and stay in control.
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl p-4 shadow-sm border border-transparent flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
              <DollarSign className="text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <h3 className="text-lg font-semibold text-foreground">₹12,450</h3>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 shadow-sm border border-transparent flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
              <PieChart className="text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Budgets</p>
              <h3 className="text-lg font-semibold text-foreground">4</h3>
            </div>
          </div>

          <div className="bg-card rounded-xl p-4 shadow-sm border border-transparent flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
              <Folder className="text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Categories</p>
              <h3 className="text-lg font-semibold text-foreground">6</h3>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg shadow p-6 min-h-[200px] border border-transparent">
            <h4 className="text-lg font-medium mb-2 text-foreground">Spending Trends</h4>
            <div className="text-muted-foreground text-sm">Chart coming soon...</div>
          </div>

          <div className="bg-card rounded-lg shadow p-6 min-h-[200px] border border-transparent">
            <h4 className="text-lg font-medium mb-2 text-foreground">Budget Breakdown</h4>
            <div className="text-muted-foreground text-sm">Chart coming soon...</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
