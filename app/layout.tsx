import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saku — Pengatur Keuangan",
  description:
    "Catat pengeluaran harian dalam hitungan detik. Cepat, simpel, fokus.",
  keywords: ["keuangan", "pengatur keuangan", "pengeluaran", "budget"],
  authors: [{ name: "Saku" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0c0f1a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh flex flex-col">
        {children}
      </body>
    </html>
  );
}
