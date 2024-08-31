"use client";

import { login } from "@/actions/login";
import EmailPasswordForm from "@/components/EmailPasswordForm";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    const { email, password } = event.currentTarget;
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email.value, password.value);
      redirect("/");
    } catch (error) {
      setError((error as Error).message);
      setTimeout(() => setError(null), 6000);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="full-centered-container">
      <EmailPasswordForm
        heading="Log In"
        description="Log in to your account to access the Finance app!"
        buttonText="Log In"
        errorText={error}
        isLoading={isLoading}
        onSubmit={onSubmit}
      />
    </div>
  );
}
