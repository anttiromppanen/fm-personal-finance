"use server";

import prisma from "@/db/prismaClient";
import { createClient } from "@/utils/supabase/client";

export async function deleteAllUsersFromPublic() {
  try {
    await prisma.user.deleteMany();
  } catch (error) {
    console.error(`deleteAllUsersFromPublic error: ${error}`);
    throw new Error(error as string);
  }
}

export async function deleteAllUsersFromAuth() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    console.error(`deleteAllUsersFromAuth fetch users error: ${error.message}`);
    throw new Error(error.message);
  }

  if (data?.users && data.users.length) {
    try {
      const deletionPromises = data.users.map((user) =>
        supabase.auth.admin.deleteUser(user.id),
      );

      await Promise.all(deletionPromises);
    } catch (error) {
      console.error(`deleteAllUsersFromAuth delete users error: ${error}`);
      throw new Error((error as Error).message);
    }
  }
}

export async function deleteAllUsers() {
  await deleteAllUsersFromPublic();
  await deleteAllUsersFromAuth();
}
