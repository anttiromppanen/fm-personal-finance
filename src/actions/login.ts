"use server";

import { parseEmailAndPassword } from "@/helpers/parseEmailAndPassword";
import { loginZSchema } from "@/helpers/zodValidation";
import { IEmailAndPassword } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function login(email: string, password: string, isSeed = false) {
  const supabase = createClient();

  const parsedData = await parseEmailAndPassword(email, password, loginZSchema);

  const { error } = await supabase.auth.signInWithPassword(
    parsedData as IEmailAndPassword,
  );

  if (error) {
    console.error(`supabase login error: ${error.message}`);
    throw new Error(error.message);
  }

  if (isSeed) {
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
