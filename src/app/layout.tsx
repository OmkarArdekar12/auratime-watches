import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { seo } from "@/data/seo";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

//Every value below is pulled from data/seo.ts.
export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: seo.author }],
  creator: seo.author,
  publisher: seo.publisher,
  alternates: {
    canonical: seo.canonicalPath,
  },
  robots: {
    index: seo.robots.index,
    follow: seo.robots.follow,
  },
  openGraph: {
    type: seo.ogType as "website",
    url: seo.siteUrl,
    siteName: seo.siteName,
    title: seo.title,
    description: seo.description,
    locale: seo.locale,
    images: [
      {
        url: seo.ogImage,
        alt: seo.ogImageAlt,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: seo.twitterCardType,
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  icons: {
    icon: [
      { url: seo.favicon },
      { url: seo.svgIcon, type: "image/svg+xml" },
      { url: seo.icon96, sizes: "96x96", type: "image/png" },
      { url: seo.icon192, sizes: "192x192", type: "image/png" },
      { url: seo.icon512, sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: seo.appleTouchIcon }],
  },
  manifest: seo.manifest,
};

export const viewport: Viewport = {
  themeColor: seo.themeColor,
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
      lang={seo.language}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seo.structuredData),
          }}
        />
      </head>
      <body className="bg-reel-black font-body antialiased overscroll-none">
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
