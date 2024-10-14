"use client";

import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { NavLinkNames } from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";
import Link from "next/link";

interface NavLinkProps {
  name: NavLinkNames;
  icon: IconDefinition;
  urlTo: string;
}

const activeLinkSelector = (pathname: string): NavLinkNames => {
  switch (pathname) {
    case "/":
      return "Overview";
    case "/transactions":
      return "Transactions";
    case "/budgets":
      return "Budgets";
    case "/pots":
      return "Pots";
    case "/bills":
      return "Recurring Bills";
    default:
      return "Overview";
  }
};

export function NavLink({ name, icon, urlTo }: NavLinkProps) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={urlTo}
        className={twJoin(
          "group flex flex-col items-center gap-x-5 gap-y-3 rounded-t-2xl py-3 font-medium transition-all duration-100 ease-in-out sm:py-2 lg:flex-row lg:items-start lg:rounded-r-2xl lg:rounded-tl-none lg:py-5",
          activeLinkSelector(pathname) === name &&
            "border border-b-4 border-b-secondaryGreen border-l-secondaryGreen bg-primaryLight text-primaryDark lg:border-b-0 lg:border-l-8",
          activeLinkSelector(pathname) !== name &&
            "hover:bg-primaryDarkGrey/30",
        )}
      >
        <FontAwesomeIcon
          icon={icon}
          className={twJoin(
            "size-5 transition-all duration-100 ease-in-out lg:ml-8 lg:size-6 lg:group-hover:ml-10",
            activeLinkSelector(pathname) === name && "text-secondaryGreen",
          )}
        />
        <p className="hidden text-xs sm:block lg:text-base">{name}</p>
      </Link>
    </li>
  );
}
