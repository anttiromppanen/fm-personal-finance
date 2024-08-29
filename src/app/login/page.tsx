"use client";

import EmailPasswordForm from "@/components/EmailPasswordForm";
import { useState } from "react";
import { login } from "./actions";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      await login(formData);
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
