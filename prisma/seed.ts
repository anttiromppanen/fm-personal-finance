"use server";

import prisma from "@/db/prismaClient";
import { clearDbExceptUsers } from "@/utils/data/clearDbExceptUsers";
import { mockBalanceData } from "@/utils/data/mockBalanceData";
import { mockBillData } from "@/utils/data/mockBillData";
import { mockBudgetData } from "@/utils/data/mockBudgetData";
import { mockPotData } from "@/utils/data/mockPotsData";
import { mockTransactionData } from "@/utils/data/mockTransactionData";
import { repopulateDbWithUsers } from "@/utils/repopulateDbWithUsers";

async function main() {
  await repopulateDbWithUsers();
  const users = await prisma.user.findMany();

  await clearDbExceptUsers();

  await mockTransactionData(users);
  await mockBalanceData(users);
  await mockBillData(users);
  await mockPotData(users);
  await mockBudgetData(users);
}

main()
  .catch((e) => {
    console.error("Seeding failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
