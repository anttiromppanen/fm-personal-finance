import { expect, test } from "@playwright/test";

test.describe("Login", () => {
  test("should initially be redirected to /login", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page).toHaveURL("http://localhost:3000/login");
  });
});
