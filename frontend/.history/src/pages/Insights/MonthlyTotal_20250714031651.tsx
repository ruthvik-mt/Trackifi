// src/components/Insights/MonthlyTotal.tsx
import { useEffect, useState } from "react";
import { getMonthlyTotal } from "@/api/insights";
import type { MonthlyTotal } from "@/types/Insight"; // ✅ type-only import

interface Props {
  month: string;
}

const MonthlyTotal = ({ month }: Props) => {
  const [data, setData] = useState<MonthlyTotal | null>(null);

  useEffect(() => {
    if (month) {
      getMonthlyTotal(month).then(setData);
    }
  }, [month]);

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Total Spent in {month}</h2>
      {data ? (
        <div className="text-2xl text-red-600 font-bold">₹{data.total.toFixed(2)}</div>
      ) : (
        <div className="text-gray-500">No data available</div>
      )}
    </div>
  );
};

export default MonthlyTotal;
