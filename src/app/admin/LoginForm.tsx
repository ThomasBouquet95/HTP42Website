"use client";

import { useActionState } from "react";
import { signIn } from "@/app/admin/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, {});

  return (
    <form action={action} className="mt-8 flex flex-col gap-4">
      <label className="flex flex-col gap-2">
        <span className="eyebrow text-ink-300">Password</span>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          autoFocus
          required
          className="w-full rounded-md border border-ink/15 bg-paper px-4 py-3 text-base tracking-[-0.006em] outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25"
        />
      </label>

      {state?.error ? (
        <p role="alert" className="text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand disabled:opacity-60"
      >
        {pending ? "Checking…" : "Sign in"}
      </button>
    </form>
  );
}
