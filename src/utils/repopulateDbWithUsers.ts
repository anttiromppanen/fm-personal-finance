"use server";

import { deleteAllUsers } from "@/actions/deleteUsers";
import { signup } from "@/actions/signup";
import { usersWithValidCredentials } from "@/utils/data/mockUserData";

export async function repopulateDbWithUsers() {
  await deleteAllUsers();

  try {
    await Promise.all(
      usersWithValidCredentials.map(
        async ({ email, password }) => await signup(email, password, true),
      ),
    );
  } catch (error) {
    console.error(error);
  }
}
