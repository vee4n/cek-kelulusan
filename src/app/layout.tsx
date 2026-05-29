// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pengumuman Kelulusan | SMA Negeri 1 Contoh",
  description:
    "Portal resmi pengumuman kelulusan siswa SMA Negeri 1 Contoh Tahun Pelajaran 2023/2024. Cek status kelulusan Anda dengan memasukkan nama dan nomor induk siswa.",
  keywords: ["kelulusan", "pengumuman kelulusan", "SMA", "siswa"],
  robots: "noindex, nofollow", // Prevent indexing of student data portal
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
