"use client";

import { twJoin, twMerge } from "tailwind-merge";
import { SmallCurrencyText } from "@/components/CurrencyText";
import useActiveBudgetStore from "@/store/activeBudgetStore";
import { tailwindBorderColors } from "@/utils/colors";

interface PotPreviewProps {
  name: string;
  amount: number;
  limit?: number;
  index: number;
  budget?: boolean;
}

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
  const borderColor = tailwindBorderColors[index];

  return (
    <div
      onMouseEnter={() => budget && setActiveBudget(newActiveBudget)}
      onMouseLeave={() => budget && setActiveBudget(null)}
      className={twJoin(
        "cursor-default transition-all",
        borderColor,
        activeBudget?.name === name ? "border-l-[25px]" : "border-l-4",
      )}
    >
      <div className="ml-4 flex flex-col justify-center gap-y-2 md:items-center xl:items-start">
        <h3 className="text-[10px] text-primaryDarkGrey">{name}</h3>
        <SmallCurrencyText amount={amount} />
      </div>
    </div>
  );
}

export default ColoredPreviewItem;
