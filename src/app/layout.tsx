// src/app/layout.tsx
import "./globals.css";
import { GeistSans, GeistMono } from "geist/font";
import { Toaster } from "sonner";
import { Providers } from "@/components/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <Providers>
          {children}
        </Providers>

        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
