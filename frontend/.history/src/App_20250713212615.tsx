import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import CategoryList from "./pages/Categories/CategoryList";
import TransactionList from "./pages/Transactions/TransactionList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
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
        {/* TODO: add /transactions and any additional routes here */}
      </Routes>
    </Router>
  );
}

export default App;
