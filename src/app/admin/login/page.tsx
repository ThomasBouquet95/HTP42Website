import { redirect } from "next/navigation";
import { isConfigured, isSignedIn } from "@/lib/admin-auth";
import { LoginForm } from "@/app/admin/LoginForm";

export default async function LoginPage() {
  if (await isSignedIn()) redirect("/admin");

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-16">
      <p className="eyebrow text-ink-300">HTP42</p>
      <h1 className="mt-4 text-3xl tracking-[-0.03em]">Content editor</h1>
      <p className="mt-3 text-base leading-relaxed text-ink-400">
        Sign in to change the text on the website.
      </p>

      {isConfigured() ? (
        <LoginForm />
      ) : (
        <div className="mt-8 rounded-lg border border-ink/15 bg-paper p-5">
          <p className="text-base leading-relaxed text-ink-600">
            No password is set yet. Add an{" "}
            <code className="font-mono text-xs">ADMIN_PASSWORD</code>{" "}
            environment variable in the Vercel dashboard, then redeploy.
          </p>
        </div>
      )}
    </div>
  );
}
