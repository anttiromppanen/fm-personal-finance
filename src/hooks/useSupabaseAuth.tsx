import { useUserStore } from "@/store/userStore";
import { createClient } from "@/utils/supabase/server";
import { useEffect } from "react";

const useSupabaseAuth = () => {
  const supabase = createClient();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user); // Update Zustand store with logged-in user
      } else {
        setUser(null); // No user logged in
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session.user); // Update Zustand store with the user
        } else {
          setUser(null); // User logged out
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [setUser, supabase.auth]);
};

export default useSupabaseAuth;
