import { z } from "zod";

export const signupValidationErrorText =
  "Password must contain at least 6 letters, uppercase characters, lowercase characters, and numbers";

export const signupZSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, signupValidationErrorText)
    .regex(/[a-z]/, signupValidationErrorText)
    .regex(/[A-Z]/, signupValidationErrorText)
    .regex(/\d/, signupValidationErrorText),
});

export const loginValidationErrorText = "Invalid credentials";

export const loginZSchema = z.object({
  email: z.string().email(loginValidationErrorText),
  password: z
    .string()
    .min(6, loginValidationErrorText)
    .regex(/[a-z]/, loginValidationErrorText)
    .regex(/[A-Z]/, loginValidationErrorText)
    .regex(/\d/, loginValidationErrorText),
});
