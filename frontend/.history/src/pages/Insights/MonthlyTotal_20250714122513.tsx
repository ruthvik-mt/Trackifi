// import { useEffect, useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
// import Layout from "../Dashboard/Layout";
// import { useAxios } from "../../hooks/useAxios";
// import { MonthlyTotal } from "../../types/Insight";

// export default function MonthlyTotalPage() {
//   const axios = useAxios();
//   const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
//   const [data, setData] = useState<MonthlyTotal | null>(null);

//   useEffect(() => {
//     axios
//       .get("/insights/monthly-total", { params: { month } })
//       .then((res) => setData(res.data))
//       .catch((err) => console.error("Failed to fetch monthly total", err));
//   }, [month, axios]);

//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold mb-4">Total Spent – {month}</h1>
//       <input
//         type="month"
//         value={month}
//         onChange={(e) => setMonth(e.target.value)}
//         className="mb-6 border p-2 rounded"
//       />

//       {data && (
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={[data]}>
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Bar dataKey="total" />
//           </BarChart>
//         </ResponsiveContainer>
//       )}
//     </Layout>
//   );
// }
