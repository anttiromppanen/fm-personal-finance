import prisma from "@/db/prismaClient";
import { IBudget } from "@/types";

export const budgetData: Omit<IBudget, "id" | "userId">[] = [
  {
    name: "Groceries",
    amount: 200,
    limit: 300,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Rent",
    amount: 1000,
    limit: 1200,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Entertainment",
    amount: 100,
    limit: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Transport",
    amount: 50,
    limit: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Utilities",
    amount: 100,
    limit: 150,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Health",
    amount: 50,
    limit: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function mockBudgetData(userIds: { id: string; email: string }[]) {
  const budgetsToCreate = userIds.flatMap((userId) => {
    // Map through each transaction and add the toUserId for each user
    return budgetData.map((budget) => ({
      ...budget,
      userId: userId.id, // Assign the user ID to the transaction
    }));
  });

  // Insert transactions into your database (example using Prisma)
  try {
    await prisma.budget.createMany({
      data: budgetsToCreate,
    });
  } catch (error) {
    console.error("Error creating transactions:", error);
  }
}
