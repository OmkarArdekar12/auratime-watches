export const seo = {
  siteName: "AuraTime Watches - The Art of Precision",
  title: "AuraTime Watches - The Art of Precision",
  titleTemplate: "%s | AuraTime Watches",
  description:
    "A luxury watch showcase that blends cinematic storytelling, timeless craftsmanship, and precision engineering into an immersive scroll-driven experience.",
  keywords: ["AuraTime Watches", "The Art of Precision", "Omkar Ardekar"],
  author: "Omkar Ardekar",
  publisher: "Omkar Ardekar",

  siteUrl: "https://auratime-watches.vercel.app",
  canonicalPath: "https://auratime-watches.vercel.app",

  locale: "en_US",
  language: "en",

  ogImage: "https://auratime-watches.vercel.app/og-image.jpg", //put a 1200x630 image at public/og-image.jpg
  ogImageAlt: "AuraTime Watches - The Art of Precision",
  ogType: "website",

  twitterCardType: "summary_large_image" as const,

  themeColor: "#0B0B0C",
  backgroundColor: "#0B0B0C",

  favicon: "https://auratime-watches.vercel.app/favicon.ico",
  svgIcon: "https://auratime-watches.vercel.app/favicon.svg",
  appleTouchIcon: "https://auratime-watches.vercel.app/apple-touch-icon.png",
  icon96: "https://auratime-watches.vercel.app/icon-96.png",
  icon192: "https://auratime-watches.vercel.app/icon-192.png",
  icon512: "https://auratime-watches.vercel.app/icon-512.png",
  manifest: "https://auratime-watches.vercel.app/site.webmanifest",

  robots: {
    index: true,
    follow: true,
  },

  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "AuraTime Watches - The Art of Precision",
    url: "https://auratime-watches.vercel.app",
    description:
      "Timeless design. Precision engineering. Crafted to accompany every moment with elegance and uncompromising quality.",
  },
};

export default seo;
