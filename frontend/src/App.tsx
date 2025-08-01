import { Routes, Route, Navigate } from "react-router-dom";
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
import LandingPage from "./pages/LandingPage";
import VerifyEmail from "./pages/Auth/VerifyEmail"; // ✅ Added

export default function App() {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ✅ Email Verification Route */}
      <Route path="/verify-email" element={<VerifyEmail />} />

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
        path="/insights/monthly-total"
        element={
          <ProtectedRoute>
            <MonthlyTotal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/insights/category-breakdown"
        element={
          <ProtectedRoute>
            <CategoryBreakdown />
          </ProtectedRoute>
        }
      />
      <Route
        path="/insights/budget-comparison"
        element={
          <ProtectedRoute>
            <BudgetComparison />
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
