import PotsPreview from "./PotsPreview";

function FinancePreviews() {
  return (
    <div className="grid grid-rows-4 grid-cols-2 min-h-screen gap-6 mt-8 *:rounded-xl *:p-8">
      <PotsPreview />
      <div className="bg-teal-500 col-span-1 row-span-2">Budgets</div>
      <div className="bg-orange-500 col-span-1 row-span-3">Transactions</div>
      <div className="bg-sky-500 col-span-1 row-span-2">Bills</div>
    </div>
  );
}

export default FinancePreviews;
