import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import envConfig from "../envConfig";

/**
 * Create a Supabase client
 * @returns Supabase client with no cookies if in test mode
 * @returns Otherwise, Supabase client with cookies
 */

export function createClient() {
  if (process.env.NODE_ENV === "test") {
    return createServerClient(
      envConfig.supabase_url,
      envConfig.supabase_api_key,
      {
        cookies: {
          getAll() {
            return [];
          },
          setAll() {
            return;
          },
        },
      },
    );
  }

  const cookieStore = cookies();

  return createServerClient(
    envConfig.supabase_url,
    envConfig.supabase_api_key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            if (process.env.NODE_ENV !== "test") {
              console.log("Error setting cookies");
            }
          }
        },
      },
    },
  );
}
