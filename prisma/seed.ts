"use server";

import prisma from "@/db/prismaClient";
import { clearDbExceptUsers } from "@/utils/data/clearDbExceptUsers";
import { mockBalanceData } from "@/utils/data/mockBalanceData";
import { mockTransactionData } from "@/utils/data/mockTransactionData";

async function main() {
  const users = await prisma.user.findMany();

  await clearDbExceptUsers();

  await mockTransactionData(users);
  await mockBalanceData(users);
}

main()
  .catch((e) => {
    console.error("Seeding failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
