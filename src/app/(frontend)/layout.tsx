import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "easypeasy",
  description:
    "easypeasy is a sales and distribution management system and also you can manage your ecommerce store.",
  // manifest: "./manifest.json",
  // icons: { apple: "./logo.png" },
  // metadataBase: new URL(process.env.BASE_URL as string),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning={true}
      >{children}
      </body>
    </html>
  );
}
