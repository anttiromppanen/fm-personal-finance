"use server";

import { repopulateDbWithUsers } from "@/utils/repopulateDbWithUsers";
import { NextResponse } from "next/server";

/**
 * Endpoint to repopulate the database with users. Especially useful for testing.
 */

export async function POST() {
  try {
    await repopulateDbWithUsers();
    return NextResponse.json(
      { message: "Database repopulated successfully" },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to repopulate database" },
      { status: 500 },
    );
  }
}
