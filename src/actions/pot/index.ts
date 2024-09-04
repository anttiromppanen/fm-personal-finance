"use server";

import prisma from "@/db/prismaClient";

export async function fetchFirstFourPots() {
  const pots = await prisma.pot.findMany({
    take: 4,
  });

  return pots;
}

export async function fetchTotalSumOfPots() {
  const pots = await prisma.pot.aggregate({
    _sum: {
      amount: true,
    },
  });

  return pots._sum.amount || 0;
}
