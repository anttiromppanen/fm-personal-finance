import { NavLink } from "./NavLink";
import {
  faHouse,
  faArrowRightArrowLeft,
  faChartPie,
  faSackDollar,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";

export type NavLinkNames =
  | "Overview"
  | "Transactions"
  | "Budgets"
  | "Pots"
  | "Recurring Bills";

const links: { name: NavLinkNames; urlTo: string }[] = [
  { name: "Overview", urlTo: "/" },
  { name: "Transactions", urlTo: "/transactions" },
  { name: "Budgets", urlTo: "/" },
  { name: "Pots", urlTo: "/" },
  { name: "Recurring Bills", urlTo: "/" },
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

function Sidenav() {
  return (
    <aside
      className="
      bg-primaryDark text-primaryLightGrey lg:pr-8 lg:min-h-screen fixed w-full lg:w-auto z-50 bottom-0 left-0 lg:relative rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl
      pt-2 px-4 lg:pl-0 lg:pt-0 
      "
    >
      <div className="sticky left-0 top-7">
        <p className="text-4xl font-serif text-primaryLight pl-8 tracking-wide hidden lg:block">
          finance
        </p>
        <ul className="lg:mt-14 font-arabic grid grid-cols-5 lg:flex flex-col">
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
