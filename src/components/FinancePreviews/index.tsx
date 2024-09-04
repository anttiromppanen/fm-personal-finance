import PotsPreview from "@/components/FinancePreviews/PotsPreview";
import BudgetsPreview from "./BudgetsPreview";

function FinancePreviews() {
  return (
    <section className="grid grid-rows-4 grid-cols-2 min-h-screen gap-6 my-8 *:rounded-xl *:p-8">
      <PotsPreview />
      <BudgetsPreview />
      <div className="bg-orange-500 col-span-1 row-span-3">Transactions</div>
      <div className="bg-sky-500 col-span-1 row-span-2">Bills</div>
    </section>
  );
}

export default FinancePreviews;
