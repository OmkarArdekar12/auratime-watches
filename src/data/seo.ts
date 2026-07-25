export const seo = {
  siteName: "Aura Watches - The Art of Precision",
  title: "Aura Watches - The Art of Precision",
  titleTemplate: "%s | Aura Watches",
  description:
    "A luxury watch showcase that blends cinematic storytelling, timeless craftsmanship, and precision engineering into an immersive scroll-driven experience.",
  keywords: ["Aura Watches", "The Art of Precision", "Omkar Ardekar"],
  author: "Omkar Ardekar",
  publisher: "Omkar Ardekar",

  siteUrl: "https://aura-watches.vercel.app",
  canonicalPath: "https://aura-watches.vercel.app",

  locale: "en_US",
  language: "en",

  ogImage: "https://aura-watches.vercel.app/og-image.jpg", //put a 1200x630 image at public/og-image.jpg
  ogImageAlt: "Aura Watches - The Art of Precision",
  ogType: "website",

  twitterCardType: "summary_large_image" as const,

  themeColor: "#0B0B0C",
  backgroundColor: "#0B0B0C",

  favicon: "https://aura-watches.vercel.app/favicon.ico",
  svgIcon: "https://aura-watches.vercel.app/favicon.svg",
  appleTouchIcon: "https://aura-watches.vercel.app/apple-touch-icon.png",
  icon96: "https://aura-watches.vercel.app/icon-96.png",
  icon192: "https://aura-watches.vercel.app/icon-192.png",
  icon512: "https://aura-watches.vercel.app/icon-512.png",
  manifest: "https://aura-watches.vercel.app/site.webmanifest",

  robots: {
    index: true,
    follow: true,
  },

  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Aura Watches - The Art of Precision",
    url: "https://aura-watches.vercel.app",
    description:
      "Timeless design. Precision engineering. Crafted to accompany every moment with elegance and uncompromising quality.",
  },
};

export default seo;
