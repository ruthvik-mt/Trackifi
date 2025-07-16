import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import BudgetsPage from "./pages/Budgets/BudgetsPage";
import CategoriesPage from "./pages/Categories/CategoriesPage";
import TransactionsPage from "./pages/Transactions/TransactionsPage";
import InsightsPage from "./pages/Insights/InsightsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="" element={<DashboardPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="transactions" element={<TransactionsPage />} />
              <Route path="budgets" element={<BudgetsPage />} />
              <Route path="insights" element={<InsightsPage />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
