// src/app/page.tsx
"use client";

import { useState } from "react";
import LoginForm from "@/components/LoginForm";
import ResultCard from "@/components/ResultCard";

interface StudentData {
  nama: string;
  ttl: string;
  nisn: string;
  statusKelulusan: "LULUS" | "TIDAK_LULUS" | "BELUM_DITENTUKAN";
}

function GoldDivider() {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(27,46,94,0.2))" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#E8A020" }} />
      <div className="w-1 h-1 rounded-full" style={{ background: "rgba(232,160,32,0.5)" }} />
      <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#E8A020" }} />
      <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(27,46,94,0.2), transparent)" }} />
    </div>
  );
}

function BackgroundDecor() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(232,160,32,0.06) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(27,46,94,0.08) 0%, transparent 70%)" }} />
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: "linear-gradient(rgba(27,46,94,1) 1px, transparent 1px), linear-gradient(90deg, rgba(27,46,94,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, transparent, #E8A020 30%, #F5C040 50%, #E8A020 70%, transparent)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(232,160,32,0.4) 50%, transparent)" }} />
    </div>
  );
}

export default function Home() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);

  const handleLoginSuccess = (data: StudentData) => {
    setStudentData(data);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => setStudentData(null);

  return (
    <main
      className="relative min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #F5F7FA 0%, #EEF1F6 100%)" }}
    >
      <BackgroundDecor />

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── Header ── */}
        <header className="text-center pt-12 pb-6 px-4">
          <div className="animate-fade-in-up" style={{ opacity: 0, animationFillMode: "forwards" }}>

            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-6"
              style={{ color: "rgba(27,46,94,0.5)" }}>
              Sistem Informasi Pengumuman Kelulusan
            </p>

            <img
              src="/logo.png"
              alt="Logo Sekolah St. Cicilia"
              className="mx-auto mb-4 w-20 h-20 object-contain"
            />

            <h1 className="font-serif text-2xl sm:text-3xl font-bold leading-tight mb-1"
              style={{ color: "#1B2E5E" }}>
              SMP St. Cicilia Sunter
            </h1>
            <p className="text-sm font-medium tracking-wider"
              style={{ color: "rgba(232,160,32,0.9)" }}>
              Jl. Ancol Sel. II No.10 8, RT.8/RW.7, Sunter Agung, Kec. Tj. Priok
            </p>
          </div>

          {/* Announcement banner */}
          <div
            className="inline-block mt-6 px-6 py-2 rounded-sm animate-fade-in-up delay-200"
            style={{
              opacity: 0,
              animationFillMode: "forwards",
              background: "rgba(232,160,32,0.08)",
              border: "1px solid rgba(232,160,32,0.35)",
              borderLeft: "3px solid #E8A020",
            }}
          >
            <p className="text-sm font-serif font-semibold tracking-widest uppercase"
              style={{ color: "#C87D10" }}>
              Pengumuman Kelulusan
            </p>
            <p className="text-xs mt-0.5" style={{ color: "rgba(27,46,94,0.5)" }}>
              Tahun Pelajaran 2025/2026
            </p>
          </div>
        </header>

        {/* ── Main Card ── */}
        <div className="flex-1 flex items-start justify-center px-4 pb-12">
          <div className="w-full max-w-md animate-fade-in-up delay-300"
            style={{ opacity: 0, animationFillMode: "forwards" }}>

            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(27,46,94,0.12)",
                boxShadow: "0 25px 60px rgba(27,46,94,0.1), inset 0 1px 0 rgba(232,160,32,0.2)",
                backdropFilter: "blur(12px)",
              }}
            >
              {!studentData ? (
                <>
                  <div className="text-center mb-2">
                    <h2 className="font-serif text-xl font-bold mb-1" style={{ color: "#1B2E5E" }}>
                      Cek Kelulusan
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(27,46,94,0.55)" }}>
                      Masukkan nama dan nomor induk siswa untuk melihat hasil kelulusan Anda.
                    </p>
                  </div>

                  <GoldDivider />
                  <LoginForm onSuccess={handleLoginSuccess} />
                </>
              ) : (
                <>
                  <div className="text-center mb-2">
                    <h2 className="font-serif text-xl font-bold mb-1" style={{ color: "#1B2E5E" }}>
                      Hasil Kelulusan
                    </h2>
                    <p className="text-sm" style={{ color: "rgba(27,46,94,0.5)" }}>
                      Tahun Pelajaran 2025/2026
                    </p>
                  </div>

                  <GoldDivider />
                  <ResultCard data={studentData} onReset={handleReset} />
                </>
              )}
            </div>

            <p className="text-center text-xs mt-4 leading-relaxed"
              style={{ color: "rgba(27,46,94,0.3)" }}>
              🔒 Portal ini menggunakan enkripsi aman. Data siswa dilindungi sepenuhnya.
            </p>
          </div>
        </div>

        {/* ── Footer ── */}
        <footer className="relative text-center px-4 py-6"
          style={{ borderTop: "1px solid rgba(27,46,94,0.08)" }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-px" style={{ background: "rgba(232,160,32,0.4)" }} />
            <p className="text-xs font-medium tracking-widest uppercase"
              style={{ color: "rgba(27,46,94,0.4)" }}>
              Dokumen Resmi
            </p>
            <div className="w-6 h-px" style={{ background: "rgba(232,160,32,0.4)" }} />
          </div>
          <p className="text-xs" style={{ color: "rgba(27,46,94,0.3)" }}>
            © {new Date().getFullYear()} SMP Cicilia Sunter
          </p>
          <p className="text-xs mt-1" style={{ color: "rgba(27,46,94,0.2)" }}>
            Untuk informasi lebih lanjut, hubungi Tata Usaha Sekolah
          </p>
        </footer>
      </div>
    </main>
  );
}
