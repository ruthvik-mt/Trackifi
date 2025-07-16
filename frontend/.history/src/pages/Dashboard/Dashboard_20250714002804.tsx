import Layout from "./Layout";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const sampleData = [
  { month: "Jan", spending: 400 },
  { month: "Feb", spending: 300 },
  { month: "Mar", spending: 500 },
  { month: "Apr", spending: 700 },
];

export default function Dashboard() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
        <p className="text-gray-600 mb-6">
          Here you can view analytics, manage your budget, and track spending.
        </p>

        <div className="bg-white rounded shadow p-4">
          <h2 className="text-lg font-semibold mb-2">Monthly Spending Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="spending" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </Layout>
  );
}
