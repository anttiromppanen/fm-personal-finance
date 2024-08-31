"use server";

import prisma from "@/db/prismaClient";
import { ITransaction } from "@/types";

export async function fetchAllUserTransactions(userId: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      toUserId: userId,
    },
  });

  return transactions as ITransaction[];
}

export async function fetchFiveUserTransactions(userId: string) {
  const transactions = await prisma.transaction.findMany({
    where: {
      toUserId: userId,
    },
    take: 5,
  });

  return transactions as ITransaction[];
}
