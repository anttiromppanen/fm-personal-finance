type NodeEnv = "development" | "production" | "test";

interface IConfig {
  supabase_url: string;
  supabase_api_key: string;
}

const config: Record<NodeEnv, IConfig> = {
  development: {
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabase_api_key: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
  },
  production: {
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabase_api_key: process.env.NEXT_PUBLIC_SUPABASE_API_KEY!,
  },
  test: {
    supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabase_api_key: process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY!,
  },
};

export default config[process.env.NODE_ENV || "development"];
