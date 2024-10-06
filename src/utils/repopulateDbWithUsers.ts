"use server";

import { deleteAllUsers } from "@/actions/deleteUsers";
import { signup } from "@/actions/signup";
import { usersWithValidCredentials } from "@/utils/data/mockUserData";

/**
 * Repopulate the database with users.
 *  - Deletes all users from Users table.
 *  - Deletes all users from Auth table.
 *  - Creates new users with valid credentials.
 *
 */

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
