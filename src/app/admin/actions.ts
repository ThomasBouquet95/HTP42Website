"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  clearFailures,
  endSession,
  isSignedIn,
  passwordMatches,
  recordFailure,
  startSession,
  tooManyAttempts,
} from "@/lib/admin-auth";
import { readOverrides, writeOverrides, CONTENT_TAG } from "@/lib/content-store";
import { sanitiseOverrides } from "@/content/registry";

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

/**
 * Save the edits. Only fields that differ from the shipped defaults are kept,
 * and only paths that name a real editable field are accepted, so a stale or
 * hand crafted key cannot write anything into the content tree.
 */
export async function saveContent(
  changes: Record<string, string>,
): Promise<{ ok: boolean; message: string; saved?: number }> {
  if (!(await isSignedIn())) {
    return { ok: false, message: "Your session expired. Sign in again." };
  }

  const existing = await readOverrides();
  const merged = sanitiseOverrides({ ...existing, ...changes });

  try {
    await writeOverrides(merged);
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save.",
    };
  }

  // updateTag, not revalidateTag: this is a read your own writes case, so the
  // next request must wait for the new text rather than be served the old.
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");

  const count = Object.keys(merged).length;
  return {
    ok: true,
    message:
      count === 0
        ? "Saved. Everything is back to the original text."
        : `Saved. ${count} field${count === 1 ? " differs" : "s differ"} from the original.`,
    saved: count,
  };
}

/** Drop every override, returning the whole site to the text in the build. */
export async function resetAll(): Promise<{ ok: boolean; message: string }> {
  if (!(await isSignedIn())) {
    return { ok: false, message: "Your session expired. Sign in again." };
  }
  try {
    await writeOverrides({});
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Could not save.",
    };
  }
  updateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
  return { ok: true, message: "Every field is back to the original text." };
}
