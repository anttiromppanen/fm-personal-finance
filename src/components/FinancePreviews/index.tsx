import PotsPreview from "@/components/FinancePreviews/PotsPreview";
import BudgetsPreview from "./BudgetsPreview";
import TransactionsPreview from "./TransactionsPreview";
import BillsPreview from "./BillsPreview";

function FinancePreviews({ userId }: { userId: string }) {
  return (
    <section className="grid grid-rows-4 grid-cols-2 min-h-screen gap-6 my-8 *:rounded-xl *:p-8">
      <PotsPreview />
      <BudgetsPreview userId={userId} />
      <TransactionsPreview userId={userId} />
      <BillsPreview userId={userId} />
    </section>
  );
}

export default FinancePreviews;
