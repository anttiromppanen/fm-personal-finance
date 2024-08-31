"use server";

import prisma from "@/db/prismaClient";
import { ITransaction } from "@/types";

// set userId field from user id
const transactionData: Omit<ITransaction, "id" | "toUserId">[] = [
  {
    amount: 100,
    message: "Mock message 1",
    fromName: "Jack Bauer",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 200,
    message: "Mock message 2",
    fromName: "Johnny Cash",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 300,
    message: "Mock message 3",
    fromName: "Bob Marley",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 400,
    message: "Mock message 4",
    fromName: "Sting",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 500,
    message: "Mock message 5",
    fromName: "Arnold Schwarzenegger",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 600,
    message: "Mock message 6",
    fromName: "Neo",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 700,
    message: "Mock message 7",
    fromName: "Miley Cyrus",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 800,
    message: "Mock message 8",
    fromName: "John Travolta",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 900,
    message: "Mock message 9",
    fromName: "Ric Flair",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    amount: 1000,
    message: "Mock message 10",
    fromName: "Singer of the band Queen",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function mockTransactionData(
  userIds: { id: string; email: string }[],
) {
  const transactionsToCreate = userIds.flatMap((userId) => {
    // Map through each transaction and add the toUserId for each user
    return transactionData.map((transaction) => ({
      ...transaction,
      toUserId: userId.id, // Assign the user ID to the transaction
    }));
  });

  // Insert transactions into your database (example using Prisma)
  try {
    await prisma.transaction.createMany({
      data: transactionsToCreate,
    });
    console.log("Transactions created successfully");
  } catch (error) {
    console.error("Error creating transactions:", error);
  }
}
