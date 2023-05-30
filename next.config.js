/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "source.unsplash.com",
      "gmae.pk",
      "fakestoreapi.com",
      "loremflickr.com",
    ],
  },
};

module.exports = nextConfig;
