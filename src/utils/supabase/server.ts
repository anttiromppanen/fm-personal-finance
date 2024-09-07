import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import envConfig from "../envConfig";

export function createClient() {
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
