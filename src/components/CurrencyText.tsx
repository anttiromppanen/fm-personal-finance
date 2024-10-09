import { twJoin, twMerge } from "tailwind-merge";

export function SmallCurrencyText({ amount }: { amount: number }) {
  return (
    <data
      value={amount}
      aria-label={`${amount} US Dollars`}
      className="md:font-bold flex items-end"
    >
      <span className="text-sm">$</span>
      <span data-testid="amount">{amount}</span>
    </data>
  );
}

export function LargeCurrencyText({
  amount,
  variant = "light",
}: {
  amount: number;
  variant?: "light" | "dark";
}) {
  return (
    <data
      value={amount}
      aria-label={`${amount} US Dollars`}
      className={twMerge(
        "text-4xl font-bold text-primaryDark flex items-end",
        variant === "dark" && "text-white",
      )}
    >
      <span className="text-3xl">$</span>
      <span data-testid="amount">{amount}</span>
    </data>
  );
}
