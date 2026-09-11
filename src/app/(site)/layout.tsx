import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/**
 * The public site's chrome. It sits in a route group so the editor under
 * /admin renders without a marketing header and footer around it, while both
 * still share the root layout's fonts and stylesheet. Route groups do not
 * appear in URLs, so every path is unchanged.
 */
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </>
  );
}
