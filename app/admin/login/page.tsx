"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { loginAction } from "@/lib/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className="btn-primary w-full">
      {pending ? "Logging in..." : "Login"}
    </button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(loginAction, null);

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-foreground text-center mb-6">
          Admin Login
        </h1>

        {state?.error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700 text-sm">
            {state.error}
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="input"
              placeholder="Enter admin password"
              autoFocus
            />
          </div>

          <SubmitButton />
        </form>

        <p className="mt-4 text-center text-sm text-text-secondary">
          <Link href="/" className="text-accent hover:underline">
            Back to Portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}
