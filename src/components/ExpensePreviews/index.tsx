import { getBalanceForUser } from "@/actions/balance";
import {
  fetchNegativeTransactions,
  fetchPositiveTransactions,
} from "@/actions/transaction";
import { LargeCurrencyText } from "../CurrencyText";

interface ExpenseModuleProps {
  heading: string;
  amount: number;
  testId?: string;
}

function ExpenseModule({ amount, heading, testId }: ExpenseModuleProps) {
  return (
    <article
      data-testid={testId}
      className="bg-white rounded-xl px-8 py-6 flex flex-col justify-between gap-y-4"
    >
      <h2 className="text-primaryDarkGrey text-sm">{heading}</h2>
      <LargeCurrencyText amount={amount} />
    </article>
  );
}

async function ExpensePreviews({ userId }: { userId: string }) {
  const balance = await getBalanceForUser(userId);
  const positiveTransactions = await fetchPositiveTransactions(userId);
  const negativeTransactions = await fetchNegativeTransactions(userId);

  return (
    <section className="grid grid-cols-3 gap-x-8 mt-10">
      <ExpenseModule
        testId="balance"
        amount={balance}
        heading="Current Balance"
      />
      <ExpenseModule
        testId="income"
        amount={positiveTransactions}
        heading="Income"
      />
      <ExpenseModule
        testId="expenses"
        amount={Math.abs(negativeTransactions)}
        heading="Expenses"
      />
    </section>
  );
}

export default ExpensePreviews;
