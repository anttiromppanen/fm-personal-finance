import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await fetch("http://localhost:3000/api/repopulate-users", {
    method: "POST",
  });
  await page.goto("http://localhost:3000/register");
});

test.describe("Signup", () => {
  test("should allow a user to sign up", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
  });
});
