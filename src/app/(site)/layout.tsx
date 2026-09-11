import { Header } from "@/components/Header";
import { getContent } from "@/content/live";
import { Footer } from "@/components/Footer";

/**
 * The public site's chrome. It sits in a route group so that the content
 * editor under /admin renders without a marketing header and footer wrapped
 * around it, while both still share the root layout's fonts and stylesheet.
 * Route groups do not appear in URLs, so every path is unchanged.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { nav, site } = await getContent();

  return (
    <>
      <Header nav={nav} site={site} />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
