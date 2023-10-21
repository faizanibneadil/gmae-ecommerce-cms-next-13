import { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import AuthSessionProvider from "@/providers/authSessionProvider";
import ProgressBarProvider from "@/providers/progress-bar-provider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home - gmae Mobile Accessories Enterprise",
  description: "Buy mobie Accessories here.",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthSessionProvider>
            <ProgressBarProvider>{children}</ProgressBarProvider>
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
