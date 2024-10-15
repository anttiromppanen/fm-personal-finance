import { createClient } from "@/utils/supabase/server";
import {
  faArrowRightArrowLeft,
  faChartPie,
  faHouse,
  faMoneyBillTransfer,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "./NavLink";
import { twJoin, twMerge } from "tailwind-merge";

export type NavLinkNames =
  | "Overview"
  | "Transactions"
  | "Budgets"
  | "Pots"
  | "Recurring Bills";

const links: { name: NavLinkNames; urlTo: string }[] = [
  { name: "Overview", urlTo: "/" },
  { name: "Transactions", urlTo: "/transactions" },
  { name: "Budgets", urlTo: "/budgets" },
  { name: "Pots", urlTo: "/pots" },
  { name: "Recurring Bills", urlTo: "/bills" },
];

const navLinkIconSelector = (name: NavLinkNames) => {
  switch (name) {
    case "Overview":
      return faHouse;
    case "Transactions":
      return faArrowRightArrowLeft;
    case "Budgets":
      return faChartPie;
    case "Pots":
      return faSackDollar;
    case "Recurring Bills":
      return faMoneyBillTransfer;
  }
};

async function Sidenav() {
  const supabase = createClient();

  // Add error handling later
  const { data } = await supabase.auth.getUser();

  return (
    <aside
      className={twMerge(
        `fixed bottom-0 left-0 z-50 hidden w-full rounded-t-2xl bg-primaryDark px-4 pt-2 text-primaryLightGrey lg:relative lg:min-h-screen lg:w-auto lg:rounded-r-2xl lg:rounded-tl-none lg:pl-0 lg:pr-8 lg:pt-0`,
        data.user && "block",
      )}
    >
      <div className="sticky left-0 top-7">
        <p className="hidden pl-8 font-serif text-4xl tracking-wide text-primaryLight lg:block">
          finance
        </p>
        <ul className="grid grid-cols-5 flex-col font-arabic lg:mt-14 lg:flex">
          {links.map(({ name, urlTo }) => (
            <NavLink
              key={name}
              name={name}
              icon={navLinkIconSelector(name)}
              urlTo={urlTo}
            />
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidenav;
