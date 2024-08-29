import React from "react";

function PotsPreview() {
  return (
    <article className="row-span-1 col-span-1 bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-primaryDark text-sm font-bold">Pots</h2>
        <button className="text-primaryDarkGrey text-xs">See Details </button>
      </div>
      <div className="grid grid-cols-2 gap-x-4">
        <div className="flex bg-primaryLight rounded-xl p-6 col-span-1">
          <div className="flex flex-col justify-between gap-y-2">
            <h3>Total Saved</h3>
            <p>$850</p>
          </div>
        </div>
        <div className="grid grid-rows-2 grid-cols-2 gap-4 *:border-l-4 py-1">
          <div className="border-l-secondaryGreen">1</div>
          <div className="border-l-secondaryTeal">2</div>
          <div className="border-l-primaryDarkGrey">3</div>
          <div className="border-l-secondaryBrown">4</div>
        </div>
      </div>
    </article>
  );
}

export default PotsPreview;
