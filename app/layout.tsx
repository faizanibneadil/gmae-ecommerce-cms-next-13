import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import AuthSessionProvider from "@/providers/authSessionProvider";
import ProgressBarProvider from "@/providers/progress-bar-provider";
import { Toaster } from "sonner";
import ReactQueryProvider from "@/providers/react-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "easypeasy",
  description:
    "easypeasy is a sales and distribution management system and also you can manage your ecommerce store.",
  manifest: "./manifest.json",
  icons: { apple: "./logo.png" },
  metadataBase: new URL(process.env.BASE_URL as string),
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
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthSessionProvider>
            <ProgressBarProvider>
              <ReactQueryProvider>{children}</ReactQueryProvider>
            </ProgressBarProvider>
          </AuthSessionProvider>
          <Toaster
            position="bottom-right"
            theme="system"
            richColors
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
