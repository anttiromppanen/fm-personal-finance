import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import LogoutBtn from "@/components/LogoutBtn";

export default async function PrivatePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col items-center gap-y-4 mt-10">
      <p>Hello {data.user.email}</p>
      <LogoutBtn />
    </div>
  );
}
