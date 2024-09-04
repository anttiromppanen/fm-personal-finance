import ExpensePreviews from "@/components/ExpensePreviews";
import FinancePreviews from "@/components/FinancePreviews";
import LogoutBtn from "@/components/LogoutBtn";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <div className="mt-10">
      <header className="flex justify-between">
        <h1 className="heading-lg">Overview</h1>
        <LogoutBtn />
      </header>
      <main>
        <ExpensePreviews userId={data.user.id} />
        <FinancePreviews />
      </main>
    </div>
  );
}
