import { fetchFiveUserBills } from "@/actions/bill";
import Header from "../Header";
import { SmallCurrencyText } from "@/components/CurrencyText";
import { tailwindBorderColors } from "@/utils/colors";

async function BillsPreview({ userId }: { userId: string }) {
  const fiveBills = await fetchFiveUserBills(userId);

  return (
    <section className="bg-white xl:col-span-1 xl:row-span-2">
      <Header heading="Bills" linkText="See Details" />
      <ul className="mt-8 flex flex-col gap-y-4">
        {fiveBills.map((bill, index) => (
          <li key={bill.id}>
            <article
              className={`flex justify-between items-center px-4 py-6 bg-primaryLight rounded-xl border-l-4 ${tailwindBorderColors[index]}`}
            >
              <h3 className="text-primaryDarkGrey text-sm">{bill.name}</h3>
              <SmallCurrencyText amount={bill.amount} />
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default BillsPreview;
