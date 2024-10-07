import { handleUserCredentialsForm } from "@/helpers/test/testHelpers";
import { usersWithValidCredentials } from "@/utils/data/mockUserData";
import { expect, Page, test } from "@playwright/test";

test.describe("Login", () => {
  test("should initially be redirected to /login", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page).toHaveURL("http://localhost:3000/login");
  });

  test("should allow a user to login", async ({ page }) => {
    const validUser = usersWithValidCredentials[0];
    await page.goto("http://localhost:3000/login");

    await handleUserCredentialsForm(
      page,
      validUser.email,
      validUser.password,
      "login",
    );

    await expect(page).toHaveURL("http://localhost:3000/");
    await expect(page.getByRole("heading", { name: "Overview" })).toBeVisible();
  });

  test("should show an error message if the email is not registered", async ({
    page,
  }) => {
    const notRegisteredUser = {
      email: "iamnotregistered@test.com",
      password: "TestPassword1515",
    };
    await page.goto("http://localhost:3000/login");

    await handleUserCredentialsForm(
      page,
      notRegisteredUser.email,
      notRegisteredUser.password,
      "login",
    );

    await expect(page).toHaveURL("http://localhost:3000/login");
    await expect(page.getByText("Invalid login credentials")).toBeVisible();
  });

  // Fields use the default validation popups, so we can't test the error message
  test.describe("Email validation", () => {
    test("fails when missing @ symbol", async ({ page }) => {
      const userWithInvalidEmail = {
        email: "plainaddress.com",
        password: "CorrectPassword123",
      };
      await page.goto("http://localhost:3000/login");

      await handleUserCredentialsForm(
        page,
        userWithInvalidEmail.email,
        userWithInvalidEmail.password,
        "login",
      );

      await expect(page).toHaveURL("http://localhost:3000/login");
    });

    test("fails when missing username before the @ symbol", async ({
      page,
    }) => {
      const userWithInvalidEmail = {
        email: "@domain.com",
        password: "idealPassword666",
      };
      await page.goto("http://localhost:3000/login");

      await handleUserCredentialsForm(
        page,
        userWithInvalidEmail.email,
        userWithInvalidEmail.password,
        "login",
      );

      await expect(page).toHaveURL("http://localhost:3000/login");
    });

    test("fails when missing email address", async ({ page }) => {
      const userWithInvalidEmail = {
        email: "",
        password: "idealPassword666",
      };
      await page.goto("http://localhost:3000/login");

      await handleUserCredentialsForm(
        page,
        userWithInvalidEmail.email,
        userWithInvalidEmail.password,
        "login",
      );

      await expect(page).toHaveURL("http://localhost:3000/login");
    });
  });
});
