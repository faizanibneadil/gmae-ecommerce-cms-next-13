import { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import Providers from "../providers/poviders";
import { Toaster } from "react-hot-toast";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - gmae Mobile Accessories Enterprise",
  description: "Buy mobie Accessories here.",
  metadataBase: new URL(process.env.BASE_URL as string),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Theme>
          <Providers>{children}</Providers>
          <Toaster />
        </Theme>
      </body>
    </html>
  );
}
