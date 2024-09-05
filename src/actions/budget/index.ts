"use server";

import prisma from "@/db/prismaClient";

export async function fetchTotalLimit(userId: string) {
  const budgets = await prisma.budget.aggregate({
    where: {
      userId,
    },
    _sum: {
      limit: true,
    },
  });

  return budgets._sum.limit || 0;
}

export async function fetchTotalAmount(userId: string) {
  const budgets = await prisma.budget.aggregate({
    where: {
      userId,
    },
    _sum: {
      amount: true,
    },
  });

  return budgets._sum.amount || 0;
}

export async function fetchFourBiggestBudgets(userId: string) {
  const budgets = await prisma.budget.findMany({
    take: 4,
    where: {
      userId,
    },
    orderBy: {
      limit: "desc",
    },
  });

  return budgets;
}
