/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**", // allow any https image
      },
      {
        protocol: "http",
        hostname: "**", // allow any http image
      },
    ],
  },

  // 🔴 Disable all CDN/browser caching globally
  async headers() {
    return [
      {
        source: "/:path*", // applies to ALL routes (pages + API)
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "CDN-Cache-Control", value: "no-store, max-age=0" },
          { key: "Vercel-CDN-Cache-Control", value: "no-store, max-age=0" },
        ],
      },
    ];
  },

  // 🔴 Disable Next.js Data Cache globally
  experimental: {
    fetchCache: "force-no-store", // ensures fetch() never caches data
  },
};

module.exports = nextConfig;
