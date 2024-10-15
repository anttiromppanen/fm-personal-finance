"use client";

import { LargeCurrencyText } from "@/components/CurrencyText";
import useActiveBudgetStore from "@/store/activeBudgetStore";
import { IBudget } from "@/types";
import { hexBgColors } from "@/utils/colors";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface BudgetPieChartProps {
  fourBiggestBudgets: IBudget[];
  totalAmount: number;
  totalLimit: number;
}

interface IActiveBudget {
  name: string;
  limit: number;
  amount: number;
}

function BudgetPieChart({
  fourBiggestBudgets,
  totalAmount,
  totalLimit,
}: BudgetPieChartProps) {
  const activeBudget = useActiveBudgetStore((state) => state.activeBudget);
  const setActiveBudget = useActiveBudgetStore(
    (state) => state.setActiveBudget,
  );

  const handleCellHover = (e: any) => {
    setActiveBudget({ name: e.name, limit: e.limit, amount: e.amount });
  };

  return (
    <div className="relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={fourBiggestBudgets}
            dataKey="limit"
            cx="50%"
            cy="50%"
            outerRadius="100%" // Outer radius of the pie
            innerRadius="70%" // Inner radius to create the "donut" effect
            stroke="none" // Removes the stroke around slices
            onMouseOver={handleCellHover}
            onMouseLeave={() => setActiveBudget(null)}
          >
            {fourBiggestBudgets.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={hexBgColors[index]}
                className={
                  activeBudget?.name === entry.name
                    ? "opacity-80 brightness-110"
                    : "opacity-100 brightness-100"
                }
              />
            ))}
          </Pie>
          <Pie
            data={[{ value: 1 }]} // Single dummy data point
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius="80%" // Slightly larger than the main pie's outerRadius
            innerRadius="70%" // Creates a thin ring effect
            stroke="none"
            fill="rgba(255, 255, 255, 0.3)" // Optional: Set a semi-transparent color
            className="pointer-events-none relative"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col items-center justify-center rounded-full">
        {activeBudget && (
          <h3 className="mb-1 text-2xl text-primaryDarkGrey">
            {activeBudget.name}
          </h3>
        )}
        <LargeCurrencyText
          amount={activeBudget?.amount ? activeBudget.amount : totalAmount}
        />
        <p className="mt-2 text-xs text-primaryDarkGrey">
          of <span className="text-[10px]">$</span>
          {activeBudget?.limit ? activeBudget.limit : totalLimit} limit
        </p>
      </div>
      <div />
    </div>
  );
}

export default BudgetPieChart;
