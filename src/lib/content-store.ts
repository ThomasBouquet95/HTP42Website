import "server-only";
import { head, put } from "@vercel/blob";
import { sanitiseOverrides, type Overrides } from "@/content/registry";

/**
 * Where edits from the admin editor live.
 *
 * A password alone cannot persist anything: a Vercel deployment has a read
 * only filesystem, so the edited text needs somewhere durable to sit. That is
 * a Vercel Blob store, which contributes one environment variable
 * (BLOB_READ_WRITE_TOKEN) and is added automatically when the store is created.
 *
 * With no store configured the site still renders, from the defaults compiled
 * into the build, and the editor says plainly that it cannot save. Nothing
 * breaks while the store is being set up.
 *
 * For local development, set CONTENT_STORE_FILE to a path and edits go to that
 * file instead, so the whole flow can be exercised without any cloud service.
 */

const BLOB_PATH = "content/overrides.json";
export const CONTENT_TAG = "site-content";

/** Seconds the stored copy is held before it is checked again. A save
 *  invalidates the tag immediately, so this is only a backstop. */
const REVALIDATE = 300;

export type StoreStatus =
  | { kind: "blob" }
  | { kind: "file"; path: string }
  | { kind: "none"; reason: string };

export function storeStatus(): StoreStatus {
  if (process.env.BLOB_READ_WRITE_TOKEN) return { kind: "blob" };
  const file = process.env.CONTENT_STORE_FILE;
  if (file && process.env.NODE_ENV !== "production") {
    return { kind: "file", path: file };
  }
  return {
    kind: "none",
    reason:
      "No content store is configured. Create a Blob store in the Vercel dashboard (Storage, then Blob) and redeploy. It adds BLOB_READ_WRITE_TOKEN for you.",
  };
}

/**
 * The public URL of the stored blob. Stable for the life of the store, so it
 * is resolved once per server instance rather than on every render.
 */
let cachedUrl: string | null = null;

async function blobUrl(): Promise<string | null> {
  if (cachedUrl) return cachedUrl;
  try {
    const meta = await head(BLOB_PATH);
    cachedUrl = meta.url;
    return cachedUrl;
  } catch {
    // Nothing saved yet, which is the normal state before the first edit.
    return null;
  }
}

async function readFromFile(path: string): Promise<Overrides> {
  try {
    const { readFile } = await import("node:fs/promises");
    return sanitiseOverrides(JSON.parse(await readFile(path, "utf8")));
  } catch {
    return {};
  }
}

/**
 * Read the saved edits. Returns {} on every failure path rather than throwing:
 * a store that is unreachable should degrade to the text we shipped, not take
 * the site down.
 */
export async function readOverrides(): Promise<Overrides> {
  const status = storeStatus();
  if (status.kind === "file") return readFromFile(status.path);
  if (status.kind === "none") return {};

  const url = await blobUrl();
  if (!url) return {};
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE, tags: [CONTENT_TAG] },
    });
    if (!res.ok) return {};
    return sanitiseOverrides(await res.json());
  } catch {
    return {};
  }
}

/** Persist the edits. Throws with a readable message so the editor can show it. */
export async function writeOverrides(overrides: Overrides): Promise<void> {
  const status = storeStatus();
  const body = JSON.stringify(overrides, null, 2);

  if (status.kind === "none") throw new Error(status.reason);

  if (status.kind === "file") {
    const { writeFile } = await import("node:fs/promises");
    await writeFile(status.path, body, "utf8");
    return;
  }

  const result = await put(BLOB_PATH, body, {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
  cachedUrl = result.url;
}
