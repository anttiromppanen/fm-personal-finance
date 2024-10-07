import { Page } from "@playwright/test";

export async function handleUserCredentialsForm(
  page: Page,
  email: string,
  password: string,
  formType: "signup" | "login",
) {
  const buttonText = formType === "signup" ? "Sign up" : "Log In";

  const emailField = page.getByPlaceholder("Enter email address");
  const passwordField = page.getByPlaceholder("Password");
  const submitButton = page.getByRole("button", { name: buttonText });

  await emailField.fill(email);
  await passwordField.fill(password);
  await submitButton.click();
}
