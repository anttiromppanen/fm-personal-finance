"use server";

import prisma from "@/db/prismaClient";

export async function fetchFiveUserBills(userId: string) {
  return await prisma.bill.findMany({
    where: {
      userId,
    },
    take: 5,
  });
}
