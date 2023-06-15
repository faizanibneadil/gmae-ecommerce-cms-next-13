/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com",
      "gmae.pk",
      "fakestoreapi.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "drive.google.com"
    ],
    // loader: "custom",
    // loaderFile: ""
  },
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["@prisma/client"],
  },
};

module.exports = nextConfig;
