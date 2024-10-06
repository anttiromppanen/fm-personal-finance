"use client";

import { signup } from "@/actions/signup";
import EmailPasswordForm from "@/components/EmailPasswordForm";
import { useEffect, useState } from "react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = event.currentTarget;

    setIsLoading(true);
    setError(null);

    try {
      await signup(email.value, password.value);
    } catch (error) {
      setError((error as Error).message);
      setTimeout(() => setError(null), 6000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="full-centered-container">
      <EmailPasswordForm
        heading="Sign Up"
        description="Create a new account to unlock the Finance app"
        buttonText="Sign up"
        errorText={error}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
}
