"use server";

import prisma from "@/db/prismaClient";
import { IBill } from "@/types";

export const billData: Omit<IBill, "id" | "userId">[] = [
  {
    name: "Rent",
    amount: 1000,
    paid: false,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Electricity",
    amount: 2000,
    paid: true,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Gas",
    amount: 3000,
    paid: false,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Water",
    amount: 4000,
    paid: true,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Internet",
    amount: 5000,
    paid: false,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Phone",
    amount: 6000,
    paid: true,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Insurance",
    amount: 7000,
    paid: true,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: "Subscription",
    amount: 8000,
    paid: false,
    dueDate: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function mockBillData(userIds: { id: string; email: string }[]) {
  const billsToCreate = userIds.flatMap((userId) => {
    return billData.map((bill) => {
      return {
        ...bill,
        userId: userId.id,
      };
    });
  });

  try {
    await prisma.bill.createMany({
      data: billsToCreate,
    });
  } catch (error) {
    console.error("Error creating bills:", error);
  }
}
