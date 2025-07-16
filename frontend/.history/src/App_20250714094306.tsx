// import { Routes, Route } from "react-router-dom";
// import { useState } from "react";

// import Login from "@/pages/Auth/Login";
// import Register from "@/pages/Auth/Register";
// import Dashboard from "@/pages/Dashboard/Dashboard";

// import CategoryList from "@/pages/Categories/CategoryList";
// import TransactionList from "@/pages/Transactions/TransactionList";
// import BudgetList from "@/pages/Budgets/BudgetList";
// import MonthlyTotal from "@/pages/Insights/MonthlyTotal";
// import CategoryBreakdown from "@/pages/Insights/CategoryBreakdown";
// import BudgetComparison from "@/pages/Insights/BudgetComparison";

// import Layout from "@/pages/Dashboard/Layout";
// import ProtectedRoute from "@/components/ProtectedRoute";

// const App = () => {
//   const [selectedMonth, setSelectedMonth] = useState("");

//   return (
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <Layout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<Dashboard />} />
//         <Route path="categories" element={<CategoryList />} />
//         <Route path="transactions" element={<TransactionList />} />
//         <Route path="budgets" element={<BudgetList />} />
//         <Route
//           path="insights"
//           element={
//             <div className="space-y-6">
//               <div>
//                 <label className="block mb-2 font-medium">Select Month:</label>
//                 <input
//                   type="month"
//                   value={selectedMonth}
//                   onChange={(e) => setSelectedMonth(e.target.value)}
//                   className="border p-2 rounded"
//                 />
//               </div>
//               <MonthlyTotal month={selectedMonth} />
//               <CategoryBreakdown month={selectedMonth} />
//               <BudgetComparison month={selectedMonth} />
//             </div>
//           }
//         />
//       </Route>
//     </Routes>
//   );
// };

// export default App;


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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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
        {/* other routes like /categories, /transactions will go here later */}
      </Routes>
    </Router>
  );
}

export default App;
