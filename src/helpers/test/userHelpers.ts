"use server";

import prisma from "@/db/prismaClient";

export async function getAllUsersById() {
  const users = await prisma.user.findMany();
  return users.map((x) => x.id);
}
