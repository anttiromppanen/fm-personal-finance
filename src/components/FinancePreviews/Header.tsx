import React from "react";

interface HeaderProps {
  heading: string;
  linkText: string;
}

function Header({ heading, linkText }: HeaderProps) {
  return (
    <header className="flex justify-between items-center">
      <h2 className="text-primaryDark font-bold">{heading}</h2>
      <button className="text-primaryDarkGrey text-xs group hover:border-b hover:border-b-primaryDarkGrey">
        <span>{linkText}</span>
        <span className="text-primaryDarkGrey ml-4 group-hover:ml-3">
          &#11208;
        </span>
      </button>
    </header>
  );
}

export default Header;
