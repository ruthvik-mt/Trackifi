// // src/components/Insights/MonthlyTotal.tsx
// import { useEffect, useState } from "react";
// import { getMonthlyTotal } from "@/api/insights";
// import type { MonthlyTotal } from "@/types/Insight"; // ✅ type-only import

// interface Props {
//   month: string;
// }

// const MonthlyTotal = ({ month }: Props) => {
//   const [data, setData] = useState<MonthlyTotal | null>(null);

//   useEffect(() => {
//     if (month) {
//       getMonthlyTotal(month).then(setData);
//     }
//   }, [month]);

//   return (
//     <div className="bg-white p-4 rounded shadow">
//       <h2 className="text-lg font-semibold mb-2">Total Spent in {month}</h2>
//       {data ? (
//         <div className="text-2xl text-red-600 font-bold">₹{data.total.toFixed(2)}</div>
//       ) : (
//         <div className="text-gray-500">No data available</div>
//       )}
//     </div>
//   );
// };

// export default MonthlyTotal;


import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Layout from "../Dashboard/Layout";
import { getMonthlyTotal } from "../../api/insights";
import { MonthlyTotal } from "../../types/Insight";

export default function MonthlyTotalPage() {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<MonthlyTotal | null>(null);

  useEffect(() => {
    getMonthlyTotal(month).then(setData);
  }, [month]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Total Spent – {month}</h1>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mb-6 border p-2 rounded"
      />

      {data && (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[data]}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Layout>
  );
}
