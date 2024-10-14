import PotsPreview from "@/components/FinancePreviews/PotsPreview";
import BudgetsPreview from "./BudgetsPreview";
import TransactionsPreview from "./TransactionsPreview";
import BillsPreview from "./BillsPreview";
{
  /* 
<section className="my-8 flex min-h-screen flex-col gap-y-6 *:break-inside-avoid *:rounded-xl *:p-6 lg:block lg:columns-2 lg:gap-6 xl:grid xl:grid-cols-2 xl:grid-rows-4 xl:*:p-8">
  */
}

function FinancePreviews({ userId }: { userId: string }) {
  return (
    <section className="my-8 flex min-h-screen flex-col gap-y-6 *:rounded-xl *:p-6 md:grid lg:grid-cols-2 lg:gap-6 xl:grid-cols-2 xl:grid-rows-4 xl:*:p-8">
      <PotsPreview />
      <BudgetsPreview userId={userId} />
      <TransactionsPreview userId={userId} />
      <BillsPreview userId={userId} />
    </section>
  );
}

export default FinancePreviews;
