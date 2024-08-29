"use client";

import { signup } from "@/app/login/actions";
import EmailPasswordForm from "@/components/EmailPasswordForm";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      await signup(formData);
    } catch (error) {
      setError((error as Error).message);
      setTimeout(() => setError(null), 6000);
    } finally {
      setIsLoading(false);
    }
  }

  console.log(error);
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
