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
    case "/recurring-bills":
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
          "py-3 sm:py-2 lg:py-5 flex flex-col gap-y-3 lg:flex-row items-center lg:items-start gap-x-5 rounded-t-2xl lg:rounded-tl-none lg:rounded-r-2xl font-medium group transition-all ease-in-out duration-100",
          activeLinkSelector(pathname) === name &&
            "bg-primaryLight text-primaryDark border border-b-4 lg:border-l-8 border-l-secondaryGreen border-b-secondaryGreen lg:border-b-0",
          activeLinkSelector(pathname) !== name &&
            "hover:bg-primaryDarkGrey/30",
        )}
      >
        <FontAwesomeIcon
          icon={icon}
          className={twJoin(
            "size-5 lg:size-6 lg:ml-8 lg:group-hover:ml-10 transition-all ease-in-out duration-100",
            activeLinkSelector(pathname) === name && "text-secondaryGreen",
          )}
        />
        <p className="hidden sm:block text-xs lg:text-base">{name}</p>
      </Link>
    </li>
  );
}
