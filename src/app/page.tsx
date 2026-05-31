// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import LoginForm from "@/components/LoginForm";
import ResultCard from "@/components/ResultCard";

interface StudentData {
  nama: string;
  ttl: string;
  nisn: string;
  statusKelulusan: "LULUS" | "TIDAK_LULUS" | "BELUM_DITENTUKAN";
}

// July 1 2026 00:00:00 WIB (UTC+7)
const UNLOCK_DATE = new Date("2026-06-01T17:00:00.000Z");

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

// ── Countdown block ──────────────────────────────────────────────────────────
function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center font-serif text-xl sm:text-2xl font-bold"
        style={{
          background: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(27,46,94,0.15)",
          boxShadow: "0 4px 20px rgba(27,46,94,0.08)",
          color: "#1B2E5E",
        }}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs mt-2 font-medium tracking-widest uppercase"
        style={{ color: "rgba(27,46,94,0.45)" }}>
        {label}
      </span>
    </div>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const now = new Date();
      const diff = UNLOCK_DATE.getTime() - now.getTime();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      {/* Lock icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{
          background: "rgba(232,160,32,0.1)",
          border: "1px solid rgba(232,160,32,0.3)",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="11" width="18" height="11" rx="2" stroke="#E8A020" strokeWidth="1.5" />
          <path d="M7 11V7a5 5 0 0110 0v4" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1.5" fill="#E8A020" />
        </svg>
      </div>

      <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
        style={{ color: "rgba(232,160,32,0.8)" }}>
        Pengumuman Belum Dibuka
      </p>

      <p className="font-serif text-lg font-bold mb-1" style={{ color: "#1B2E5E" }}>
        Pengumuman kelulusan akan dibuka pada
      </p>
      <p className="font-serif text-xl font-bold mb-6"
        style={{ color: "#E8A020" }}>
        2 Juni 2026 pukul 00.00 WIB
      </p>

      {/* Countdown units */}
      <div className="flex items-start justify-center gap-3 sm:gap-4 mb-6">
        <CountdownUnit value={timeLeft.days} label="Hari" />
        <div className="text-xl font-bold mt-3" style={{ color: "rgba(27,46,94,0.3)" }}>:</div>
        <CountdownUnit value={timeLeft.hours} label="Jam" />
        <div className="text-xl font-bold mt-3" style={{ color: "rgba(27,46,94,0.3)" }}>:</div>
        <CountdownUnit value={timeLeft.minutes} label="Menit" />
        <div className="text-xl font-bold mt-3" style={{ color: "rgba(27,46,94,0.3)" }}>:</div>
        <CountdownUnit value={timeLeft.seconds} label="Detik" />
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "rgba(27,46,94,0.4)" }}>
        Harap bersabar. Hasil kelulusan akan dapat diakses tepat pada waktu yang telah ditentukan.
      </p>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [serverChecked, setServerChecked] = useState(false);

  // Check unlock status from server (prevents client clock manipulation)
  useEffect(() => {
    const checkUnlock = async () => {
      try {
        const res = await fetch("/api/check-unlock");
        const data = await res.json();
        setIsUnlocked(data.unlocked);
      } catch {
        // Fallback to client time if server unreachable
        setIsUnlocked(new Date() >= UNLOCK_DATE);
      } finally {
        setServerChecked(true);
      }
    };

    checkUnlock();

    // Re-check every 30 seconds in case we're close to unlock time
    const interval = setInterval(checkUnlock, 30000);
    return () => clearInterval(interval);
  }, []);

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
              SMP St. Cicilia I
            </h1>
            <p className="text-sm font-medium tracking-wider"
              style={{ color: "rgba(232,160,32,0.9)" }}>
              Jl. Ancol Selatan 2 No.17 Rt 008/07, Tanjung Priok, Jakarta Utara
            </p>
          </div>

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
              {/* Loading state */}
              {!serverChecked ? (
                <div className="text-center py-8">
                  <div className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mx-auto mb-3"
                    style={{ borderColor: "#E8A020", borderTopColor: "transparent" }} />
                  <p className="text-sm" style={{ color: "rgba(27,46,94,0.4)" }}>Memuat...</p>
                </div>

              ) : !isUnlocked ? (
                /* Countdown screen */
                <Countdown />

              ) : !studentData ? (
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
