import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Content editor",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-dvh bg-paper-2 text-ink">{children}</div>;
}
