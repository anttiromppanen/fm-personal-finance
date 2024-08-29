"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/utils/supabase/server";
import prisma from "@/db/prismaClient";

export async function login(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email");
  const password = formData.get("password");

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  const email = formData.get("email");
  const password = formData.get("password");
  const zodErrorMsg =
    "Password must contain at least 6 letters, uppercase characters, lowercase characters, and numbers";

  const zSchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .min(6, zodErrorMsg)
      .regex(/[a-z]/, zodErrorMsg)
      .regex(/[A-Z]/, zodErrorMsg)
      .regex(/\d/, zodErrorMsg),
  });

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const parseResult = zSchema.safeParse({
    email,
    password,
  });

  if (!parseResult.success) {
    console.error(`zod error: ${parseResult.error}`);
    throw new Error(parseResult.error.errors[0].message);
  }

  const { error, data: savedData } = await supabase.auth.signUp(
    parseResult.data,
  );

  if (error) {
    console.error(`supabase error: ${error}`);
    throw new Error(error.message);
  }

  try {
    await prisma.user.create({
      data: {
        id: savedData?.user?.id as string,
      },
    });
  } catch (error) {
    console.error(error);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
