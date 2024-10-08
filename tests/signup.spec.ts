import { handleUserCredentialsForm } from "@/helpers/test/testHelpers";
import { signupValidationErrorText } from "@/helpers/zodValidation";
import { usersWithValidCredentials } from "@/utils/data/mockUserData";
import { deleteUserByEmail } from "@/utils/deleteUser";
import { repopulateDbWithUsers } from "@/utils/repopulateDbWithUsers";
import { expect, test } from "@playwright/test";
import { exec, execSync } from "child_process";
import { execOnce } from "next/dist/shared/lib/utils";
import { execArgv } from "process";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/register");
});

test.describe("Signup", () => {
  test("should allow a new user to sign up", async ({ page }) => {
    const uniqueEmail = `testuser${Date.now()}@test.com`;
    const validNewUser = {
      email: uniqueEmail,
      password: "Password123",
    };
    await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();

    await handleUserCredentialsForm(
      page,
      validNewUser.email,
      validNewUser.password,
      "register",
    );

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
      "register",
    );

    await page.waitForLoadState("domcontentloaded");
    await expect(page).toHaveURL("http://localhost:3000/register");
    await expect(page.getByText("User already exists")).toBeVisible();
  });

  test.describe("Validation", () => {
    // Error messages are handled by the default browser popup, cannot test for error text
    test.describe("Email validation", () => {
      test("fails when missing @ symbol", async ({ page }) => {
        const userWithInvalidEmail = {
          email: "plainaddress.com",
          password: "CorrectPassword123",
        };

        await handleUserCredentialsForm(
          page,
          userWithInvalidEmail.email,
          userWithInvalidEmail.password,
          "register",
        );

        await expect(page).toHaveURL("http://localhost:3000/register");
      });

      test("fails when missing username before the @ symbol", async ({
        page,
      }) => {
        const userWithInvalidEmail = {
          email: "@domain.com",
          password: "idealPassword666",
        };

        await handleUserCredentialsForm(
          page,
          userWithInvalidEmail.email,
          userWithInvalidEmail.password,
          "register",
        );

        await expect(page).toHaveURL("http://localhost:3000/register");
      });

      test("fails when missing email address", async ({ page }) => {
        const userWithInvalidEmail = {
          email: "",
          password: "idealPassword666",
        };

        await handleUserCredentialsForm(
          page,
          userWithInvalidEmail.email,
          userWithInvalidEmail.password,
          "register",
        );

        await expect(page).toHaveURL("http://localhost:3000/register");
      });
    });

    /**
     * @Password validation schema
     * - Password must contain at least 6 letters, uppercase characters, lowercase characters, and numbers
     */
    test.describe("Password validation", () => {
      test("fails when password is less than 6 characters", async ({
        page,
      }) => {
        const userWithInvalidPassword = {
          email: "validemail@email.com",
          password: "aBc12",
        };

        await handleUserCredentialsForm(
          page,
          userWithInvalidPassword.email,
          userWithInvalidPassword.password,
          "register",
        );

        await expect(page).toHaveURL("http://localhost:3000/register");
        await expect(page.getByText(signupValidationErrorText)).toBeVisible();
      });

      test("fails when password does not contain uppercase characters", async ({
        page,
      }) => {
        const userWithInvalidPassword = {
          email: "validemail@email.com",
          password: "abcdef123",
        };

        await handleUserCredentialsForm(
          page,
          userWithInvalidPassword.email,
          userWithInvalidPassword.password,
          "register",
        );

        await expect(page).toHaveURL("http://localhost:3000/register");
        await expect(page.getByText(signupValidationErrorText)).toBeVisible();
      });

      test("fails when password does not contain lowercase characters", async ({
        page,
      }) => {
        const userWithInvalidPassword = {
          email: "validemail@email.com",
          password: "ABCDEF123",
        };

        await handleUserCredentialsForm(
          page,
          userWithInvalidPassword.email,
          userWithInvalidPassword.password,
          "register",
        );

        await expect(page).toHaveURL("http://localhost:3000/register");
        await expect(page.getByText(signupValidationErrorText)).toBeVisible();
      });
    });
  });
});
