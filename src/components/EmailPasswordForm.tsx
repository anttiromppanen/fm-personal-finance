import { motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Loader from "./Loader";

interface EmailPasswordFormProps {
  heading: string;
  description: string;
  buttonText: string;
  errorText: string | null;
  isLoading: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

function EmailPasswordForm({
  heading,
  description,
  buttonText,
  errorText,
  isLoading,
  onSubmit,
}: EmailPasswordFormProps) {
  const footerText =
    buttonText === "Log In"
      ? "Not registered yet?"
      : "Already have an account?";

  const footerLinkText = buttonText === "Log In" ? "Sign up" : "Log in";

  return (
    <div className="left-1/2 top-1/2 flex h-[calc(100%-32px)] w-full flex-col items-center justify-center rounded-xl bg-white p-6 shadow-xl shadow-[#e3d6c1] md:h-auto md:w-[520px] md:px-20 md:py-10 lg:absolute lg:-translate-x-1/2 lg:-translate-y-1/2">
      <h1 className="heading-lg">{heading}</h1>
      <p className="mb-6 mt-4 text-sm text-primaryDarkGrey">{description}</p>
      {/* Error text */}
      {errorText && (
        <motion.div
          key={errorText}
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <p className="mb-4 text-sm text-red-500">{errorText}</p>
        </motion.div>
      )}
      <form onSubmit={onSubmit} className="flex w-full flex-col">
        <label htmlFor="email" className="text-sm text-primaryDarkGrey">
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Enter email address"
          className="text-input"
          required
        />
        <label htmlFor="password" className="mt-3 text-sm text-primaryDarkGrey">
          Password:
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          className="text-input"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="mt-8 flex justify-center rounded-lg bg-secondaryGreen py-2.5 text-sm text-white disabled:opacity-50"
        >
          {isLoading ? <Loader /> : buttonText}
        </button>
      </form>
      <div className="mt-3 text-xs">
        <span className="text-primaryDarkGrey">{footerText} </span>
        <Link
          href={buttonText === "Log In" ? "/register" : "/login"}
          className="font-bold text-blue-700"
        >
          {footerLinkText}
        </Link>
      </div>
    </div>
  );
}

export default EmailPasswordForm;
