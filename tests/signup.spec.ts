import { handleUserCredentialsForm } from "@/helpers/test/testHelpers";
import { usersWithValidCredentials } from "@/utils/data/mockUserData";
import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await fetch("http://localhost:3000/api/repopulate-users", {
    method: "POST",
  });
  await page.goto("http://localhost:3000/register");
});

test.afterAll(async () => {
  await fetch("http://localhost:3000/api/repopulate-users", {
    method: "POST",
  });
});

test.describe("Signup", () => {
  test("should allow a new user to sign up", async ({ page }) => {
    const validNewUser = {
      email: "testuser666@test.com",
      password: "Password123",
    };
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();

    await handleUserCredentialsForm(
      page,
      validNewUser.email,
      validNewUser.password,
      "signup",
    );

    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();

    await page.click("text=Logout");
  });

  test("should show an error message if the email is already in use", async ({
    page,
  }) => {
    const registeredUser = usersWithValidCredentials[0];
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();

    await handleUserCredentialsForm(
      page,
      registeredUser.email,
      registeredUser.password,
      "signup",
    );

    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("http://localhost:3000/register");
    await expect(page.getByText("User already exists")).toBeVisible();
  });
});
