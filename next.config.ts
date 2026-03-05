// import withPWA from "next-pwa";

import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

export default async (pase: unknown, { defaultConfig }: { defaultConfig: NextConfig }) => {
  return withPayload({
    ...defaultConfig,
    poweredByHeader: false,
    reactCompiler: true,
    reactStrictMode: true,
    async headers() {
      return [
        {
          source: "/:path*",
          headers: [
            {
              key: 'Referrer-Policy',
              value: 'strict-origin-when-cross-origin'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
            {
              key: 'X-Frame-Options',
              value: 'DENY'
            },
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains; preload'
            }
          ],
        },
      ];
    },
    images: {
      remotePatterns: [{ hostname: 'localhost' }],
    },
    turbopack: {
      root: __dirname,
    },
    devIndicators: {
      position: 'bottom-right'
    },
  }, { devBundleServerPackages: false })
}