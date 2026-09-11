"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  clearFailures,
  endSession,
  passwordMatches,
  recordFailure,
  startSession,
  tooManyAttempts,
} from "@/lib/admin-auth";

async function clientKey(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

export async function signIn(
  _state: { error?: string } | undefined,
  formData: FormData,
): Promise<{ error?: string }> {
  const key = await clientKey();
  if (tooManyAttempts(key)) {
    return { error: "Too many attempts. Try again in a few minutes." };
  }

  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "Enter the password." };

  if (!passwordMatches(password)) {
    recordFailure(key);
    // Cost a little time on failure, so guessing is slow even in a burst.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "That password is not right." };
  }

  clearFailures(key);
  await startSession();
  redirect("/admin");
}

export async function signOut(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}
