"use server";

import prisma from "@/db/prismaClient";
import { parseEmailAndPassword } from "@/helpers/parseEmailAndPassword";
import { signupZSchema } from "@/helpers/zodValidation";
import { IEmailAndPassword } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signup(email: string, password: string, isSeed = false) {
  const supabase = createClient();
  const parseResult = await parseEmailAndPassword(
    email,
    password,
    signupZSchema,
  );

  const { error, data: savedData } = await supabase.auth.signUp(
    parseResult as IEmailAndPassword,
  );

  if (error) {
    console.error(`supabase error: ${error}`);
    throw new Error(error.message);
  }

  try {
    await prisma.user.create({
      data: {
        id: savedData?.user?.id as string,
        email,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user in database");
  }

  if (isSeed) {
    return;
  }

  revalidatePath("/", "layout");
  redirect("/");
}
