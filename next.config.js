/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "drive.google.com",
      "img.freepik.com",
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "date-fns", "prisma"],
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  ...withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
  }),
};

module.exports = nextConfig;
