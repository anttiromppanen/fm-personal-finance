"use server";

import prisma from "@/db/prismaClient";

export async function getBalanceForUser(userId: string) {
  const result = await prisma.balance.findFirst({
    where: {
      userId,
    },
  });

  return result?.amount || 0;
}
