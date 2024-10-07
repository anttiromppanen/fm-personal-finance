export function SmallCurrencyText({ amount }: { amount: number }) {
  return (
    <data
      value={amount}
      aria-label={`${amount} US Dollars`}
      className="font-bold flex items-end"
    >
      <span className="text-sm">$</span>
      <span data-testid="amount">{amount}</span>
    </data>
  );
}

export function LargeCurrencyText({ amount }: { amount: number }) {
  return (
    <data
      value={amount}
      aria-label={`${amount} US Dollars`}
      className="text-4xl text-primaryDark font-bold flex items-end"
    >
      <span className="text-3xl">$</span>
      <span data-testid="amount">{amount}</span>
    </data>
  );
}
