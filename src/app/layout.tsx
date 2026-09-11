import type { Metadata, Viewport } from "next";
import {
  Inter_Tight,
  Instrument_Serif,
  JetBrains_Mono,
  Poppins,
} from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

/** The brand wordmark face. Two weights, used only in the logo lockups. */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} · ${site.tagline}`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  keywords: [
    "life sciences consulting",
    "clinical data management",
    "pharma data strategy",
    "AI in life sciences",
    "OpenStudyBuilder",
    "CDISC",
    "EU AI Act",
    "clinical metadata management",
    "digital transformation pharma",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0f1c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} ${poppins.variable}`}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          // Organisation schema — helps the firm surface correctly in search.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: site.name,
              alternateName: site.shortName,
              url: site.url,
              email: site.contact.email,
              description: site.description,
              areaServed: "Global",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Basel",
                addressCountry: "CH",
              },
              sameAs: [site.contact.linkedin],
              knowsAbout: [
                "Clinical Data Management",
                "CDISC Standards",
                "OpenStudyBuilder",
                "EU AI Act compliance",
                "Life sciences data strategy",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
