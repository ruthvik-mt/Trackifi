// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Dashboard from "@/pages/Dashboard/Dashboard";

import CategoryList from "@/components/CategoryList";
import TransactionList from "@/components/Transactions/TransactionList";
import BudgetList from "@/components/Budgets/BudgetList";
import MonthlyTotal from "@/components/Insights/MonthlyTotal";
import CategoryBreakdown from "@/components/Insights/CategoryBreakdown";
import BudgetComparison from "@/components/Insights/BudgetComparison";

import Layout from "@/components/Dashboard/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";

const App = () => {
  const [selectedMonth, setSelectedMonth] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="transactions" element={<TransactionList />} />
          <Route path="budgets" element={<BudgetList />} />
          <Route
            path="insights"
            element={
              <div className="space-y-6">
                <div>
                  <label className="block mb-2 font-medium">Select Month:</label>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border p-2 rounded"
                  />
                </div>
                <MonthlyTotal month={selectedMonth} />
                <CategoryBreakdown month={selectedMonth} />
                <BudgetComparison month={selectedMonth} />
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
