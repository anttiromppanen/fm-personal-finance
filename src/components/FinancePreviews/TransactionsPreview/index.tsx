import { fetchEightUserTransactions } from "@/actions/transaction";
import { SmallCurrencyText } from "@/components/CurrencyText";
import { parseDate } from "@/helpers/parseDate";
import Image from "next/image";
import Header from "../Header";
import TransactionPreview from "./TransactionPreview";

async function TransactionsPreview({ userId }: { userId: string }) {
  const eightTransactions = await fetchEightUserTransactions(userId);

  return (
    <section className="bg-white col-span-1 row-span-3">
      <Header heading="Transactions" linkText="View All" />
      <ul className="mt-8">
        {eightTransactions.map((transaction, index) => (
          <li key={transaction.id} className="py-3 border-b last:border-b-0">
            <TransactionPreview {...transaction} index={index} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TransactionsPreview;
