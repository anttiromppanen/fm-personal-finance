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
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();

    const emailFiend = page.getByPlaceholder("Enter email address");
    const passwordField = page.getByPlaceholder("Password");
    const submitButton = page.getByRole("button", { name: "Sign up" });

    await emailFiend.fill("testuser666@test.com");
    await passwordField.fill("Password123");
    await submitButton.click();

    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();

    await page.click("text=Logout");
  });

  test("should show an error message if the email is already in use", async ({
    page,
  }) => {
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();

    const emailFiend = page.getByPlaceholder("Enter email address");
    const passwordField = page.getByPlaceholder("Password");
    const submitButton = page.getByRole("button", { name: "Sign up" });

    const registeredUser = usersWithValidCredentials[0];

    await emailFiend.fill(registeredUser.email);
    await passwordField.fill(registeredUser.password);
    await submitButton.click();

    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("http://localhost:3000/register");
    await expect(page.getByText("User already exists")).toBeVisible();
  });
});
