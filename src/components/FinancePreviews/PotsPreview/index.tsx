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
    <article className="row-span-1 col-span-1 bg-white">
      <Header heading="Pots" linkText="See Details" />
      <div className="grid xl:grid-cols-2 gap-x-4 gap-y-4 xl:gap-y-0 mt-6">
        <div className="flex bg-primaryLight gap-x-6 items-center rounded-xl p-4 xl:p-6 col-span-1">
          <FontAwesomeIcon
            icon={faSackDollar}
            className="size-8 text-green-500"
          />
          <div className="flex flex-col justify-between gap-y-2">
            <h3 className="text-xs text-primaryDarkGrey">Total Saved</h3>
            <LargeCurrencyText amount={totalSum} />
          </div>
        </div>
        <div className="grid xl:grid-rows-2 grid-cols-4 xl:grid-cols-2 gap-4 py-1">
          {potsPreviews.map((pot, index) => (
            <ColoredPreviewItem key={pot.id} {...pot} index={index} />
          ))}
        </div>
      </div>
    </article>
  );
}

export default PotsPreview;
