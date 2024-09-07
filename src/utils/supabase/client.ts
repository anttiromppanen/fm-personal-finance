import { createBrowserClient } from "@supabase/ssr";
import envConfig from "../envConfig";

export function createClient() {
  return createBrowserClient(
    envConfig.supabase_url,
    envConfig.supabase_api_key,
  );
}
