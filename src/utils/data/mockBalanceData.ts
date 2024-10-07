"use server";

import prisma from "@/db/prismaClient";
import { IBalance } from "@/types";

export const balanceData: Omit<IBalance, "id" | "userId">[] = [
  {
    amount: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 2000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 3000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 4000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 6000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 7000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 8000,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function mockBalanceData(
  userIds: { id: string; email: string }[],
) {
  const randomBalance =
    balanceData[Math.floor(Math.random() * balanceData.length)];

  const balancesToCreate = userIds.map((userId) => {
    return {
      ...randomBalance,
      userId: userId.id,
    };
  });

  try {
    await prisma.balance.createMany({
      data: balancesToCreate,
    });
  } catch (error) {
    console.error("Error creating balances:", error);
  }
}
