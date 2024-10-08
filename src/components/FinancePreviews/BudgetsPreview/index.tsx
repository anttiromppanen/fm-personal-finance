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
    <article className="bg-white xl:col-span-1 xl:row-span-2">
      <Header heading="Budgets" linkText="See Details" />
      <div className="h-full w-full grid min-h-96 lg:h-fit lg:grid-rows-[1fr_100px] xl:grid-rows-1 xl:grid-cols-[1fr_100px] gap-x-4">
        <BudgetPieChart
          fourBiggestBudgets={fourBiggestBudgets}
          totalAmount={totalAmount}
          totalLimit={totalLimit}
        />
        <div className="grid grid-cols-4 xl:flex xl:flex-col gap-y-4 items-center xl:items-start justify-center xl:justify-center">
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
