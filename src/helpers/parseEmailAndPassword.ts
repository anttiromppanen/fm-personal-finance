import { z } from "zod";

export async function parseEmailAndPassword(
  email: string,
  password: string,
  zSchema: z.ZodObject<any, any>,
) {
  const parseResult = zSchema.safeParse({
    email,
    password,
  });

  if (!parseResult.success) {
    console.error(`zod error: ${parseResult.error}`);
    throw new Error(parseResult.error.errors[0].message);
  }

  return parseResult.data;
}
