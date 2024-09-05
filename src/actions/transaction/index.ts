"use server";

import prisma from "@/db/prismaClient";
import { ITransaction } from "@/types";

export async function fetchAllUserTransactions(userId: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      toUserId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return transactions as ITransaction[];
}

export async function fetchEightUserTransactions(userId: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      toUserId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 8,
  });

  return transactions as ITransaction[];
}

export async function fetchPositiveTransactions(userId: string) {
  const transactions = await prisma.transaction.aggregate({
    where: {
      toUserId: userId,
      amount: {
        gt: 0,
      },
    },
    _sum: {
      amount: true,
    },
  });

  return transactions._sum.amount || 0;
}

export async function fetchNegativeTransactions(userId: string) {
  const transactions = await prisma.transaction.aggregate({
    where: {
      toUserId: userId,
      amount: {
        lt: 0,
      },
    },
    _sum: {
      amount: true,
    },
  });

  return transactions._sum.amount || 0;
}
