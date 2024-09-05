import {
  fetchFourBiggestBudgets,
  fetchTotalAmount,
  fetchTotalLimit,
} from "@/actions/budget";
import ColoredPreviewItem from "../ColoredPreviewItem";
import Header from "../Header";
import BudgetPieChart from "./BudgetPieChart";

async function BudgetsPreview({ userId }: { userId: string }) {
  const fourBiggestBudgets = await fetchFourBiggestBudgets(userId);
  const totalAmount = await fetchTotalAmount(userId);
  const totalLimit = await fetchTotalLimit(userId);

  return (
    <article className="bg-white col-span-1 row-span-2">
      <Header heading="Budgets" linkText="See Details" />
      <div className="h-full w-full grid grid-cols-[1fr_150px]">
        <BudgetPieChart
          fourBiggestBudgets={fourBiggestBudgets}
          totalAmount={totalAmount}
          totalLimit={totalLimit}
        />
        <div className="flex flex-col gap-y-4 justify-center">
          {fourBiggestBudgets.map((budget, index) => (
            <ColoredPreviewItem
              key={budget.id}
              amount={budget.amount}
              limit={budget.limit}
              name={budget.name}
              index={index}
              budget
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default BudgetsPreview;
