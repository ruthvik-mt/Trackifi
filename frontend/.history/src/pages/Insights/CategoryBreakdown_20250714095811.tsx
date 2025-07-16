// // src/components/Insights/CategoryBreakdown.tsx
// import { useEffect, useState } from "react";
// import { getCategoryBreakdown } from "@/api/insights";
// import { CategoryBreakdown } from "@/types/Insight";
// import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

// interface Props {
//   month: string;
// }

// const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c", "#d0ed57"];

// const CategoryBreakdownChart = ({ month }: Props) => {
//   const [data, setData] = useState<CategoryBreakdown[]>([]);

//   useEffect(() => {
//     if (month) {
//       getCategoryBreakdown(month).then(setData);
//     }
//   }, [month]);

//   return (
//     <div className="bg-white p-4 rounded shadow h-[300px]">
//       <h2 className="text-lg font-semibold mb-2">Spending Breakdown</h2>
//       {data.length > 0 ? (
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               dataKey="total"
//               nameKey="categoryName"
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               label
//             >
//               {data.map((_, i) => (
//                 <Cell key={i} fill={COLORS[i % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       ) : (
//         <div className="text-gray-500">No data available</div>
//       )}
//     </div>
//   );
// };

// export default CategoryBreakdownChart;
