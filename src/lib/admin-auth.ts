import "server-only";
import { createHmac, timingSafeEqual, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/admin-cookie";

/**
 * Password gate for the content editor.
 *
 * ADMIN_PASSWORD is the only variable this needs. The session cookie is signed
 * with ADMIN_SESSION_SECRET when it is set, and otherwise with a key derived
 * from the password, so one variable is genuinely enough to get started.
 * Setting the password rotates the key, which signs every existing session out.
 */

const COOKIE = SESSION_COOKIE;
const MAX_AGE_SECONDS = 60 * 60 * 8;

export function isConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function signingKey(): string {
  const explicit = process.env.ADMIN_SESSION_SECRET;
  if (explicit) return explicit;
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error("ADMIN_PASSWORD is not set");
  return `derived:${password}`;
}

function sign(payload: string): string {
  return createHmac("sha256", signingKey()).update(payload).digest("base64url");
}

/** Compare without leaking length or position through timing. */
function equals(a: string, b: string): boolean {
  const ab = Buffer.from(a, "utf8");
  const bb = Buffer.from(b, "utf8");
  // Hash first so the compared buffers are always the same length.
  const ah = createHmac("sha256", "cmp").update(ab).digest();
  const bh = createHmac("sha256", "cmp").update(bb).digest();
  return timingSafeEqual(ah, bh);
}

export function passwordMatches(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return equals(candidate, expected);
}

export function createSessionToken(): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const nonce = randomBytes(8).toString("base64url");
  const payload = `${expires}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function tokenIsValid(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expires, nonce, signature] = parts;
  if (!equals(sign(`${expires}.${nonce}`), signature)) return false;
  const at = Number(expires);
  return Number.isFinite(at) && at > Date.now();
}

export async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isSignedIn(): Promise<boolean> {
  const store = await cookies();
  return tokenIsValid(store.get(COOKIE)?.value);
}


/**
 * Throttle password guessing. Per instance and in memory, so it is a speed
 * bump rather than a guarantee: it will not survive a restart and does not
 * coordinate across regions. A long password is what actually protects this.
 */
const attempts = new Map<string, { count: number; first: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export function tooManyAttempts(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function recordFailure(key: string): void {
  const entry = attempts.get(key);
  if (!entry || Date.now() - entry.first > WINDOW_MS) {
    attempts.set(key, { count: 1, first: Date.now() });
    return;
  }
  entry.count += 1;
}

export function clearFailures(key: string): void {
  attempts.delete(key);
}
