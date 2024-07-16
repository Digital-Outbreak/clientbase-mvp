/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "utfs.io",
      "exbojguufxlrjafjbuyc.supabase.co",
      "cdn.discordapp.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        pathname: "/a/<APP_ID>/*",
      },
    ],
  },
};

export default nextConfig;
