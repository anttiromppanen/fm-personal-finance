import { handleUserCredentialsForm } from "@/helpers/test/testHelpers";
import { balanceData } from "@/utils/data/mockBalanceData";
import { billData } from "@/utils/data/mockBillData";
import { budgetData } from "@/utils/data/mockBudgetData";
import { potsData } from "@/utils/data/mockPotsData";
import { transactionData } from "@/utils/data/mockTransactionData";
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

  test.describe("After successful login", () => {
    test.beforeEach(async ({ page }) => {
      const validUser = usersWithValidCredentials[0];
      await page.goto("http://localhost:3000/login");

      await handleUserCredentialsForm(
        page,
        validUser.email,
        validUser.password,
        "login",
      );

      await expect(page).toHaveURL("http://localhost:3000/");
      await expect(
        page.getByRole("heading", { name: "Overview" }),
      ).toBeVisible();
    });

    test("should return correct user data from database", async ({ page }) => {
      const mockBalanceData = balanceData;
      const mockBillData = billData;
      const mockBudgetData = budgetData;
      const mockPotsData = potsData;
      const mockTransactionData = transactionData;

      // All mock balance amounts as string
      const balanceAmounts = mockBalanceData.map((balance) =>
        balance.amount.toString(),
      );

      //  Calculate user income
      const positiveTransactionsTotal = mockTransactionData
        .filter((transaction) => transaction.amount > 0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

      // Calculate user expenses
      const negativeTransactionsTotal = Math.abs(
        mockTransactionData
          .filter((transaction) => transaction.amount < 0)
          .reduce((acc, transaction) => acc + transaction.amount, 0),
      );

      const userBalanceAmountComponent = page
        .getByTestId("balance")
        .getByTestId("amount");

      const userIncomeAmountComponent = page
        .getByTestId("income")
        .getByTestId("amount");

      const userExpensesAmountComponent = page
        .getByTestId("expenses")
        .getByTestId("amount");

      const userBalance = await userBalanceAmountComponent.textContent();

      // Check if the user balance is one of the mock balance amounts
      expect(balanceAmounts).toContain(userBalance);

      await expect(userIncomeAmountComponent).toHaveText(
        positiveTransactionsTotal.toString(),
      );

      await expect(userExpensesAmountComponent).toHaveText(
        negativeTransactionsTotal.toString(),
      );
    });
  });
});
