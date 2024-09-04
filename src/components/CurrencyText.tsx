export function SmallCurrencyText({ amount }: { amount: number }) {
  return (
    <data
      value={amount}
      aria-label={`${amount} US Dollars`}
      className="font-bold flex items-end"
    >
      <span className="text-sm">$</span>
      <span>{amount}</span>
    </data>
  );
}

export function LargeCurrencyText({ amount }: { amount: number }) {
  return (
    <data
      value={amount}
      aria-label={`${amount} US Dollars`}
      className="text-3xl text-primaryDark font-bold flex items-end"
    >
      <span className="text-2xl">$</span>
      <span>{amount}</span>
    </data>
  );
}
