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
          "py-5 flex gap-x-5 rounded-r-2xl font-medium group transition-all ease-in-out duration-100",
          activeLinkSelector(pathname) === name &&
            "bg-primaryLight text-primaryDark border border-l-8 border-l-secondaryGreen",
          activeLinkSelector(pathname) !== name &&
            "hover:bg-primaryDarkGrey/30",
        )}
      >
        <FontAwesomeIcon
          icon={icon}
          className={twJoin(
            "size-6 ml-8 group-hover:ml-10 transition-all ease-in-out duration-100",
            activeLinkSelector(pathname) === name && "text-secondaryGreen",
          )}
        />
        <p>{name}</p>
      </Link>
    </li>
  );
}
