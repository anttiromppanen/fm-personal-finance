import { SmallCurrencyText } from "@/components/CurrencyText";
import { parseDate } from "@/helpers/parseDate";
import Image from "next/image";

function TransactionPreview({
  amount,
  fromName,
  createdAt,
  index,
}: {
  amount: number;
  fromName: string;
  createdAt: Date;
  index: number;
}) {
  return (
    <article
      aria-label={`Transaction of ${Math.abs(amount)} US Dollars ${amount >= 0 ? "from" : "to"} ${fromName}`}
      className="flex justify-between items-center"
    >
      <div className="flex gap-x-4 items-center">
        <Image
          src={`/img/avatar${index + 1}.jpeg`}
          alt={fromName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <strong className="text-xs -mb-1">{fromName}</strong>
      </div>
      <div className="flex flex-col items-end gap-y-2">
        <div
          className={`flex items-center
                    ${amount >= 0 && "text-green-600"}
                  `}
        >
          <span>{amount >= 0 ? "+" : "-"}</span>
          <SmallCurrencyText amount={Math.abs(amount)} />
        </div>
        <p className="text-xs text-primaryDarkGrey">{parseDate(createdAt)}</p>
      </div>
    </article>
  );
}

export default TransactionPreview;
