import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CategoryList from "./pages/Categories/CategoryList";
import TransactionList from "./pages/Transactions/TransactionList";
import BudgetList from "./pages/Budgets/BudgetList";
import MonthlyTotal from "./pages/Insights/MonthlyTotal";
import CategoryBreakdown from "./pages/Insights/CategoryBreakdown";
import BudgetComparison from "./pages/Insights/BudgetComparison";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <TransactionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budgets"
          element={
            <ProtectedRoute>
              <BudgetList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights/monthly"
          element={
            <ProtectedRoute>
              <MonthlyTotal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights/category"
          element={
            <ProtectedRoute>
              <CategoryBreakdown />
            </ProtectedRoute>
          }
        />
        <Route
          path="/insights/budget"
          element={
            <ProtectedRoute>
              <BudgetComparison />
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
