"use client";

import { SmallCurrencyText } from "@/components/CurrencyText";
import useActiveBudgetStore from "@/store/activeBudgetStore";

interface PotPreviewProps {
  name: string;
  amount: number;
  limit?: number;
  index: number;
  budget?: boolean;
}

const borderColors = [
  "border-l-secondaryGreen",
  "border-l-secondaryTeal",
  "border-l-primaryDarkGrey",
  "border-l-secondaryBrown",
  "border-l-primaryDark",
  "border-l-primaryLightGrey",
];

function ColoredPreviewItem({
  name,
  amount,
  limit,
  index,
  budget = false,
}: PotPreviewProps) {
  const activeBudget = useActiveBudgetStore((state) => state.activeBudget);
  const setActiveBudget = useActiveBudgetStore(
    (state) => state.setActiveBudget,
  );

  const newActiveBudget = { name, amount, limit: limit || 0 };

  return (
    <div
      onMouseEnter={() => budget && setActiveBudget(newActiveBudget)}
      onMouseLeave={() => budget && setActiveBudget(null)}
      className={`transition-all cursor-default ${borderColors[index]} ${activeBudget?.name === name ? "border-l-[40px]" : "border-l-[6px]"}`}
    >
      <div className="ml-4 flex flex-col gap-y-2">
        <h3 className="text-[10px] text-primaryDarkGrey">{name}</h3>
        <SmallCurrencyText amount={amount} />
      </div>
    </div>
  );
}

export default ColoredPreviewItem;
