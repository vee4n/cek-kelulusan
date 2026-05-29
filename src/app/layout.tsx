// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cek Kelulusan | SMP St. Cicilia Sunter",
  description:
    "Portal resmi pengumuman kelulusan siswa SMP St. Cicilia Sunter, Jakarta Utara. Tahun Pelajaran 2025/2026.",
  keywords: ["kelulusan", "pengumuman kelulusan", "SMP", "St. Cicilia", "Jakarta Utara", "siswa"],
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
