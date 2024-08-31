"use client";

import { logout } from "@/actions/logout";

function LogoutBtn() {
  return (
    <button
      type="button"
      onClick={async () => await logout()}
      className="bg-white py-3 px-5 rounded-lg text-xs text-primaryDark font-semibold tracking-widest"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
