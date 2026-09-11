import { redirect } from "next/navigation";
import { isSignedIn } from "@/lib/admin-auth";
import { collectFields } from "@/content/registry";
import { Editor } from "@/app/admin/Editor";

export const dynamic = "force-dynamic";

/**
 * The editor is the real site with its text open for editing, plus an export
 * of what changed. Nothing is published from here: the export is handed back
 * to a developer, which keeps the repository the single source of truth for
 * the site's copy.
 */
export default async function AdminPage() {
  // The middleware only checks that a session cookie is present and shaped
  // like one, because it runs on the Edge and cannot hold the signing key.
  // This is where the signature is verified, so a forged cookie gets no
  // further than the login page.
  if (!(await isSignedIn())) redirect("/admin/login");

  return <Editor fields={collectFields()} />;
}
