import { SmallCurrencyText } from "@/components/CurrencyText";

interface PotPreviewProps {
  name: string;
  amount: number;
  index: number;
}

const borderColors = [
  "border-l-secondaryGreen",
  "border-l-secondaryTeal",
  "border-l-primaryDarkGrey",
  "border-l-secondaryBrown",
  "border-l-primaryDark",
  "border-l-primaryLightGrey",
];

function PotPreview({ name, amount, index }: PotPreviewProps) {
  return (
    <div className={borderColors[index]}>
      <div className="ml-4 flex flex-col gap-y-2">
        <h3 className="text-[10px] text-primaryDarkGrey">{name}</h3>
        <SmallCurrencyText amount={amount} />
      </div>
    </div>
  );
}

export default PotPreview;
