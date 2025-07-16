// // src/components/Insights/BudgetComparison.tsx
// import { useEffect, useState } from "react";
// import { getBudgetComparison } from "@/api/insights";
// import { BudgetComparison } from "@/types/Insight";
// import {
//   BarChart,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   Legend,
//   Bar,
//   ResponsiveContainer,
// } from "recharts";

// interface Props {
//   month: string;
// }

// const BudgetComparisonChart = ({ month }: Props) => {
//   const [data, setData] = useState<BudgetComparison[]>([]);

//   useEffect(() => {
//     if (month) {
//       getBudgetComparison(month).then(setData);
//     }
//   }, [month]);

//   return (
//     <div className="bg-white p-4 rounded shadow h-[300px]">
//       <h2 className="text-lg font-semibold mb-2">Budget vs Actual</h2>
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height="100%">
//           <BarChart data={data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="categoryName" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="budget" fill="#8884d8" />
//             <Bar dataKey="actual" fill="#82ca9d" />
//           </BarChart>
//         </ResponsiveContainer>
//       ) : (
//         <div className="text-gray-500">No data available</div>
//       )}
//     </div>
//   );
// };

// export default BudgetComparisonChart;

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Layout from "../Dashboard/Layout";
import { getBudgetComparison } from "../../api/insights";
import { BudgetComparisonItem } from "../../types/Insight";

export default function BudgetComparison() {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const [data, setData] = useState<BudgetComparisonItem[]>([]);

  useEffect(() => {
    getBudgetComparison(month).then(setData);
  }, [month]);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Budget vs Actual – {month}</h1>
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mb-6 border p-2 rounded"
      />

      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="categoryName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" name="Budget" />
            <Bar dataKey="actual" name="Actual" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Layout>
  );
}
