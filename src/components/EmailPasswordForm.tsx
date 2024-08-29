import Link from "next/link";
import { FormEvent } from "react";
import { motion } from "framer-motion";
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
    <div className="bg-white w-[520px] flex flex-col shadow-xl shadow-[#e3d6c1] items-center md:px-20 md:py-10 rounded-xl">
      <h1 className="heading-lg">{heading}</h1>
      <p className="text-primaryDarkGrey mt-4 mb-6 text-sm">{description}</p>
      {/* Error text */}
      {errorText && (
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <p className="text-red-500 text-sm mb-4">{errorText}</p>
        </motion.div>
      )}
      <form onSubmit={onSubmit} className="flex flex-col w-full">
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
        <label htmlFor="password" className="text-sm text-primaryDarkGrey mt-3">
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
          className="bg-secondaryGreen text-white flex justify-center text-sm py-2.5 rounded-lg mt-8 disabled:opacity-50"
        >
          {isLoading ? <Loader /> : buttonText}
        </button>
      </form>
      <div className="text-xs mt-3">
        <span className="text-primaryDarkGrey">{footerText} </span>
        <Link
          href={buttonText === "Log In" ? "/register" : "/login"}
          className="text-blue-700 font-bold"
        >
          {footerLinkText}
        </Link>
      </div>
    </div>
  );
}

export default EmailPasswordForm;
