// // src/pages/Dashboard/Dashboard.tsx
// import { useAuth } from "@/hooks/useAuth";

// const Dashboard = () => {
//   const { user } = useAuth();

//   return (
//     <div className="bg-white p-6 rounded shadow">
//       <h1 className="text-2xl font-semibold mb-2">Welcome to your Dashboard</h1>
//       <p className="text-gray-600">Logged in as: <strong>{user?.email}</strong></p>
//     </div>
//   );
// };

// export default Dashboard;

import Layout from "./Layout";

export default function Dashboard() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-gray-600">Here you can view analytics, manage your budget, and track spending.</p>
    </Layout>
  );
}
