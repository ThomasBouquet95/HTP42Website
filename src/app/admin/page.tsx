import { redirect } from "next/navigation";
import { isSignedIn } from "@/lib/admin-auth";
import { collectFields } from "@/content/registry";
import { readOverrides, storeStatus } from "@/lib/content-store";
import { Editor } from "@/app/admin/Editor";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // The middleware only checks that a session cookie is present and shaped
  // like one, because it runs on the Edge and cannot hold the signing key.
  // This is where the signature is actually verified, so a forged cookie gets
  // no further than the login page.
  if (!(await isSignedIn())) redirect("/admin/login");

  const [overrides, status] = await Promise.all([
    readOverrides(),
    Promise.resolve(storeStatus()),
  ]);
  const fields = collectFields();

  return (
    <Editor
      fields={fields}
      overrides={overrides}
      storeKind={status.kind}
      storeMessage={status.kind === "none" ? status.reason : undefined}
    />
  );
}
