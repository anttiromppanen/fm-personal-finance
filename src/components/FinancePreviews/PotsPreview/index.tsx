import { fetchFirstFourPots, fetchTotalSumOfPots } from "@/actions/pot";
import { LargeCurrencyText } from "@/components/CurrencyText";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ColoredPreviewItem from "../ColoredPreviewItem";
import Header from "../Header";

async function PotsPreview() {
  const totalSum = await fetchTotalSumOfPots();
  const potsPreviews = await fetchFirstFourPots();

  return (
    <article className="bg-white xl:col-span-1 xl:row-span-1">
      <Header heading="Pots" linkText="See Details" />
      <div className="mt-6 grid gap-x-4 gap-y-4 xl:grid-cols-2 xl:gap-y-0">
        <div className="col-span-1 flex items-center gap-x-6 rounded-xl bg-primaryLight p-6 lg:p-4 xl:p-6">
          <FontAwesomeIcon
            icon={faSackDollar}
            className="size-8 text-green-500"
          />
          <div className="flex flex-col justify-between gap-y-4 lg:gap-y-2">
            <h3 className="text-xs text-primaryDarkGrey">Total Saved</h3>
            <LargeCurrencyText amount={totalSum} />
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 py-1 xl:grid-cols-2 xl:grid-rows-2">
          {potsPreviews.map((pot, index) => (
            <ColoredPreviewItem key={pot.id} {...pot} index={index} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default PotsPreview;
