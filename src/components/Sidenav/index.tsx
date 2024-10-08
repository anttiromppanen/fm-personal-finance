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
    <aside className="bg-primaryDark text-primaryLightGrey pr-8 min-h-screen relative rounded-r-2xl">
      <div className="sticky left-0 top-7 rounded-r-2xl">
        <p className="text-4xl font-serif text-primaryLight pl-8 tracking-wide">
          finance
        </p>
        <ul className="mt-14 font-arabic">
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
