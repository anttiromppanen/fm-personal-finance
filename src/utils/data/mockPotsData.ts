"use server";

import prisma from "@/db/prismaClient";
import { IPot } from "@/types";

export const potsData: Omit<IPot, "id" | "userId">[] = [
  {
    name: "Savings",
    amount: 159,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Gift",
    amount: 40,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Concert Ticket",
    amount: 110,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "New Laptop",
    amount: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Vacation",
    amount: 200,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Emergency",
    amount: 50,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "New Car",
    amount: 100,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "New Phone",
    amount: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function mockPotData(userIds: { id: string; email: string }[]) {
  const potsToCreate = userIds.flatMap((userId) => {
    // Map through each transaction and add the toUserId for each user
    return potsData.map((pot) => ({
      ...pot,
      userId: userId.id, // Assign the user ID to the transaction
    }));
  });

  // Insert transactions into your database (example using Prisma)
  try {
    await prisma.pot.createMany({
      data: potsToCreate,
    });
  } catch (error) {
    console.error("Error creating transactions:", error);
  }
}
