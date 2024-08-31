"use server";

import prisma from "@/db/prismaClient";

export async function clearDbExceptUsers() {
  await Promise.all([
    prisma.transaction.deleteMany(),
    prisma.balance.deleteMany(),
    prisma.budget.deleteMany(),
    prisma.bill.deleteMany(),
    prisma.pot.deleteMany(),
  ]);
}
